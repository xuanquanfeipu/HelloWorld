/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.zte.leaderDesktop;

import org.apache.cordova.CordovaActivity;

import android.Manifest;
import android.content.pm.PackageManager;
import android.content.res.Configuration;
import android.content.res.Resources;
import android.os.Bundle;
import android.support.annotation.NonNull;

import com.zte.runtimepermissiondemo.PermissionHelper;

public class MainActivity extends CordovaActivity
{
    //返回值
    private static final int  WRITE_RESULT_CODE = 12;
    //权限名称
    private static final String  WRITE_PERMISSION = Manifest.permission.WRITE_EXTERNAL_STORAGE;

    //权限检测类
    private PermissionHelper mPermissionHelper;
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        
        //使App文字大小不随系统字体大小变化而变化
        Resources res = super.getResources();  
        Configuration config=new Configuration();  
        config.setToDefaults();  
        res.updateConfiguration(config,res.getDisplayMetrics());

        /*
        //实例化一个对象 否则空指针
        mPermissionHelper = new PermissionHelper(this);
        //判断权限授权状态
        boolean b = mPermissionHelper.checkPermission(WRITE_PERMISSION);
        //Toast toast =Toast.makeText(this, "b:"+b, Toast.LENGTH_SHORT);
        //toast.show();
        //如果没有获取到权限,则尝试获取权限
        if (!b){
            mPermissionHelper.permissionsCheck(WRITE_PERMISSION,WRITE_RESULT_CODE);
        }
        */

        // Set by <content src="index.html" /> in config.xml
        // 无论有没有权限都跳转到首页
        loadUrl(launchUrl);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        switch(requestCode){
            case WRITE_RESULT_CODE:
                if (grantResults.length > 0
                        && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                   // loadUrl(launchUrl);
                } else {
                    //如果请求失败
                    mPermissionHelper.startAppSettings();
                }
                break;
        }
    }
/*
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        Log.i("MainActivity", "============>requestCode:"+requestCode+",resultCode:"+resultCode);
        //Toast.makeText(this, "============>requestCode:"+requestCode+",resultCode:"+resultCode,Toast.LENGTH_SHORT).show();
        if (resultCode == 2) {
            if (requestCode == 1) {
                Log.i("MainActivity", "============>fingerprint result:"+data.getStringExtra("result"));
                //Toast.makeText(this, "============>fingerprint result:"+data.getStringExtra("result"),Toast.LENGTH_SHORT).show();
            }
        }
    }
*/
}
