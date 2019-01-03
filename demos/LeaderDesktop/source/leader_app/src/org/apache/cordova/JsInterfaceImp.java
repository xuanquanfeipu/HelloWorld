package org.apache.cordova;

import android.app.Activity;
import android.content.SharedPreferences;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Toast;

import com.zte.fingerprint.FingerprintCore;
import com.zte.fingerprint.FingerprintUtil;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by 10090009 on 2018/1/27.
 */
public class JsInterfaceImp extends JsInterface {

    private static FingerprintCore mFingerprintCore;
    private static int FingerprintStatus = -1;

    public JsInterfaceImp(WebView webView, Activity activity) {
        super(webView, activity);
    }

    @JavascriptInterface
    /**
     * 返回主页
     */
    public void backHome(){
        webView.loadUrl("file:///android_asset/www/pages/ldzm/index.html#/enter");
    }


    @JavascriptInterface
    /**
     * 是否支持指纹识别
     */
    public int isFingerPrintSupport(){
        if(mFingerprintCore==null) {
            mFingerprintCore = new FingerprintCore(activity);
            mFingerprintCore.setFingerprintManager(mResultListener);
            //mKeyguardLockScreenManager = new KeyguardLockScreenManager(activity);
        }
        if(mFingerprintCore.isSupport()){
            if(mFingerprintCore.isHasEnrolledFingerprints()){
                //正常指纹识别
                return 1;
            }else{
                //未录入指纹
                return 2;
            }
        }else{ //不支持指纹识别
            return 0;
        }
    }

    @JavascriptInterface
    /**
     * 开始指纹识别
     */
    public boolean startFingerPrint(){
        /**
        Log.i("JsInterface", "============>title:"+activity.getTitle()+",theme:"+activity.getTheme());
        Intent intent = new Intent(activity, FingerprintMainActivity.class);
        activity.startActivityForResult(intent,1);
        Log.i("JsInterface", "============>open settings");
         **/

        if(!mFingerprintCore.isAuthenticating()){
            startFingerprintRecognition();
        }
        FingerprintStatus = -1;
        return mFingerprintCore.isAuthenticating();
    }

    @JavascriptInterface
    /**
     * 停止指纹识别
     */
    public boolean stopFingerPrint() {
        if (mFingerprintCore.isAuthenticating()) {
            mFingerprintCore.cancelAuthenticate();
        }
        FingerprintStatus = -1;
        return mFingerprintCore.isAuthenticating();
    }

    @JavascriptInterface
    /**
     * 获取手势状态  -1：等待识别状态  0：识别成功  1：识别失败  2：识别错误
     */
    public int getFingerprintStatus(){
        return FingerprintStatus;
    }

    @JavascriptInterface
    /**
     * 设置是否启用某种认证方式
     * @param authType 支持Password、Fingerprint、Gesture
     * @param isEnable 是否启用
     */
    public boolean setAppAuth(String authType,boolean isEnable){
        if(!"Password".equals(authType) && !"Fingerprint".equals(authType) && !"Gesture".equals(authType)){
            return false;
        }
        SharedPreferences preferences = activity.getSharedPreferences("UserInfo", activity.MODE_PRIVATE);
        String username = preferences.getString("RecentUser",null);
        if(username!=null) {
            preferences.edit()
                    .putBoolean(username + ".Auth" + authType, isEnable)
                    .commit();
            return true;
        }
        return false;
    }

    @JavascriptInterface
    /**
     * 查询某种认证方式是否启用
     * @param authType 支持Password、Fingerprint、Gesture
     */
    public boolean isAppAuth(String authType){
        if(!"Password".equals(authType) && !"Fingerprint".equals(authType) && !"Gesture".equals(authType)){
            return false;
        }
        SharedPreferences preferences = activity.getSharedPreferences("UserInfo", activity.MODE_PRIVATE);
        String username = preferences.getString("RecentUser",null);
        if(null == username){//没用最近用户时,需要认证密码
            return "Password".equals(authType);
        }
        return preferences.getBoolean(username + ".Auth" + authType,false);
    }

    @JavascriptInterface
    /**
     * 设置当前用户的手势
     * @param esture 手势值
     */
    public boolean setGesture(String gesture){
        if(gesture==null || "".equals(gesture)){
            return false;
        }
        SharedPreferences preferences = activity.getSharedPreferences("UserInfo", activity.MODE_PRIVATE);
        String username = preferences.getString("RecentUser",null);
        if(null == username){//没用最近用户时,需要认证密码
            return false;
        }
        preferences.edit()
                .putString(username+".Gesture",gesture)
                .commit();
        return true;
    }

    @JavascriptInterface
    /**
     * 获取当前用户的手势
     */
    public String getGesture(){
        SharedPreferences preferences = activity.getSharedPreferences("UserInfo", activity.MODE_PRIVATE);
        String username = preferences.getString("RecentUser",null);
        if(null == username){
            return "";
        }
        return preferences.getString(username+".Gesture","");
    }

    @JavascriptInterface
    /**
     * 清除所有用户缓存及设置
     */
    public boolean clearSettings(){
        SharedPreferences preferences = activity.getSharedPreferences("UserInfo", activity.MODE_PRIVATE);
        preferences.edit().clear().commit();
        return true;
    }

    @JavascriptInterface
    /**
     * 将用户信息保存到缓存
     * @param username 用户密码
     * @param password 用户密码
     */
    public void saveUser(String username,String password){
        if(username==null||password==null||"".equals(username)||"".equals(password)){
            return;
        }
        /*
            UserInfo保存结构
            UserInfo = {
                "username1.Username":"username1",   //用户名
                "username1.Password":"password1",   //用户密码
                "username1.AuthPassword":true/false,    //是否密码认证
                "username1.AuthFingerprint":true/false, //是否指纹认证
                "username1.AuthGesture":true/false,     //是否手势认证
                "username1.Gesture":"13579",            //手势
                "username2.Username":"username2",
                "username2.Password":"password2",
                "username2.AuthPassword":true/false,
                "username2.AuthFingerprint":true/false,
                "username2.AuthGesture":true/false,
                "username2.Gesture":"24680",
                "RecentUser":"username1",       //当前用户
                "UsernameSet":{username1,username2,...} //用户集合
            }
         */
        SharedPreferences preferences = activity.getSharedPreferences("UserInfo", activity.MODE_PRIVATE);
        Set<String> usernameSet = preferences.getStringSet("UsernameSet",new HashSet<String>());
        boolean firstTime = !usernameSet.contains(username); //用户是否第一次加入
        usernameSet.add(username);
        preferences.edit()
            .putString(username+".Username",username)
            .putString(username+".Password",password)
            .putString("RecentUser",username)
            .putStringSet("UsernameSet",usernameSet)
            .commit();

        if(firstTime) { //设置默认认证方式为密码
            setAppAuth("Password", true);
            setAppAuth("Fingerprint", false);
            setAppAuth("Gesture", false);
        }
    }

    @JavascriptInterface
    /**
     * 查询最近一次登录的用户
     */
    public String  getRecentUser(){
        SharedPreferences preferences = activity.getSharedPreferences("UserInfo", activity.MODE_PRIVATE);
        String username = preferences.getString("RecentUser",null);
        if(null==username) {
            return null;
        } else {
            String password = preferences.getString(username+".Password",null);
            return String.format("{'username':'%s','password':'%s'}",username,password);
        }
    }

    /**
     * 指纹识别结果监听
     */
    private FingerprintCore.IFingerprintResultListener mResultListener = new FingerprintCore.IFingerprintResultListener() {
        @Override
        public void onAuthenticateSuccess() {
            FingerprintStatus = 0;
            //Toast.makeText(activity, "指纹识别成功",Toast.LENGTH_SHORT).show();
        }

        @Override
        public void onAuthenticateFailed(int helpId) {
            FingerprintStatus = 1;
            //Toast.makeText(activity, "指纹识别失败",Toast.LENGTH_SHORT).show();
        }

        @Override
        public void onAuthenticateError(int errMsgId) {
            FingerprintStatus = 2;
            //Toast.makeText(activity, "指纹识别错误",Toast.LENGTH_SHORT).show();
        }

        @Override
        public void onStartAuthenticateResult(boolean isSuccess) {

        }
    };

    /**
     * 启用指纹识别操作
     */
    private void startFingerprintRecognition() {
        if (mFingerprintCore.isSupport()) {
            if (!mFingerprintCore.isHasEnrolledFingerprints()) {
                Toast.makeText(activity, "您还没有录入指纹",Toast.LENGTH_SHORT).show();
                FingerprintUtil.openFingerPrintSettingPage(activity);
                return;
            }
            //Toast.makeText(activity, "请进行指纹识别，长按指纹解锁键",Toast.LENGTH_SHORT).show();
            if (mFingerprintCore.isAuthenticating()) {
                //Toast.makeText(activity, "指纹识别已经开启，长按指纹解锁键",Toast.LENGTH_SHORT).show();
            } else {
                mFingerprintCore.startAuthenticate();
            }
        } else {
            Toast.makeText(activity, "此设备不支持指纹解锁",Toast.LENGTH_SHORT).show();
        }
    }


}
