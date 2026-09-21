import { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBaseball, faBaseballBatBall, faBasketball, faFootball, faFutbol, faMedal,
  faPersonRunning, faPersonSwimming, faSchool, faStopwatch, faUsers, faVolleyball
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  AlertCircle, ArrowRight, Bell, Building2, Bus, CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, IdCard,
  CircleGauge, ClipboardList, Clock3, FileBarChart, GraduationCap, LayoutDashboard,
  List, ListChecks, LogOut, Menu, Moon, MoreHorizontal, Palette, PanelLeft, Plus, School, Search, Settings,
  ShieldCheck, SlidersHorizontal, Sun, Users, UserRound, Volleyball, XCircle, Zap
} from "lucide-react";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { ButtonGroup } from "./components/ui/button-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./components/ui/dropdown-menu";
import { Input } from "./components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { cn } from "./lib/utils";
import playonLogo from "./assets/playon-logo.svg";

type Page = "today" | "calendar" | "events" | "teams" | "players" | "students" | "facilities" | "reports" | "users" | "alerts" | "integrations" | "settings";
type Tone = "ok" | "warn" | "danger" | "neutral";
type ThemeMode = "light" | "dark" | "system";
type Sport = "Baseball" | "Basketball" | "Cross country" | "Football" | "Lacrosse" | "Meeting" | "School-wide" | "Soccer" | "Softball" | "Swimming" | "Track" | "Volleyball";
type ScheduleEvent = { time: string; status: string; tone: Tone; sport: Sport; title: string; detail: string; opponent?: string; bus?: string; officials?: string; families?: string };

const SPORT_ICONS: Record<Sport, IconDefinition> = {
  Baseball: faBaseball,
  Basketball: faBasketball,
  "Cross country": faPersonRunning,
  Football: faFootball,
  Lacrosse: faMedal,
  Meeting: faUsers,
  "School-wide": faSchool,
  Soccer: faFutbol,
  Softball: faBaseballBatBall,
  Swimming: faPersonSwimming,
  Track: faStopwatch,
  Volleyball: faVolleyball,
};

const NAV: { group: string; items: { id: Page; label: string; icon: typeof CalendarDays; count?: number }[] }[] = [
  { group: "School", items: [
    { id: "today", label: "Today", icon: CircleGauge, count: 10 }, { id: "calendar", label: "Calendar", icon: CalendarDays },
    { id: "events", label: "Events", icon: List, count: 4 }, { id: "teams", label: "Teams", icon: Users },
    { id: "players", label: "Players", icon: UserRound, count: 3 }, { id: "students", label: "Students", icon: GraduationCap },
    { id: "facilities", label: "Facilities", icon: Building2, count: 1 }, { id: "reports", label: "Reports", icon: FileBarChart }
  ]},
  { group: "Administration", items: [
    { id: "users", label: "Users", icon: IdCard }, { id: "alerts", label: "Alerts", icon: Bell, count: 10 },
    { id: "integrations", label: "Integrations", icon: Zap, count: 1 }, { id: "settings", label: "Settings", icon: Settings }
  ]}
];

const initialSchedule: ScheduleEvent[] = [
  { time: "7:30 AM", status: "Confirmed", tone: "ok", sport: "Meeting", title: "Fall coaches meeting", detail: "Aux Gym · all staff" },
  { time: "3:30 PM", status: "Confirmed", tone: "ok", sport: "Volleyball", title: "Volleyball practice", detail: "Main Gym · Varsity" },
  { time: "4:30 PM", status: "On hold", tone: "danger", sport: "Soccer", title: "JV Soccer at Westonka", detail: "Westonka HS · bus 2:45 PM", opponent: "Westonka HS", bus: "Bus 2 · 2:45 PM", officials: "2 of 3", families: "Not yet" },
  { time: "6:00 PM", status: "On hold", tone: "danger", sport: "Football", title: "Varsity Football practice", detail: "Raven Stadium · Varsity" },
  { time: "6:30 PM", status: "Booked", tone: "warn", sport: "Basketball", title: "Fairmont Rec youth league", detail: "Main Gym · external booking" }
];

const changes = [
  { title: "Kickoff moved to 7:00 PM", meta: "Today 6:12 AM · Football", action: "Notify 210 families", tone: "warn" as Tone },
  { title: "Bus request declined", meta: "Today 5:40 AM · Volleyball", action: "Request bus", tone: "danger" as Tone },
  { title: "Invitational added", meta: "Yesterday 10:04 PM · Cross country", action: "Confirm officials", tone: "warn" as Tone },
  { title: "2 athletes cleared to play", meta: "Yesterday 7:31 PM · Football", action: "Open roster", tone: "ok" as Tone }
];

const headerAlerts = [
  { title: "Three contests are on hold", level: "Blocking", tone: "danger" as Tone, meta: "Weather · issued 06:48", note: "Hold and notify families, or clear the hold." },
  { title: "Bus request declined", level: "Blocking", tone: "danger" as Tone, meta: "Volleyball at Kenwood · Sep 18", note: "No driver available. Request a charter." },
  { title: "Kickoff moved to 7:00 PM", level: "Attention", tone: "warn" as Tone, meta: "Football at Lincoln · Sep 12", note: "Families and the stadium still show 7:30 PM." },
  { title: "22 athletes not on a roster", level: "Attention", tone: "warn" as Tone, meta: "Carry forward · Fall 2026", note: "Confirm returning athletes before Friday." },
  { title: "2 athletes cleared to play", level: "Cleared", tone: "ok" as Tone, meta: "Football · yesterday 7:31 PM", note: "Eligible for Friday at Lincoln." },
];

const pageData: Partial<Record<Page, { description: string; tabs: string[]; columns: string[]; rows: string[][] }>> = {
  events: { description: "Contests, practices, meetings and facility bookings for Fall 2026–27.", tabs: ["All events", "Needs attention", "Changes"], columns: ["Event", "Date & time", "Location", "Status"], rows: [
    ["Varsity Football vs Ridgeview", "Fri, Sep 12 · 7:00 PM", "Raven Stadium", "On hold"], ["Volleyball at Eastview", "Fri, Sep 12 · 5:30 PM", "Eastview HS", "Confirmed"], ["Cross country invitational", "Sat, Sep 13 · 9:00 AM", "Lake Park", "Needs officials"], ["JV Soccer at Westonka", "Today · 4:30 PM", "Westonka HS", "On hold"] ] },
  teams: { description: "Team operations, staff assignments and season health.", tabs: ["Fall", "Winter", "Spring"], columns: ["Team", "Level", "Head coach", "Athletes", "Health"], rows: [
    ["Football", "Varsity", "Marcus Reed", "54", "Ready"], ["Volleyball", "Varsity", "Elena Ruiz", "31", "Ready"], ["Soccer", "JV", "Chris Howard", "28", "1 open item"], ["Cross country", "Varsity", "Maya Chen", "44", "Needs review"] ] },
  players: { description: "Athlete eligibility, roster placement and participation.", tabs: ["All players", "Eligibility", "Roster gaps"], columns: ["Player", "Grade", "Teams", "Eligibility", "Requirements"], rows: [
    ["Avery Carter", "11", "Football", "Eligible", "Complete"], ["Mia Johnson", "10", "Volleyball", "Eligible", "Complete"], ["Noah Williams", "12", "Soccer", "Hold", "Physical expired"], ["Evelyn Brooks", "9", "Cross country", "Review", "Guardian signature"] ] },
  students: { description: "Student participation records shared across athletics.", tabs: ["Active", "Registration", "Documents"], columns: ["Student", "Grade", "Programs", "Registration", "Documents"], rows: [
    ["Avery Carter", "11", "2", "Submitted", "Complete"], ["Mia Johnson", "10", "1", "Submitted", "Complete"], ["Noah Williams", "12", "2", "Submitted", "1 expired"], ["Evelyn Brooks", "9", "1", "Draft", "2 missing"] ] },
  facilities: { description: "Spaces, conflicts, bookings and maintenance windows.", tabs: ["Facilities", "Bookings", "Conflicts"], columns: ["Facility", "Type", "Today", "Next event", "Status"], rows: [
    ["Raven Stadium", "Outdoor", "2 events", "Football · 6:00 PM", "Available"], ["Main Gym", "Indoor", "3 events", "Volleyball · 3:30 PM", "Conflict"], ["Aux Gym", "Indoor", "1 event", "Coaches meeting · 7:30 AM", "Available"], ["North Field", "Outdoor", "0 events", "Soccer · Tomorrow", "Maintenance"] ] },
  users: { description: "School staff, roles and access to School OS.", tabs: ["People", "Roles", "Invitations"], columns: ["User", "Role", "Scope", "Last active", "Status"], rows: [
    ["Jordan Lee", "Athletic Director", "Riverside High", "Now", "Active"], ["Marcus Reed", "Coach", "Football", "14 min ago", "Active"], ["Taylor Morgan", "Trainer", "All teams", "1 hr ago", "Active"], ["Casey Bell", "Facilities lead", "Facilities", "Yesterday", "Invited"] ] },
  alerts: { description: "Operational issues that need an owner or decision.", tabs: ["Open", "Assigned to me", "Resolved"], columns: ["Alert", "Area", "Opened", "Owner", "Severity"], rows: [
    ["Three contests are on hold", "Events", "Today 6:48 AM", "Jordan Lee", "Blocking"], ["Bus request declined", "Transportation", "Today 5:40 AM", "Jordan Lee", "Attention"], ["Physical expires tomorrow", "Eligibility", "Yesterday", "Taylor Morgan", "Attention"], ["GateDay sync failed", "Integrations", "Yesterday", "Unassigned", "Blocking"] ] },
  integrations: { description: "Downstream delivery and health for Riverside High.", tabs: ["Connections", "Delivery log", "Rules"], columns: ["Integration", "Vendor", "State", "Last sync", "Control"], rows: [
    ["Ticketing", "GateDay", "Sync failed", "6:52 AM", "Retry"], ["Streaming", "NFHS Network", "Connected", "6:51 AM", "Configure"], ["Website", "School CMS", "Connected", "6:50 AM", "Configure"], ["Transportation", "TripDirect", "Connected", "5:44 AM", "Configure"] ] }
};

function Status({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return <Badge variant="outline" className={cn("status", `status-${tone}`)}>{children}</Badge>;
}

function StatCard({ icon: Icon, label, value, suffix, tone = "neutral" }: { icon: typeof Bell; label: string; value: string; suffix: string; tone?: Tone }) {
  return <Card className="stat-card"><CardContent className="p-4"><div className="stat-label"><span className={cn("icon-chip", `icon-${tone}`)}><Icon /></span>{label}</div><div className="mt-3 flex items-end gap-2"><strong>{value}</strong><span>{suffix}</span><i className={cn("meter", `meter-${tone}`)} /></div></CardContent></Card>;
}

function Today({ notify }: { notify: (message: string) => void }) {
  return <div className="space-y-6">
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard icon={Bell} label="Needs you" value="10" suffix="open" tone="danger" />
      <StatCard icon={CalendarDays} label="On today" value="5" suffix="events" />
      <StatCard icon={Bus} label="Buses" value="3/4" suffix="set" tone="warn" />
      <StatCard icon={ShieldCheck} label="Eligibility" value="94" suffix="%" tone="ok" />
    </div>
    <Card className="border-red-200/70"><button className="flex w-full items-center gap-3 p-4 text-left" onClick={() => notify("Hold details opened") }><span className="icon-chip icon-danger"><AlertCircle /></span><span className="font-semibold">Three contests are on hold</span><span className="ml-auto font-mono text-xs text-muted-foreground">06:48</span><ChevronDown className="h-4 w-4" /></button></Card>
    <section>
      <div className="section-heading"><h2>What changed overnight</h2><span>SINCE 18:00</span></div>
      <div className="space-y-3">{changes.map((change) => <Card key={change.title} className="change-row"><CardContent className="flex items-center gap-3 p-4">
        <span className={cn("icon-chip shrink-0", `icon-${change.tone}`)}>{change.tone === "danger" ? <XCircle /> : change.tone === "ok" ? <Check /> : <AlertCircle />}</span>
        <div className="min-w-0"><p className="font-semibold">{change.title}</p><p className="metadata">{change.meta}</p></div>
        <ButtonGroup className="ml-auto" aria-label={`${change.title} actions`}><Button variant="outline" className="hidden sm:inline-flex" onClick={() => notify(`${change.action} completed`)}>{change.action}</Button>
        <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline" size="icon" aria-label={`More actions for ${change.title}`}><MoreHorizontal /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem onSelect={() => notify("Assigned to Jordan Lee")}>Assign to me</DropdownMenuItem><DropdownMenuItem onSelect={() => notify("Marked as reviewed")}>Mark reviewed</DropdownMenuItem></DropdownMenuContent></DropdownMenu></ButtonGroup>
      </CardContent></Card>)}</div>
    </section>
    <section><div className="section-heading"><h2>Jump back in</h2></div><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{["Request bus", "Send reminder", "Print day sheet", "Confirm officials"].map((x) => <Button key={x} variant="outline" className="h-auto justify-between p-4" onClick={() => notify(`${x} opened`)}>{x}<ChevronRight className="h-4 w-4" /></Button>)}</div></section>
  </div>;
}

function DataPage({ page, search, notify }: { page: Page; search: string; notify: (m: string) => void }) {
  const data = pageData[page]!;
  const rows = data.rows.filter((row) => row.join(" ").toLowerCase().includes(search.toLowerCase()));
  return <Tabs defaultValue={data.tabs[0]}><TabsList>{data.tabs.map(tab => <TabsTrigger key={tab} value={tab}>{tab}</TabsTrigger>)}</TabsList>{data.tabs.map(tab => <TabsContent key={tab} value={tab}><Card><Table><TableHeader><TableRow>{data.columns.map(col => <TableHead key={col}>{col}</TableHead>)}</TableRow></TableHeader><TableBody>{rows.map((row, i) => <TableRow key={i} className="cursor-pointer" onClick={() => notify(`${row[0]} opened`)}>{row.map((cell, j) => <TableCell key={j} className={j === 0 ? "font-semibold" : ""}>{j === row.length - 1 ? <Status tone={/ready|eligible|complete|active|connected|available|confirmed|submitted/i.test(cell) ? "ok" : /hold|failed|blocking|conflict|expired/i.test(cell) ? "danger" : "warn"}>{cell}</Status> : cell}</TableCell>)}</TableRow>)}</TableBody></Table>{rows.length === 0 && <div className="p-10 text-center text-muted-foreground">No matching records</div>}</Card></TabsContent>)}</Tabs>;
}

function CalendarPage({ schedule, notify }: { schedule: ScheduleEvent[]; notify: (m: string) => void }) {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  return <div className="grid gap-5 xl:grid-cols-[1fr_300px]"><Card><CardHeader><CardTitle>September 2026</CardTitle><CardDescription>School-wide athletics calendar</CardDescription></CardHeader><CardContent><div className="calendar-grid">{["SUN","MON","TUE","WED","THU","FRI","SAT"].map(x => <div className="calendar-label" key={x}>{x}</div>)}{days.map(day => <button key={day} className={cn("calendar-day", day === 11 && "selected")} onClick={() => notify(`September ${day} selected`)}><span>{day}</span>{[4,7,11,12,18,25].includes(day) && <i />}{day === 11 && <small>5 events</small>}</button>)}</div></CardContent></Card><Card><CardHeader><CardTitle>Thursday, September 11</CardTitle></CardHeader><CardContent className="space-y-3">{schedule.map(e => <div key={e.time} className="rounded-lg border p-3"><p className="text-xs font-medium text-muted-foreground">{e.time}</p><p className="font-semibold">{e.title}</p><p className="text-sm text-muted-foreground">{e.detail}</p></div>)}</CardContent></Card></div>;
}

function Reports({ notify }: { notify: (m: string) => void }) {
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{[
    ["Participation", "218 athletes", "Enrollment and program participation by season"], ["Eligibility", "94% cleared", "Requirements, holds and clearance trends"], ["Operations", "10 open items", "Buses, officials, facilities and publication"], ["Financial", "$42,860", "Fees, refunds and outstanding balances"], ["Registration", "26 awaiting review", "Form completion and document status"], ["Event delivery", "97% published", "Ticketing, streaming and web delivery"]
  ].map(([title, stat, desc]) => <Card key={title}><CardHeader><CardDescription>{title}</CardDescription><CardTitle className="text-2xl">{stat}</CardTitle></CardHeader><CardContent><p className="mb-5 text-sm text-muted-foreground">{desc}</p><Button variant="outline" onClick={() => notify(`${title} report opened`)}>Open report</Button></CardContent></Card>)}</div>;
}

function SettingsPage({ themeMode, setThemeMode, notify }: { themeMode: ThemeMode; setThemeMode: (v: ThemeMode) => void; notify: (m: string) => void }) {
  const [section, setSection] = useState("account");
  const settingsTabsRef = useRef<HTMLDivElement>(null);
  const [hasMoreSettingsTabs, setHasMoreSettingsTabs] = useState(false);
  const sections = [
    { id: "account", label: "Account", icon: UserRound },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "defaults", label: "Defaults", icon: SlidersHorizontal },
    { id: "setup", label: "School setup", icon: School },
  ];
  const subtitles: Record<string, string> = {
    account: "Your profile, role and access. Ask a district administrator to change your role.",
    notifications: "Which alerts reach you, how they arrive, and when they escalate.",
    appearance: "Theme and density for this browser. Nothing here changes what other people see.",
    defaults: "What School OS assumes when you start something new.",
    setup: "Review the read-only school information below to verify School OS is configured correctly. Your Sales representative makes any changes.",
  };
  const cardData: Record<string, { title: string; note: string; rows: [string, string, Tone?][]; action?: string; message?: string }[]> = {
    account: [
      { title: "Account", note: "Your personal information.", rows: [["Name", "Jordan Lee"], ["Email", "jordan.lee@riversidehigh.org"], ["Phone", "(555) 214-8802"], ["Last sign-in", "Today · 7:42 AM"]], action: "Edit profile", message: "Profile fields are editable here." },
      { title: "Role and access", note: "Your role, access and district permissions.", rows: [["Role", "Athletic Director"], ["Reach", "School-wide"], ["Schools", "Riverside High · North Valley Unified"], ["Changed by", "District administrator only"]], action: "Open users", message: "Users opened." },
      { title: "Security", note: "Sign-in and audit for this account.", rows: [["Password", "Changed Jun 14, 2026"], ["Two-factor", "Text message", "ok"], ["Active sessions", "2 devices"], ["Audit trail", "Every action recorded"]], action: "Change password", message: "Password change sent to your email." },
    ],
    notifications: [
      { title: "Delivery", note: "How an alert reaches you, per severity.", rows: [["Blocking", "Email + text, immediate", "danger"], ["Attention", "Email daily digest, 7:00 AM", "warn"], ["Informational", "In-app only"], ["Escalation", "To district after 48 hours"]], action: "Edit delivery", message: "Delivery per severity is editable here." },
      { title: "Default owners", note: "Who an alert opens against.", rows: [["Transportation", "Athletic director"], ["Eligibility", "Trainer"], ["Facilities", "Facilities lead"], ["Registration", "Athletic director"]], action: "Reassign", message: "Owner defaults opened." },
      { title: "Your subscriptions", note: "What this account is told about.", rows: [["Publish results", "Email", "ok"], ["Coach proposals", "In-app only"], ["Registration submissions", "Email daily digest"], ["Downstream sync failures", "Email + text", "danger"]], action: "Open alerts", message: "Alerts opened." },
    ],
    appearance: [
      { title: "Theme", note: themeMode === "system" ? "Following the system setting." : `Set to ${themeMode} for this browser.`, rows: [["Light", themeMode === "light" ? "Selected" : "—", themeMode === "light" ? "ok" : undefined], ["Dark", themeMode === "dark" ? "Selected" : "—", themeMode === "dark" ? "ok" : undefined], ["System", themeMode === "system" ? "Selected" : "—", themeMode === "system" ? "ok" : undefined]], action: "Cycle theme", message: "Theme changed." },
      { title: "School branding", note: "Colours and logo for Riverside High. Read only — held on the school record.", rows: [["Primary", "#52237D"], ["Secondary", "#F2DFBF"], ["Tertiary", "#B42435"], ["Logo", "On file"], ["Changed by", "Your sales representative"]], action: "View school record", message: "setup" },
      { title: "Density", note: "Adapts to the window; not a stored preference.", rows: [["School rail", "Standard · 236px"], ["Table columns", "Full headers"], ["Rule", "Narrower than 1100px switches to compact"]] },
    ],
    defaults: [
      { title: "Scope on sign-in", note: "The school and season you land in.", rows: [["School", "Riverside High"], ["Season", "Fall 2026–27"], ["Landing screen", "Today"], ["Scope memory", "Last used"]], action: "Change scope", message: "School switcher opened." },
      { title: "New event", note: "Values prefilled on the creation screen.", rows: [["Start time", "7:00 PM"], ["Ticketing", "GateDay"], ["Streaming", "NFHS Network"], ["Transportation", "Required for away contests"]], action: "Open new event", message: "New event opened." },
      { title: "Registration", note: "Applied to every new form.", rows: [["Form address", "register.riversidehigh.org/athletics"], ["Communications opt-in", "Required · locked"], ["New form", "Athletics registration · nine sections"]], action: "Open registration", message: "Registration opened." },
    ],
  };
  const act = (card: { title: string; action?: string; message?: string }) => {
    if (card.message === "setup") return setSection("setup");
    if (card.title === "Theme") setThemeMode(themeMode === "light" ? "dark" : themeMode === "dark" ? "system" : "light");
    notify(card.message || `${card.action} opened.`);
  };
  const save = () => notify(section === "notifications" ? "Notification preferences saved." : section === "defaults" ? "Defaults saved." : `Account details saved for Jordan Lee.`);

  useEffect(() => {
    const rail = settingsTabsRef.current;
    if (!rail) return;
    const updateOverflow = () => setHasMoreSettingsTabs(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 4);
    updateOverflow();
    rail.addEventListener("scroll", updateOverflow, { passive: true });
    const observer = new ResizeObserver(updateOverflow);
    observer.observe(rail);
    return () => { rail.removeEventListener("scroll", updateOverflow); observer.disconnect(); };
  }, []);

  return <div className="settings-page">
    <div className="settings-header"><div><h1>Settings</h1><p>{subtitles[section]}</p></div>{section === "appearance" ? <Button variant="outline" onClick={() => { setThemeMode("light"); notify("Appearance reset to light theme."); }}>Reset to defaults</Button> : section === "setup" ? null : <Button onClick={save}>Save changes</Button>}</div>
    {section === "setup" && <Card className="settings-banner"><CardContent className="flex items-center gap-3 p-4"><span className="icon-chip"><School/></span><div><b>Verify your school information</b><p>This information is read only. If anything is missing or incorrect, contact your Sales representative.</p></div></CardContent></Card>}
    <Tabs value={section} onValueChange={setSection} className="settings-layout"><TabsList ref={settingsTabsRef} className="settings-rail" aria-label="Settings sections">{sections.map(item => <TabsTrigger value={item.id} key={item.id}><item.icon/><span>{item.label}</span></TabsTrigger>)}</TabsList>
      {hasMoreSettingsTabs && <button type="button" className="settings-tabs-more" aria-label="Show more settings sections" onClick={() => settingsTabsRef.current?.scrollBy({ left: 160, behavior: "smooth" })}><ChevronRight/></button>}
      {sections.map(item => <TabsContent key={item.id} value={item.id} className="settings-cards">{item.id === "setup" ? <>
        <Card className="settings-record">
          <CardHeader><div className="settings-card-title"><CardTitle>School record</CardTitle><Badge variant="secondary">Read only</Badge></div><CardDescription>School and contact information captured during setup.</CardDescription></CardHeader>
          <CardContent className="settings-list">
            <p><span>School name<small>Legal name on the district record.</small></span>Riverside High</p>
            <p><span>Mascot name<small>Reads under the crest in the school rail.</small></span>Ravens</p>
            <p><span>District name<small>Shown where a district applies.</small></span>North Valley Unified</p>
            <p><span>School address<small>Printed on day sheets and bus requests.</small></span>1450 Riverside Drive<br/>Riverside, MN 55364</p>
            <p><span>School main phone number<small>Front office line.</small></span>(555) 204-1100</p>
            <p><span>Athletic Director<small>Primary athletics contact.</small></span>Jordan Lee</p>
            <p><span>Athletic Director phone number<small>Direct athletics office line.</small></span>(555) 204-1180</p>
            <p><span>Athletic Director email<small>Reply-to on messages families receive.</small></span>jordan.lee@riversidehigh.org</p>
            <p><span>Other emails on file<small>Additional contacts captured by Sales.</small></span><span className="settings-value-list">athletics@riversidehigh.org<br/>facilities@riversidehigh.org</span></p>
          </CardContent>
        </Card>
        <Card className="settings-record"><CardHeader><div className="settings-card-title"><CardTitle>School colors</CardTitle><Badge variant="secondary">Read only</Badge></div><CardDescription>Primary, secondary, and tertiary colors captured by Sales. Editing is planned after the December launch.</CardDescription></CardHeader><CardContent className="color-rows">{[["Primary","Navigation band and crest ring","#52237D"],["Secondary","Crest edge and conference line","#F2DFBF"],["Tertiary","Print day sheets and jersey reference","#B42435"]].map(([label,note,hex]) => <div key={label}><i style={{background:hex}}/><span><b>{label}</b><small>{note}</small></span><code>{hex}</code></div>)}</CardContent></Card>
        <Card className="settings-record"><CardHeader><div className="settings-card-title"><CardTitle>School logo</CardTitle><Badge variant="secondary">Read only</Badge></div><CardDescription>Shows in the school rail, on printed day sheets, and at the top of messages families receive. Editing is planned after the December launch.</CardDescription></CardHeader><CardContent className="logo-record"><div className="brand-mark">R</div><div><b>Logo on file</b><p>Supplied during setup and cropped to a circle. Send a replacement to your Sales representative.</p></div></CardContent></Card>
      </> : cardData[item.id].map(card => <Card key={card.title} className="settings-record"><CardHeader><CardTitle>{card.title}</CardTitle><CardDescription>{card.note}</CardDescription></CardHeader><CardContent className="settings-list">{card.rows.map(([label,value,tone]) => <p key={label}><span>{label}</span><span className={cn("settings-value", tone && `value-${tone}`)}>{tone && <i/>}{value}</span></p>)}{card.action && <Button variant="outline" className="mt-5" onClick={() => act(card)}>{card.action}</Button>}</CardContent></Card>)}</TabsContent>)}
    </Tabs>
  </div>;
}

type ComponentSample = "alerts" | "theme" | "profile" | "school";

const componentSamples: { id: ComponentSample; label: string; note: string; icon: typeof Bell }[] = [
  { id: "alerts", label: "Alerts dropdown", note: "Header notification menu", icon: Bell },
  { id: "theme", label: "Theme menu", note: "Appearance selector", icon: Palette },
  { id: "profile", label: "Profile dropdown", note: "Account action menu", icon: UserRound },
  { id: "school", label: "School panel", note: "School switcher", icon: School },
];

function ComponentPreview({ sample, isOpen, dark, onThemeChange }: { sample: ComponentSample; isOpen: boolean; dark: boolean; onThemeChange: () => void }) {
  const staticOpen = isOpen ? { open: true } : { open: false };
  const menuProps = isOpen ? {} : { open: false };
  if (sample === "alerts") return <DropdownMenu modal={false} {...staticOpen}>
    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="header-icon alerts-trigger" aria-label="Alerts"><Bell/><Badge>10</Badge></Button></DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="alerts-menu component-menu"> <div className="alerts-menu-head"><b>Alerts</b><span>2 blocking · 10 open</span></div><div className="alerts-menu-list">{headerAlerts.map(alert => <DropdownMenuItem key={alert.title} className="alert-menu-item"><span className={cn("icon-chip", `icon-${alert.tone}`)}>{alert.tone === "ok" ? <Check/> : <AlertCircle/>}</span><span className="alert-menu-copy"><span><b>{alert.title}</b><Status tone={alert.tone}>{alert.level}</Status></span><small>{alert.meta}</small><p>{alert.note}</p></span></DropdownMenuItem>)}</div><DropdownMenuSeparator/><DropdownMenuItem className="alerts-menu-footer"><Bell/><b>Open all alerts</b><span>10</span></DropdownMenuItem></DropdownMenuContent>
  </DropdownMenu>;
  if (sample === "theme") return <DropdownMenu modal={false} {...staticOpen}>
    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="header-icon" aria-label="Select theme" onClick={onThemeChange}>{dark ? <Moon/> : <Sun/>}</Button></DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="theme-menu component-menu"><DropdownMenuLabel>Theme</DropdownMenuLabel><DropdownMenuSeparator/><DropdownMenuItem><Sun/><span>Light</span>{!dark && <Check className="theme-check"/>}</DropdownMenuItem><DropdownMenuItem><Moon/><span>Dark</span>{dark && <Check className="theme-check"/>}</DropdownMenuItem><DropdownMenuItem><CircleGauge/><span>System</span></DropdownMenuItem></DropdownMenuContent>
  </DropdownMenu>;
  if (sample === "profile") return <DropdownMenu modal={false} {...staticOpen}>
    <DropdownMenuTrigger asChild><Button variant="outline" className="profile-trigger" aria-label="Jordan Lee, Athletic Director"><span>JL</span><ChevronDown/></Button></DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="profile-menu component-menu"><div className="profile-menu-head"><b>Jordan Lee</b><span>Athletic Director · Riverside High</span></div><DropdownMenuSeparator/><DropdownMenuItem><Settings/>Account settings</DropdownMenuItem><DropdownMenuItem><Bell/>Notification rules</DropdownMenuItem><DropdownMenuItem><UserRound/>Impersonate user</DropdownMenuItem><DropdownMenuSeparator/><DropdownMenuItem className="text-destructive"><LogOut/>Sign out</DropdownMenuItem></DropdownMenuContent>
  </DropdownMenu>;
  return <DropdownMenu modal={false} {...menuProps} open={isOpen}>
    <DropdownMenuTrigger asChild><Button variant="secondary" className="school-trigger component-school-trigger" aria-label="Switch school"><School className="school-trigger-icon"/><span>Riverside High</span><ChevronDown className="school-trigger-chevron"/></Button></DropdownMenuTrigger>
    <DropdownMenuContent align="start" side="bottom" className="w-52 component-menu school-menu">{["Riverside High", "Oak Ridge High", "Kenwood Academy"].map(name => <DropdownMenuItem key={name}>{name}{name === "Riverside High" && <Check className="ml-auto h-4 w-4"/>}</DropdownMenuItem>)}</DropdownMenuContent>
  </DropdownMenu>;
}

function ComponentsPage({ navigate }: { navigate: (path: string) => void }) {
  const [sample, setSample] = useState<ComponentSample>("alerts");
  const [isOpen, setIsOpen] = useState(true);
  const [dark, setDark] = useState(false);
  const current = componentSamples.find(item => item.id === sample)!;
  return <main className={cn("component-page", dark && "dark")}>
    <header className="component-page-header"><button className="component-back" onClick={() => navigate("/")}><ChevronLeft/>School OS</button><span>COMPONENT CAPTURE</span></header>
    <div className="component-layout">
      <aside className="component-panel"><div><p className="component-eyebrow">App shell</p><h1>Components</h1><p>Pick a component, set its state, then capture the stage with html.to.design.</p></div><div className="component-list">{componentSamples.map(item => <button key={item.id} className={cn("component-choice", sample === item.id && "active")} onClick={() => setSample(item.id)}><item.icon/><span><b>{item.label}</b><small>{item.note}</small></span><ChevronRight/></button>)}</div><div className="component-controls"><p className="component-eyebrow">State</p><div className="component-switch"><span>Menu</span><button aria-pressed={isOpen} onClick={() => setIsOpen(value => !value)}><i className={cn(isOpen && "on")}/>{isOpen ? "Open" : "Closed"}</button></div><div className="component-switch"><span>Canvas</span><button aria-pressed={dark} onClick={() => setDark(value => !value)}><i className={cn(dark && "on")}/>{dark ? "Dark" : "Light"}</button></div></div></aside>
      <section className="component-stage-wrap"><div className="component-stage-meta"><span>{current.label}</span><span>{isOpen ? "OPEN" : "CLOSED"} · {dark ? "DARK" : "LIGHT"}</span></div><div className="component-stage"><div className="component-mock-shell"><div className="component-mock-brand"><div className="brand-mark">R</div><b>Riverside Ravens</b><small>NORTHSTAR CONFERENCE</small>{sample === "school" && <ComponentPreview sample={sample} isOpen={isOpen} dark={dark} onThemeChange={() => setDark(value => !value)}/>}</div><div className="component-mock-workspace"><div className="component-mock-topbar"><Button variant="outline" className="season-trigger"><span>Fall</span><b>2026–27</b><ChevronDown/></Button><div className="ml-auto flex items-center gap-2"><span className="last-sync">LAST SYNC 06:52</span>{sample !== "school" && <ComponentPreview sample={sample} isOpen={isOpen} dark={dark} onThemeChange={() => setDark(value => !value)}/>}</div></div><div className="component-mock-content"><p className="component-eyebrow">Component preview</p><h2>{current.label}</h2><p>The surrounding shell gives the component its real placement and contrast.</p></div></div></div></div><p className="component-capture-note">This state is held open by the capture page, so it stays visible when you trigger the browser extension.</p></section>
    </div>
  </main>;
}

function ScheduleRail({ schedule, setSchedule, notify }: { schedule: ScheduleEvent[]; setSchedule: (s: ScheduleEvent[]) => void; notify: (m: string) => void }) {
  const [expanded, setExpanded] = useState(2);
  const clearHold = (index: number) => { setSchedule(schedule.map((event, i) => i === index ? { ...event, status: "Confirmed", tone: "ok" } : event)); notify("The event hold was cleared"); };
  return <aside className="schedule-rail"><div className="schedule-date"><div className="flex items-center justify-between"><Button variant="ghost" className="-ml-3">September <ChevronDown /></Button><Badge variant="secondary">{schedule.length} events</Badge></div><div><strong>11</strong><span>Thursday</span></div><Button variant="outline" className="mt-4 w-full justify-between">Full schedule <ChevronRight /></Button></div>
    <div className="space-y-3 p-3">{schedule.map((event, index) => <Card key={`${event.time}-${event.title}`} className="overflow-hidden"><button className="schedule-event-button" onClick={() => setExpanded(expanded === index ? -1 : index)}><span className="schedule-event-lead"><span className="schedule-event-time">{event.time}</span><span className={cn("sport-icon", `sport-${event.sport.toLowerCase().replace(/\s/g, "-")}`)} title={event.sport}><FontAwesomeIcon icon={SPORT_ICONS[event.sport]} /></span></span><span className="min-w-0 flex-1"><span className="flex items-center gap-2"><Status tone={event.tone}>{event.status}</Status></span><b className="mt-1 block truncate text-sm">{event.title}</b><small className="block truncate text-muted-foreground">{event.detail}</small></span><ChevronDown className={cn("mt-2 h-4 w-4 shrink-0 transition-transform", expanded === index && "rotate-180")} /></button>{expanded === index && <div className="event-details"><p><span>Opponent</span>{event.opponent || "—"}</p><p><span>Bus</span>{event.bus || "Not required"}</p><p><span>Officials</span>{event.officials || "Confirmed"}</p><p><span>Families told</span>{event.families || "Yes"}</p>{event.tone === "danger" && <Button className="mt-2 w-full" onClick={() => clearHold(index)}>Clear the hold</Button>}</div>}</Card>)}</div>
  </aside>;
}

function PlayOnLogo({ hq = false }: { hq?: boolean }) {
  return <div className="playon-logo"><img src={playonLogo} alt={hq ? "PlayOn HQ" : "PlayOn"}/>{hq && <em aria-hidden="true">HQ</em>}</div>;
}

function LandingArt() {
  const pluses = [[200,168],[1240,168],[128,470],[1312,470],[420,700],[1020,700],[960,236]];
  const ticks = Array.from({ length: 41 }, (_, index) => 400 + index * 16);
  const bars = [1088,1096,1104,1115,1122,1132,1141,1149,1160,1168,1178,1185,1196,1204,1214,1222,1233,1240,1251,1260,1268,1279,1288,1298,1308,1316,1327,1337];
  return <svg className="landing-art" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <g className="art-grid"><line x1="72" y1="0" x2="72" y2="900"/><line x1="1368" y1="0" x2="1368" y2="900"/><line x1="0" y1="96" x2="1440" y2="96"/><line x1="0" y1="804" x2="1440" y2="804"/><line x1="472" y1="96" x2="472" y2="804"/><line x1="968" y1="96" x2="968" y2="804"/></g>
    <g className="art-court"><path d="M96 300 L246 300 L246 452 L96 452"/><circle cx="246" cy="376" r="46"/><path d="M96 218 A230 230 0 0 1 96 534"/><line x1="96" y1="376" x2="120" y2="376"/></g>
    <g className="art-court"><rect x="1188" y="248" width="164" height="268"/><line x1="1188" y1="337" x2="1352" y2="337"/><line x1="1188" y1="427" x2="1352" y2="427"/><line className="art-dash" x1="1188" y1="382" x2="1352" y2="382"/><line x1="1174" y1="382" x2="1188" y2="382"/><line x1="1352" y1="382" x2="1366" y2="382"/><line x1="1174" y1="366" x2="1174" y2="398"/><line x1="1366" y1="366" x2="1366" y2="398"/></g>
    <g className="art-pluses">{pluses.map(([x,y]) => <g key={`${x}-${y}`}><line x1={x-6} y1={y} x2={x+6} y2={y}/><line x1={x} y1={y-6} x2={x} y2={y+6}/></g>)}</g>
    <g className="art-ticks">{ticks.map((x,index) => <line key={x} x1={x} y1={index % 5 === 0 ? 824 : 830} x2={x} y2="836"/>)}</g>
    <g className="art-bars">{bars.map((x,index) => <rect key={x} x={x} y="854" width={index % 3 === 0 ? 4 : 2} height="14"/>)}</g>
    <rect x="1352" y="600" width="10" height="10" className="art-fill"/><circle cx="128" cy="742" r="9" className="art-ring"/>
  </svg>;
}

function LandingPage({ navigate }: { navigate: (path: string) => void }) {
  return <main className="landing-page">
    <LandingArt/>
    <i className="landing-corner corner-tl"/><i className="landing-corner corner-tr"/><i className="landing-corner corner-bl"/><i className="landing-corner corner-br"/>
    <div className="landing-meta"><span>Fall season</span><span><i/>Systems nominal</span></div>
    <Card className="landing-card">
      <CardContent>
        <p className="landing-kicker">Athletics operations</p>
        <h1>School OS</h1>
        <h2>One clear view of the school day</h2>
        <div className="version-rule"><i/><span>Version 1.0.4</span><i/></div>
        <PlayOnLogo />
        <Button className="landing-login" onClick={() => navigate("/login")}>Sign in with PlayOn <ArrowRight/></Button>
        <p className="landing-help">Need access? <button onClick={() => navigate("/login")}>Ask your athletic director</button></p>
      </CardContent>
    </Card>
    <p className="landing-footer">Session · secure&nbsp;&nbsp; Region NE-2</p>
  </main>;
}

function LoginPage({ navigate }: { navigate: (path: string) => void }) {
  const submit = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); navigate("/"); };
  return <main className="login-page">
    <Card className="login-card"><CardContent>
      <PlayOnLogo hq />
      <h1>Log In</h1>
      <p className="login-signup">Need a PlayOn account? <button type="button">Create an account</button></p>
      <form onSubmit={submit}>
        <label>Email*<Input name="email" type="email" autoComplete="email" defaultValue="jordan.lee@riversidehigh.org" required /></label>
        <label>Password*<Input name="password" type="password" autoComplete="current-password" defaultValue="Ravens2026!" required /></label>
        <div className="login-warning"><AlertCircle/><p>If you are having issues logging in to your account, please reset your password to ensure it meets our new security requirements.</p></div>
        <button className="forgot-link" type="button">Forgot password?</button>
        <Button className="login-submit" type="submit">Continue</Button>
      </form>
    </CardContent></Card>
  </main>;
}

function SchoolApp({ navigate }: { navigate: (path: string) => void }) {
  const [page, setPage] = useState<Page>("today");
  const [school, setSchool] = useState("Riverside High");
  const [schoolYear, setSchoolYear] = useState("2026–27");
  const [seasonName, setSeasonName] = useState("Fall");
  const season = `${seasonName} ${schoolYear}`;
  const [schedule, setSchedule] = useState(initialSchedule);
  const [addOpen, setAddOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navCollapsed, setNavCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const dark = themeMode === "dark" || (themeMode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  const [toast, setToast] = useState("");
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 2600); };
  const current = NAV.flatMap(g => g.items).find(i => i.id === page)!;
  const description = pageData[page]?.description;
  const renderPage = useMemo(() => {
    if (page === "today") return <Today notify={notify} />;
    if (page === "calendar") return <CalendarPage schedule={schedule} notify={notify} />;
    if (page === "reports") return <Reports notify={notify} />;
    if (page === "settings") return <SettingsPage themeMode={themeMode} setThemeMode={setThemeMode} notify={notify} />;
    return <DataPage page={page} search={search} notify={notify} />;
  }, [page, schedule, search, themeMode]);

  const createEvent = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const form = new FormData(event.currentTarget); const title = String(form.get("title") || "New event");
    setSchedule([...schedule, { time: String(form.get("time") || "7:00 PM"), status: "Draft", tone: "warn", sport: "School-wide", title, detail: String(form.get("location") || "Location pending") }]);
    setAddOpen(false); notify(`${title} was added`);
  };

  return <div className={cn("app-root", dark && "dark")}>
    <div className={cn("app-shell", navCollapsed && "nav-collapsed")}>
      <aside className={cn("nav-rail", navCollapsed && "collapsed", mobileOpen && "mobile-open")}>
        <div className="brand-card"><button className="mobile-close" onClick={() => setMobileOpen(false)}><XCircle/></button><div className="brand-mark">R</div><h1>Riverside Ravens</h1><p>NORTHSTAR CONFERENCE</p>
          <DropdownMenu><DropdownMenuTrigger asChild><Button variant="secondary" className="school-trigger mt-4 w-full justify-between" aria-label={`Switch school, currently ${school}`}><School className="school-trigger-icon"/><span>{school}</span><ChevronDown className="school-trigger-chevron"/></Button></DropdownMenuTrigger><DropdownMenuContent className="w-52">{["Riverside High", "Oak Ridge High", "Kenwood Academy"].map(name => <DropdownMenuItem key={name} onSelect={() => { setSchool(name); notify(`Switched to ${name}`); }}>{name}{name === school && <Check className="ml-auto h-4 w-4"/>}</DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu>
        </div>
        <nav>{NAV.map(group => <div key={group.group} className="nav-group"><p>{group.group}</p>{group.items.map(item => <button key={item.id} className={cn("nav-item", page === item.id && "active")} aria-label={item.label} title={navCollapsed ? item.label : undefined} onClick={() => { setPage(item.id); setSearch(""); setMobileOpen(false); }}><item.icon/><span>{item.label}</span>{item.count && <small>{item.count}</small>}</button>)}</div>)}</nav>
        <Button variant="ghost" size="icon" className="nav-collapse-toggle" aria-label={navCollapsed ? "Expand navigation" : "Collapse navigation"} title={navCollapsed ? "Expand navigation" : "Collapse navigation"} onClick={() => setNavCollapsed(value => !value)}><PanelLeft/></Button>
      </aside>
      <main className="workspace"><header className="topbar">
        <Button variant="ghost" size="icon" className="mobile-menu" onClick={() => { setNavCollapsed(false); setMobileOpen(true); }}><Menu/></Button>
        <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline" className="season-trigger" aria-label="Switch season"><span>{seasonName}</span><b>{schoolYear}</b><ChevronDown/></Button></DropdownMenuTrigger><DropdownMenuContent align="start" className="season-menu"><DropdownMenuLabel>SCHOOL YEAR</DropdownMenuLabel>{["2026–27", "2025–26", "2024–25"].map(year => <DropdownMenuItem key={year} onSelect={() => setSchoolYear(year)}>{year === schoolYear ? <Check/> : <span className="menu-check-space"/>}{year}</DropdownMenuItem>)}<DropdownMenuSeparator/><DropdownMenuLabel>SEASON</DropdownMenuLabel>{["Fall", "Winter", "Spring"].map(name => <DropdownMenuItem key={name} onSelect={() => setSeasonName(name)}>{name === seasonName ? <Check/> : <span className="menu-check-space"/>}{name}</DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu>
        <div className="ml-auto flex items-center gap-2"><span className="last-sync">LAST SYNC 06:52</span>
          <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="header-icon alerts-trigger" aria-label="Alerts"><Bell/><Badge>10</Badge></Button></DropdownMenuTrigger><DropdownMenuContent align="end" className="alerts-menu"><div className="alerts-menu-head"><b>Alerts</b><span>2 blocking · 10 open</span></div><div className="alerts-menu-list">{headerAlerts.map(alert => <DropdownMenuItem key={alert.title} className="alert-menu-item" onSelect={() => setPage("alerts")}><span className={cn("icon-chip", `icon-${alert.tone}`)}>{alert.tone === "danger" ? <AlertCircle/> : alert.tone === "warn" ? <AlertCircle/> : <Check/>}</span><span className="alert-menu-copy"><span><b>{alert.title}</b><Status tone={alert.tone}>{alert.level}</Status></span><small>{alert.meta}</small><p>{alert.note}</p></span></DropdownMenuItem>)}</div><DropdownMenuSeparator/><DropdownMenuItem className="alerts-menu-footer" onSelect={() => setPage("alerts")}><Bell/><b>Open all alerts</b><span>10</span></DropdownMenuItem></DropdownMenuContent></DropdownMenu>
          <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="header-icon" aria-label="Select theme" title="Theme">{dark ? <Moon/> : <Sun/>}</Button></DropdownMenuTrigger><DropdownMenuContent align="end" className="theme-menu"><DropdownMenuLabel>Theme</DropdownMenuLabel><DropdownMenuSeparator/><DropdownMenuItem onSelect={() => setThemeMode("light")}><Sun/><span>Light</span>{themeMode === "light" && <Check className="theme-check"/>}</DropdownMenuItem><DropdownMenuItem onSelect={() => setThemeMode("dark")}><Moon/><span>Dark</span>{themeMode === "dark" && <Check className="theme-check"/>}</DropdownMenuItem><DropdownMenuItem onSelect={() => setThemeMode("system")}><CircleGauge/><span>System</span>{themeMode === "system" && <Check className="theme-check"/>}</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
          <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline" className="profile-trigger" aria-label="Jordan Lee, Athletic Director"><span>JL</span><ChevronDown/></Button></DropdownMenuTrigger><DropdownMenuContent align="end" className="profile-menu"><div className="profile-menu-head"><b>Jordan Lee</b><span>Athletic Director · Riverside High</span></div><DropdownMenuSeparator/><DropdownMenuItem onSelect={() => setPage("settings")}><Settings/>Account settings</DropdownMenuItem><DropdownMenuItem onSelect={() => { setPage("settings"); notify("Notification rules opened."); }}><Bell/>Notification rules</DropdownMenuItem><DropdownMenuItem onSelect={() => notify("User impersonation opened.")}><UserRound/>Impersonate user</DropdownMenuItem><DropdownMenuSeparator/><DropdownMenuItem className="text-destructive" onSelect={() => navigate("/landing")}><LogOut/>Sign out</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
        </div>
      </header>
        <div className="content">{page !== "settings" && <div className="page-header"><div><h1>{page === "today" ? "Good morning, Jordan" : current.label}</h1>{description && <p className="page-description">{description}</p>}</div><div className="page-actions">{page !== "today" && <div className="search-box"><Search/><Input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${current.label.toLowerCase()}`} /></div>}<Button variant="outline" className="briefing" onClick={() => notify("Weekly briefing opened")}>Weekly briefing</Button><Button onClick={() => setAddOpen(true)}><Plus/>Add event</Button></div></div>}{renderPage}</div>
      </main>
      <ScheduleRail schedule={schedule} setSchedule={setSchedule} notify={notify} />
    </div>
    <Dialog open={addOpen} onOpenChange={setAddOpen}><DialogContent><form onSubmit={createEvent}><DialogHeader><DialogTitle>Add event</DialogTitle><DialogDescription>Create a contest, practice, meeting or booking.</DialogDescription></DialogHeader><div className="my-6 grid gap-4"><label>Event name<Input name="title" required placeholder="Varsity Football vs…" /></label><div className="grid grid-cols-2 gap-3"><label>Date<Input name="date" type="date" defaultValue="2026-09-11" /></label><label>Time<Input name="time" type="time" defaultValue="19:00" /></label></div><label>Location<Input name="location" placeholder="Raven Stadium" /></label></div><DialogFooter><Button type="button" variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button><Button type="submit">Add event</Button></DialogFooter></form></DialogContent></Dialog>
    {toast && <div className="toast"><Check/>{toast}</div>}
  </div>;
}

type AppRoute = "landing" | "login" | "components" | "school";
const routeFromPath = (): AppRoute => /\/landing\/?$/.test(window.location.pathname) ? "landing" : /\/login\/?$/.test(window.location.pathname) ? "login" : /\/components\/?$/.test(window.location.pathname) ? "components" : "school";
const appRootPath = () => window.location.pathname.replace(/(?:landing|login|components)\/?$/, "").replace(/\/?$/, "/");

export default function App() {
  const [route, setRoute] = useState<AppRoute>(routeFromPath);
  useEffect(() => {
    const onPopState = () => setRoute(routeFromPath());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);
  useEffect(() => { document.title = route === "landing" ? "School OS" : route === "login" ? "Log In · PlayOn HQ" : route === "components" ? "Components · School OS" : "School OS · Shadcn"; }, [route]);
  const navigate = (path: string) => {
    const segment = path.replace(/^\/+|\/+$/g, "");
    window.history.pushState({}, "", segment ? `${appRootPath()}${segment}/` : appRootPath());
    setRoute(routeFromPath());
    window.scrollTo(0, 0);
  };
  if (route === "landing") return <LandingPage navigate={navigate} />;
  if (route === "login") return <LoginPage navigate={navigate} />;
  if (route === "components") return <ComponentsPage navigate={navigate} />;
  return <SchoolApp navigate={navigate} />;
}
