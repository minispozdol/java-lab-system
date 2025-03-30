package com.CodeCrafters.se761.controller;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Collection;


@Controller
public class WebPageController {

    @GetMapping("/equipmentList")
    public String showEquipmentListPage() {
        return "equipmentList";
    }

    @GetMapping("/equipmentDetail")
    public String showEquipmentDetailPage(@RequestParam(name = "sysID") String sysID, Model model) {
        return "equipmentDetail";
    }

    @GetMapping("/newBooking/{systemID}")
    public String showNewBookingPage(@PathVariable Long systemID) {
        return "newBooking";
    }
    @GetMapping("/BookingCalendar/{systemID}")
    public String showBookingCalendarPage(@PathVariable Long systemID) {
        return "bookingCalendar";
    }

    @GetMapping("/incidentDetail/{BookingID}")
    public String showIncidentDetailPage(@PathVariable Long BookingID) {
        return "incidentDetail";
    }

   @GetMapping("/newIncident/{BookingID}")
    public String newIncidentPage(@PathVariable Long BookingID) {
        return "newIncident";
    }

    @GetMapping("/viewBooking/{systemID}")
    public String showBookingViewUser(@PathVariable Long systemID) {
        return "bookingViewUser";
    }

    @GetMapping("/studentBookings")
    public String showMyBookingPage() {
        return "studentBookings";
    }


    @GetMapping("/equipmentAdd")
    public String addEquipmentPage(OAuth2AuthenticationToken authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            // Get the user's roles
            Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
            if (authorities.stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN") || a.getAuthority().equals("ROLE_STAFF"))) {
                return "equipmentAdd";
            }

            return "equipmentList";
        }
        return "Access Denied";
    }

    //Redirecting depending on what role is assigned to the user
    @GetMapping("/allBookings")
    public  String showBookingPage(OAuth2AuthenticationToken authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            // Get the user's roles
            Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
            if (authorities.stream().anyMatch(a -> a.getAuthority().equals("ROLE_STUDENT"))) {
                return "studentBookings";
            }

            return "allBookings";
        }
        return "Access Denied";
    }

    @GetMapping("/bookingView")
    public String showBookingView() {
        return "bookingViewUser";
    }

    @GetMapping("/allIncidents")
    public String showAllIncidentsPage() {
        return "allIncidents";
    }

    @GetMapping("/dashboard")
    public String showDashBoard() {
        return "dashboard";
    }
}

