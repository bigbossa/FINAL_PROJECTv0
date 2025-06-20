import { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "th";

type LanguageProviderProps = {
  children: React.ReactNode;
  defaultLanguage?: Language;
};

type LanguageProviderState = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const LanguageProviderContext = createContext<LanguageProviderState | undefined>(undefined);

// Translation dictionary
const translations: Record<Language, Record<string, string>> = {
  en: {
    "app.title": "Ban Phuttachad Dormitory",
    "nav.dashboard": "Dashboard",
    "nav.rooms": "Rooms",
    "nav.tenants": "Tenants",
    "nav.staff": "Staff",
    "nav.billing": "Billing",
    "nav.repairs": "Repairs",
    "nav.announcements": "Announcements",
    "nav.reports": "Reports",
    "nav.profile": "Profile",
    "nav.settings": "Settings",
    "auth.login": "Login",
    "auth.logout": "Logout",
    "auth.register": "Register",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.confirmPassword": "Confirm Password",
    "auth.role": "Role",
    "auth.welcomeBack": "Welcome back",
    "auth.pleaseLogin": "Please login to continue",
    "dashboard.welcome": "Welcome to your Dashboard",
    "dashboard.summary": "Here's a summary of your dormitory",
    "dashboard.totalRooms": "Total Rooms",
    "dashboard.occupiedRooms": "Occupied",
    "dashboard.vacantRooms": "Vacant",
    "dashboard.pendingRepairs": "Pending Repairs",
    "dashboard.monthlyRevenue": "Monthly Revenue",
    "dashboard.Description": "Revenue trend over the last 6 months",
    "rooms.management": "Room Management",
    "rooms.number": "Room Number",
    "rooms.type": "Room Type",
    "rooms.status": "Status",
    "rooms.rent": "Monthly Rent",
    "rooms.size": "Room Size",
    "rooms.add": "Add Room",
    "rooms.add_description": "Add a new room to the dormitory.",
    "Standard.Single": "Standard Single Room",
    "Standard.Double": "Standard Double Room",
    "satatus.occupied": "Occupied",
    "satatus.vacant": "Vacant",
    "satatus.maintenance": "Maintenance",
    "rooms.capacity": "Capacity",
    "rooms.Floor": "Floor",
    "status.text": "Room Status",
    "rooms.edit": "Edit Room",
    "rooms.delete": "Delete Room",
    "tenants.management": "Tenant Management",
    "tenants.name": "Name",
    "tenants.room": "Room",
    "tenants.contactInfo": "Contact Info",
    "tenants.leaseStart": "Lease Start",
    "tenants.leaseEnd": "Lease End",
    "tenants.add": "Add Tenant",
    "tenants.edit": "Edit Tenant",
    "tenants.delete": "Delete Tenant",
    "repairs.management": "Repair Management",
    "repairs.room": "Room",
    "repairs.description": "Description",
    "repairs.status": "Status",
    "repairs.date": "Date Reported",
    "repairs.add": "Add Repair Request",
    "repairs.edit": "Edit Repair",
    "repairs.delete": "Delete Repair",
    "repairs.viewDetails": "Repair Details",
    "repairs.roomNumber": "Room",
    "repairs.reportedDate": "Reported Date",
    "repairs.completedDate": "Completed Date",
    "repairs.status.pending": "Pending",
    "repairs.status.in_progress": "In Progress",
    "repairs.status.completed": "Completed",
    "repairs.status.cancelled": "Cancelled",
    "language.en": "English",
    "language.th": "Thai",
    "theme.light": "Light",
    "theme.dark": "Dark",
    "roomer.text1": "Room Status",
    "roomer.text2": "Current room occupancy",
    "footer.rights": "All rights reserved",
    "welcome.title": "Welcome to Ban Phuttachad, Nakhon Pathom",
    "welcome.subtitle": "Modern living spaces for students",
    "welcome.login": "Login ",
    "welcome.explore": "Rooms Detils",
    "welcome.features": "Our Features",
    "welcome.location": "Prime Location",
    "welcome.security": "24h Security",
    "welcome.amenities": "Modern Amenities",
    "welcome.contact": "Contact Us",
    "profile.title": "Profile",
    "profile.manage": "Manage your personal information",
    "profile.firstName": "First Name",
    "profile.lastName": "Last Name",
    "profile.email": "Email",
    "profile.phone": "Phone Number",
    "profile.address": "Address",
    "profile.enterPhone": "Enter your phone number",
    "profile.enterAddress": "Enter your address",
    "profile.save": "Save Changes",
    "profile.saving": "Saving...",
    "profile.saveSuccess": "Profile saved successfully!",
    "profile.saveError": "Could not save profile",
    "profile.userNotFound": "User not found",
    "profile.genericError": "An error occurred while saving",
    "system.title": "System Settings",
    "system.description": "System configuration and maintenance (admin only)",
    "system.info": "System Information",
    "system.totalRooms": "Total Rooms",
    "system.occupiedRooms": "Occupied Rooms",
    "system.totalTenants": "Total Tenants",
    "system.pendingRepairs": "Pending Repairs",
    "system.config": "System Configuration",
    "system.waterRate": "Water Rate (THB/unit)",
    "system.electricityRate": "Electricity Rate (THB/unit)",
    "system.lateFee": "Late Payment Fee (%)",
    "system.depositRate": "Deposit Rate (times rent)",
    "system.save": "Save Settings",
    "system.saving": "Saving...",
    "system.maintenance": "System Maintenance",
    "system.backup": "Backup Data",
    "system.backuping": "Backing up...",
    "system.backupSuccess": "Backup completed!",
    "system.backupError": "Could not backup data",
    "system.clearCache": "Clear Cache",
    "system.clearCacheSuccess": "Cache cleared!",
    "system.clearCacheError": "Could not clear cache",
    "system.check": "System Check",
    "system.status": "System Status",
    "system.database": "Database",
    "system.connection": "Connection",
    "system.storage": "Storage",
    "system.normal": "Normal",
    "system.used": "Used 65%",
    "reports.title": "Reports",
    "reports.subtitle": "View and analyze dormitory data",
    "reports.export": "Export",
    "reports.options": "Report Options",
    "reports.optionsDesc": "Select the report type and time frame",
    "reports.type": "Report Type",
    "reports.period": "Time Period",
    "reports.period.month": "This Month",
    "reports.period.quarter": "This Quarter",
    "reports.period.year": "This Year",
    "reports.period.custom": "Custom Range",
    "reports.occupancy.title": "Occupancy Trends",
    "reports.occupancy.desc": "Monthly occupancy rates for the dormitory",
    "reports.occupancy.label": "Occupancy Rate",
    "reports.revenue.title": "Revenue Analysis",
    "reports.revenue.desc": "Monthly revenue data for the dormitory",
    "reports.revenue.label": "Revenue",
    "reports.rooms.title": "Room Type Distribution",
    "reports.rooms.desc": "Distribution of different room types in the dormitory",
    "reports.repairs.title": "Repair Request Analysis",
    "reports.repairs.desc": "Distribution of different types of repair requests",
    "reports.events.title": "Event Attendance",
    "reports.events.desc": "This report is not available yet",
    "reports.comingSoon": "Coming Soon",
    "reports.comingSoonDesc": "Event attendance analytics are currently being developed and will be available soon.",
    "reports.rooms.label": "Rooms",
    "reports.repairs.label": "Requests",
    "month.Jan": "Jan",
    "month.Feb": "Feb",
    "month.Mar": "Mar",
    "month.Apr": "Apr",
    "month.May": "May",
    "month.Jun": "Jun",
    "month.Jul": "Jul",
    "month.Aug": "Aug",
    "month.Sep": "Sep",
    "month.Oct": "Oct",
    "month.Nov": "Nov",
    "month.Dec": "Dec",
    "announcements.add": "Add Announcement",
    "announcements.createDescription": "Create a new announcement for residents.",
    "announcements.title": "Title",
    "announcements.titlePlaceholder": "Announcement Title",
    "announcements.content": "Content",
    "announcements.contentPlaceholder": "Announcement details...",
    "announcements.date": "Date",
    "announcements.markImportant": "Mark as Important",
    "announcements.calendar": "Calendar",
    "announcements.forDate": "Announcements for ",
    "announcements.today": "Today",
    "announcements.important": "Important",
    "announcements.edit": "Edit",
    "announcements.delete": "Delete",
    "announcements.noForDate": "No announcements for this date",
    "announcements.recent": "Recent Announcements",
    "announcements.noAvailable": "No announcements available",
    "announcements.added": "Announcement Added",
    "announcements.addedDesc": "The announcement has been successfully added.",
    "announcements.deleted": "Announcement Deleted",
    "announcements.deletedDesc": "The announcement has been successfully deleted.",
    "days.Sun": "Sun",
    "days.Mon": "Mon",
    "days.Tue": "Tue",
    "days.Wed": "Wed",
    "days.Thu": "Thu",
    "days.Fri": "Fri",
    "days.Sat": "Sat",
    "type.text": "type",
    "Actions.text": "Actions",
    "View.Details": "View Details",
    "Edit.text": "Edit",
    "Change.Status": "Change Status",
    "Set.as": "Set as",
    "Roomstatus.has": "Room status has been updated to",
    "repairs.markInProgress": "Mark as In Progress",
    "repairs.markCompleted": "Mark as Completed",
    "repairs.markCancelled": "Mark as Cancelled",
    "repairs.markPending": "Mark as Pending",
    "repairs.actions": "Actions"
  },

  th: {
    // ทำแบบเดียวกัน — ลบ key ซ้ำออก
    // ...
  }
};

export function LanguageProvider({ children, defaultLanguage = "en" }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(() =>
    (localStorage.getItem("language") as Language) || defaultLanguage
  );

  useEffect(() => {
    document.documentElement.setAttribute("lang", language);
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string): string => translations[language][key] || key;

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageProviderContext.Provider value={value}>
      {children}
    </LanguageProviderContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
