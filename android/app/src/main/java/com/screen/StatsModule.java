package com.screen;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.bridge.Promise;

import android.app.usage.UsageEvents;
import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.content.Context;
import android.content.Intent;
import android.provider.Settings;
import android.content.pm.PackageManager;
import android.app.AppOpsManager;

import android.util.Log;
import java.util.Map;
import java.util.HashMap;
import java.util.Calendar;
import java.util.List;
import java.util.ArrayList;

public class StatsModule extends ReactContextBaseJavaModule {

   StatsModule(ReactApplicationContext context) {
       super(context);
   }

   @Override
   public String getName() {
      return "StatsModule";
   }

   public List getList() {
      List<String> appList = new ArrayList<>();
      appList.add("com.vkontakte.android");
      appList.add("com.google.android.youtube");
      appList.add("org.telegram.messenger");
      appList.add("com.instagram.android");
      appList.add("com.whatsapp");
      appList.add("com.zhiliaoapp.musically");
      appList.add("com.viber.voip");
      appList.add("ru.rutube.app");
      return appList;
   }

@ReactMethod
public void hasPermissionToReadUsageStats(Promise promise) {
    boolean granted = false;
    Context context = getReactApplicationContext();

    AppOpsManager appOps = (AppOpsManager) context
            .getSystemService(Context.APP_OPS_SERVICE);
    int mode = appOps.checkOpNoThrow(AppOpsManager.OPSTR_GET_USAGE_STATS,
            android.os.Process.myUid(), context.getPackageName());

    if (mode == AppOpsManager.MODE_DEFAULT) {
        granted = (context.checkCallingOrSelfPermission(android.Manifest.permission.PACKAGE_USAGE_STATS) == PackageManager.PERMISSION_GRANTED);
    } else {
        granted = (mode == AppOpsManager.MODE_ALLOWED);
    }
    promise.resolve(String.valueOf(granted));
}

@ReactMethod
public void getStats(Integer interval, Promise promise) {
          Calendar c = Calendar.getInstance();
          Context context = getReactApplicationContext();
          long endTime = c.getTimeInMillis();
          if(interval == 1) c.add(Calendar.DATE, -7);
          else if (interval == 2) c.add(Calendar.DATE, -30);
          else if (interval == 3) c.add(Calendar.DATE, -90);
          else if (interval == 4) c.add(Calendar.DATE, -180);
          else if (interval == 5) c.add(Calendar.YEAR, -1);
          long startTime = c.getTimeInMillis();
          UsageStatsManager usageStatsManager = (UsageStatsManager)context.getSystemService(Context.USAGE_STATS_SERVICE);
          Map<String, UsageStats> UsageStatsMap = usageStatsManager.queryAndAggregateUsageStats(startTime, endTime);
          WritableMap writableMap = new WritableNativeMap();
          List appList = getList();
          for (Map.Entry<String, UsageStats> entry : UsageStatsMap.entrySet()) {
                  String pName = entry.getValue().getPackageName();
                  if (appList.contains(pName)) {
                    writableMap.putString(pName, String.valueOf(entry.getValue().getTotalTimeInForeground()));
                  }
              }
          promise.resolve(writableMap);
    }

@ReactMethod
public void getUsageStats(String packageName, Callback successCallback) {

          Calendar c = Calendar.getInstance();
          long endTime = c.getTimeInMillis();
          c.set(Calendar.HOUR_OF_DAY, 0);
          c.set(Calendar.MINUTE, 0);
          c.set(Calendar.SECOND, 0);
          c.set(Calendar.MILLISECOND, 0);
          long startTime = c.getTimeInMillis();
          boolean isInstalled = isAppInstalled(getReactApplicationContext(), packageName);
          if(isInstalled) {
            successCallback.invoke(getTimeSpent(getReactApplicationContext(), packageName, startTime, endTime));
          }
          else {
            successCallback.invoke("Error");
          }
    }

public Integer getTimeSpent(Context context, String packageName, long beginTime, long endTime) {
    UsageEvents.Event currentEvent;
    List<UsageEvents.Event> allEvents = new ArrayList<>();
    HashMap<String, Integer> appUsageMap = new HashMap<>();

    UsageStatsManager usageStatsManager = (UsageStatsManager)context.getSystemService(Context.USAGE_STATS_SERVICE);
    UsageEvents usageEvents = usageStatsManager.queryEvents(beginTime, endTime);

    while (usageEvents.hasNextEvent()) {
        currentEvent = new UsageEvents.Event();
        usageEvents.getNextEvent(currentEvent);
        if(currentEvent.getPackageName().equals(packageName) || packageName == null) {
            if (currentEvent.getEventType() == UsageEvents.Event.ACTIVITY_RESUMED
                    || currentEvent.getEventType() == UsageEvents.Event.ACTIVITY_PAUSED) {
                allEvents.add(currentEvent);
                String key = currentEvent.getPackageName();
                if (appUsageMap.get(key) == null)
                    appUsageMap.put(key, 0);
            }
        }
    }

    for (int i = 0; i < allEvents.size() - 1; i++) {
        UsageEvents.Event E0 = allEvents.get(i);
        UsageEvents.Event E1 = allEvents.get(i + 1);

        if (E0.getEventType() == UsageEvents.Event.ACTIVITY_RESUMED
                && E1.getEventType() == UsageEvents.Event.ACTIVITY_PAUSED
                && E0.getClassName().equals(E1.getClassName())) {
            int diff = (int)(E1.getTimeStamp() - E0.getTimeStamp());
            diff /= 1000;
            Integer prev = appUsageMap.get(E0.getPackageName());
            if(prev == null) prev = 0;
            appUsageMap.put(E0.getPackageName(), prev + diff);
        }
    }

    if(allEvents.size() == 0) return 0;

    UsageEvents.Event lastEvent = allEvents.get(allEvents.size() - 1);
    if(lastEvent.getEventType() == UsageEvents.Event.ACTIVITY_RESUMED) {
        int diff = (int)System.currentTimeMillis() - (int)lastEvent.getTimeStamp();
        diff /= 1000;
        Integer prev = appUsageMap.get(lastEvent.getPackageName());
        if(prev == null) prev = 0;
        appUsageMap.put(lastEvent.getPackageName(), prev + diff);
    }
    return appUsageMap.get(packageName);
}

 public static boolean isAppInstalled(Context context, String packageName) {
        PackageManager packageManager = context.getPackageManager();
        try {
            packageManager.getPackageInfo(packageName, PackageManager.GET_ACTIVITIES);
            return true;
        } catch (PackageManager.NameNotFoundException e) {
            return false;
        }
    }
}


