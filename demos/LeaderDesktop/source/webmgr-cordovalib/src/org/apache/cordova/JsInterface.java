package org.apache.cordova;

import android.app.Activity;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

public class JsInterface {

	protected WebView webView;
	protected Activity activity;

	public JsInterface(WebView webView, Activity activity) {
		this.webView = webView;
		this.activity = activity;
	}

	@JavascriptInterface
	public void backHome(){
		webView.loadUrl("file:///android_asset/www/pages/ldzm/index.html#/enter");
	}

	@JavascriptInterface
	public void fingerprint(){
		//webView.loadUrl("file:///android_asset/www/pages/ldzm/index.html#/enter");
		Log.i("JsInterface", "============>title:"+activity.getTitle()+",theme:"+activity.getTheme());
	}
}
