package com.CodeCrafters.se761.user;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeHttpRequests()
                .requestMatchers("/", "/oauth_login", "/login/oauth2/code/**", "/process").permitAll()
                .requestMatchers("/equipmentAdd").hasRole("ADMIN")
                        .requestMatchers("/student/**").hasRole("STUDENT")
                        .requestMatchers("/staff/**").hasRole("STAFF")
                .anyRequest().authenticated()
                .and()
                .oauth2Login()
                .loginPage("/oauth_login")

                .defaultSuccessUrl("/success", true);


        return http.build();
    }

}
