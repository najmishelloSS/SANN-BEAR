
package com.example.demo;

import android.app.Application;
import com.stripe.android.PaymentConfiguration;

public class MyApp extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        PaymentConfiguration.init(
            getApplicationContext(),
            "pk_test_51ORPauC1wAehoBy5RVL9j1UnBmtilUN38wT4vUwteBMBgp3GEHbY4UYdpwXabAjG3FvIbMQ9y2YhQ0bxB8g7vCM600E1D7REkI"
        );
    }
}