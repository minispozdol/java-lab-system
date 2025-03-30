package com.CodeCrafters.se761.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ResolvableType;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.*;

@Controller
public class LoginController {

    private final UserRepository userRepository;

    private static String authorizationRequestBaseUri
            = "/oauth2/authorization";
    Map<String, String> oauth2AuthenticationUrls
            = new HashMap<>();

    @Autowired
    private ClientRegistrationRepository clientRegistrationRepository;

    public LoginController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/oauth_login")
    public String getLoginPage(Model model) {
        Iterable<ClientRegistration> clientRegistrations = null;
        ResolvableType type = ResolvableType.forInstance(clientRegistrationRepository)
                .as(Iterable.class);
        if (type != ResolvableType.NONE &&
                ClientRegistration.class.isAssignableFrom(type.resolveGenerics()[0])) {
            clientRegistrations = (Iterable<ClientRegistration>) clientRegistrationRepository;
        }

        assert clientRegistrations != null;
        clientRegistrations.forEach(registration ->
                oauth2AuthenticationUrls.put(registration.getClientName(),
                        authorizationRequestBaseUri + "/" + registration.getRegistrationId()));
        model.addAttribute("urls", oauth2AuthenticationUrls);

        return "login";
    }

    @GetMapping("/success")
    //@GetMapping("/login/oauth2/code/**")
    public String handleGoogleOAuth2Callback(OAuth2AuthenticationToken authentication) {
        if (authentication == null) {
            // Log an error or add debugging output
            System.err.println("Authentication token is null");
        } else {
            // Get the user's access token
            System.out.println("Authentication successfully achieved");
            String userEmail = (String) authentication.getPrincipal().getAttributes().get("email");
            Users user = userRepository.findByEmail(userEmail).orElse(null);

            List<GrantedAuthority> authorities = new ArrayList<>(authentication.getAuthorities());

//            if (userEmail != null) {
            GrantedAuthority newAuthority = null;

            if (user == null) {
                newAuthority = new SimpleGrantedAuthority("ROLE_STUDENT");
            } else if ("admin".equals(user.getUserProfile())) {
                newAuthority = new SimpleGrantedAuthority("ROLE_ADMIN");
            } else if ("staff".equals(user.getUserProfile())) {
                newAuthority = new SimpleGrantedAuthority("ROLE_STAFF");
            } else {
                newAuthority = new SimpleGrantedAuthority("ROLE_STUDENT");
            }

            authorities.add(newAuthority);

            // Create a new Authentication object with updated authorities
            OAuth2AuthenticationToken newAuthentication = new OAuth2AuthenticationToken(
                    authentication.getPrincipal(),
                    authorities,
                    authentication.getAuthorizedClientRegistrationId()
            );

            // Set the new Authentication in the SecurityContextHolder
            SecurityContextHolder.getContext().setAuthentication(newAuthentication);

            if (authorities.contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
                return "dashboard";
            } else if (authorities.contains(new SimpleGrantedAuthority("ROLE_STAFF"))) {
                return "equipmentList";
            } else {
                return "equipmentList";
            }
        }
        // Handle the case when authentication is null
        return "login"; // Or return an appropriate response
    }

    @GetMapping("/getRole")
    public ResponseEntity<String> getRole(OAuth2AuthenticationToken authentication){
        if (authentication == null) {
            System.err.println("Authentication token is null");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
        else {
            Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
            String role = authorities.stream()
                    .map(GrantedAuthority::getAuthority)
                    .filter(authority -> authority.startsWith("ROLE_"))
                    .findFirst()
                    .orElse("ROLE_STUDENT");
            return ResponseEntity.ok(role);
        }
    }

    @GetMapping("/getUPI")
    public ResponseEntity<String> getUPI(OAuth2AuthenticationToken authentication){
        if (authentication == null) {
            System.err.println("Authentication token is null");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        } else {
            String upi = authentication.getPrincipal().getAttribute("email");
            if (upi != null) {
                String[] emailParts = upi.split("@");
                String userPart = emailParts[0];
                return ResponseEntity.ok(userPart);
            } else {
                System.err.println("Email attribute is null");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
            }
        }
    }

}

