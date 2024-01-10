package io.ionic.starter;

import android.os.Bundle;
 import com.getcapacitor.BridgeActivity;
 import com.getcapacitor.community.stripe.StripePlugin;

 public class MainActivity extends BridgeActivity {
     @Override
     public void onCreate(Bundle savedInstanceState) {
        registerPlugin(com.getcapacitor.community.stripe.StripePlugin.class);
         super.onCreate(savedInstanceState);
         
     }
 }
