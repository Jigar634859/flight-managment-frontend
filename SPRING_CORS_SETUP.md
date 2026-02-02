# Spring Boot CORS Configuration Guide

## ⚠️ Important: CORS Must Be Configured in Your Spring Boot Backend

CORS (Cross-Origin Resource Sharing) is a **browser security feature** that must be handled by the **server (backend)**, not the frontend.

## Why CORS is Needed

- React app runs on: `http://localhost:3000`
- Spring Boot runs on: `http://localhost:8080`
- Different origins = Browser blocks requests unless backend allows it

## Spring Boot CORS Configuration

### Option 1: Global CORS Configuration (Recommended)

Create a configuration class in your Spring Boot project:

**File: `src/main/java/com/yourpackage/config/CorsConfig.java`**

```java
package com.yourpackage.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:3000")  // React app URL
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                    .allowedHeaders("*")
                    .allowCredentials(true)
                    .maxAge(3600);
            }
        };
    }
}
```

### Option 2: Controller-Level CORS (Alternative)

Add `@CrossOrigin` annotation to your controllers:

```java
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class FlightController {
    // Your endpoints
}
```

### Option 3: Security Configuration (If using Spring Security)

If you're using Spring Security, add CORS configuration:

**File: `src/main/java/com/yourpackage/config/SecurityConfig.java`**

```java
package com.yourpackage.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable()) // Or configure CSRF properly
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/users/register", "/api/users/login").permitAll()
                .requestMatchers("/api/admin/login").permitAll()
                .requestMatchers("/api/flights").permitAll() // Public flights
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            );
        return http.build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        return source;
    }
}
```

## Testing CORS Configuration

After adding CORS configuration:

1. **Restart your Spring Boot application**
2. **Check browser console** - Should see no CORS errors
3. **Test API calls** from React app

## Common CORS Errors and Solutions

### Error: `Access to XMLHttpRequest blocked by CORS policy`

**Solution:** Make sure your Spring Boot CORS config includes:
- Correct origin: `http://localhost:3000` (not `http://localhost:3000/`)
- `allowCredentials(true)` if using cookies/auth tokens
- All required HTTP methods (GET, POST, PUT, DELETE, OPTIONS)

### Error: `CORS preflight request failed`

**Solution:** Ensure OPTIONS method is allowed:
```java
.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
```

### Error: `Credentials flag is true, but Access-Control-Allow-Credentials is not 'true'`

**Solution:** Add `allowCredentials(true)` in your CORS config

## Production Configuration

For production, update the allowed origin:

```java
.allowedOrigins("https://yourdomain.com", "https://www.yourdomain.com")
```

Or use environment variable:

```java
.allowedOrigins(System.getenv("FRONTEND_URL") != null ? 
    System.getenv("FRONTEND_URL") : "http://localhost:3000")
```

## Quick Checklist

- [ ] CORS configuration added to Spring Boot backend
- [ ] Allowed origin set to `http://localhost:3000`
- [ ] All HTTP methods included (GET, POST, PUT, DELETE, OPTIONS)
- [ ] `allowCredentials(true)` if using authentication
- [ ] Spring Boot application restarted
- [ ] Test API call from React app
