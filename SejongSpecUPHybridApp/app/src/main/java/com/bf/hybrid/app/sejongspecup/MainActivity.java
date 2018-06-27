package com.bf.hybrid.app.sejongspecup;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {
    private WebView mWebView; //웹뷰
    private WebSettings mWebSettings; //웹뷰세팅

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // 웹뷰 세팅
        mWebView = (WebView)findViewById(R.id.webview); //레이어와 연결
        mWebView .setWebViewClient(new WebViewClient()); // 클릭시 새창 안뜨게
        mWebSettings = mWebView.getSettings(); //세부 세팅 등록
        mWebSettings.setJavaScriptEnabled(true); // 자바스크립트 사용 허용

        mWebView.loadUrl("http://34.219.126.51:3000/"); //원하는 URL  입력
    }

    public void onBackPressed() {
        if(mWebView.canGoBack()) mWebView.goBack();
        else finish();
    }
}
