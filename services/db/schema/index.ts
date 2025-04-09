import {
  pgTable,
  pgEnum,
  varchar,
  text,
  boolean,
  date,
  time,
  timestamp,
  integer,
  decimal,
} from "drizzle-orm/pg-core";

// Enums
export const userRoleEnum = pgEnum("user_role", [
  "user",
  "admin",
  "superadmin",
]);
export const employeeStatusEnum = pgEnum("employee_status", [
  "active",
  "on_leave",
  "terminated",
]);
export const contractTypeEnum = pgEnum("contract_type", [
  "permanent",
  "contract",
  "probation",
]);
export const contractStatusEnum = pgEnum("contract_status", [
  "active",
  "expired",
  "terminated",
]);
export const attendanceStatusEnum = pgEnum("attendance_status", [
  "present",
  "late",
  "absent",
  "half_day",
]);
export const leaveTypeEnum = pgEnum("leave_type", [
  "annual",
  "sick",
  "maternity",
  "paternity",
  "unpaid",
  "other",
]);
export const leaveRequestStatusEnum = pgEnum("leave_request_status", [
  "pending",
  "approved",
  "rejected",
]);
export const eventTypeEnum = pgEnum("event_type", [
  "holiday",
  "leave",
  "meeting",
  "deadline",
  "other",
]);
export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "paid",
  "cancelled",
]);
export const evaluationPeriodEnum = pgEnum("evaluation_period", [
  "Q1",
  "Q2",
  "Q3",
  "Q4",
  "Annual",
]);
export const evaluationStatusEnum = pgEnum("evaluation_status", [
  "draft",
  "submitted",
  "acknowledged",
]);
export const notificationTypeEnum = pgEnum("notification_type", [
  "contract",
  "leave",
  "attendance",
  "payroll",
  "other",
]);

// Tables
export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  email: varchar("email").notNull().unique(),
  name: varchar("name").notNull(),
  phone: varchar("phone"),
  passwordHash: varchar("password_hash").notNull(),
  avatar: varchar("avatar"),
  role: userRoleEnum("role").notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const files = pgTable("files", {
  id: varchar("id").primaryKey(),
  fileName: varchar("file_name").notNull(),
  fileUrl: varchar("file_url").notNull(),
  uploadedBy: varchar("uploaded_by")
    .notNull()
    .references(() => users.id),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: varchar("id").primaryKey(),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id),
  token: varchar("token").notNull(),
  device: varchar("device"),
  ipAddress: varchar("ip_address"),
  userAgent: text("user_agent"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  lastAccessed: timestamp("last_accessed").defaultNow(),
  expiresAt: timestamp("expires_at").notNull(),
});

export const departments = pgTable("departments", {
  id: varchar("id").primaryKey(),
  name: varchar("name"),
  description: text("description"),
  managerId: varchar("manager_id"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const positions = pgTable("positions", {
  id: varchar("id").primaryKey(),
  title: varchar("title"),
  description: text("description"),
  departmentId: varchar("department_id"),
  salaryMin: decimal("salary_min"),
  salaryMax: decimal("salary_max"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const employees = pgTable("employees", {
  id: varchar("id").primaryKey(),
  userId: varchar("user_id"),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  email: varchar("email").unique(),
  phone: varchar("phone"),
  address: text("address"),
  birthDate: date("birth_date"),
  hireDate: date("hire_date"),
  departmentId: varchar("department_id"),
  positionId: varchar("position_id"),
  managerId: varchar("manager_id"),
  status: employeeStatusEnum("status"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const contracts = pgTable("contracts", {
  id: varchar("id").primaryKey(),
  employeeId: varchar("employee_id"),
  startDate: date("start_date"),
  endDate: date("end_date"),
  contractType: contractTypeEnum("contract_type"),
  salary: decimal("salary"),
  benefits: text("benefits"),
  status: contractStatusEnum("status"),
  approvedBy: varchar("approved_by"),
  approvedAt: timestamp("approved_at"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const attendance = pgTable("attendance", {
  id: varchar("id").primaryKey(),
  employeeId: varchar("employee_id"),
  date: date("date"),
  checkIn: timestamp("check_in"),
  checkOut: timestamp("check_out"),
  status: attendanceStatusEnum("status"),
  notes: text("notes"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const leaveRequests = pgTable("leave_requests", {
  id: varchar("id").primaryKey(),
  employeeId: varchar("employee_id"),
  leaveType: leaveTypeEnum("leave_type"),
  startDate: date("start_date"),
  endDate: date("end_date"),
  duration: integer("duration"),
  reason: text("reason"),
  status: leaveRequestStatusEnum("status"),
  approvedBy: varchar("approved_by"),
  approvedAt: timestamp("approved_at"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const leaveBalances = pgTable("leave_balances", {
  id: varchar("id").primaryKey(),
  employeeId: varchar("employee_id"),
  leaveType: leaveTypeEnum("leave_type"),
  year: integer("year"),
  totalDays: integer("total_days"),
  usedDays: integer("used_days"),
  remainingDays: integer("remaining_days"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const calendarEvents = pgTable("calendar_events", {
  id: varchar("id").primaryKey(),
  title: varchar("title"),
  description: text("description"),
  eventType: eventTypeEnum("event_type"),
  startDate: date("start_date"),
  endDate: date("end_date"),
  startTime: time("start_time"),
  endTime: time("end_time"),
  allDay: boolean("all_day"),
  createdBy: varchar("created_by"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const payroll = pgTable("payroll", {
  id: varchar("id").primaryKey(),
  employeeId: varchar("employee_id"),
  periodStart: date("period_start"),
  periodEnd: date("period_end"),
  basicSalary: decimal("basic_salary"),
  allowances: decimal("allowances"),
  deductions: decimal("deductions"),
  tax: decimal("tax"),
  netSalary: decimal("net_salary"),
  paymentDate: date("payment_date"),
  paymentStatus: paymentStatusEnum("payment_status"),
  createdBy: varchar("created_by"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const performanceEvaluations = pgTable("performance_evaluations", {
  id: varchar("id").primaryKey(),
  employeeId: varchar("employee_id"),
  evaluatorId: varchar("evaluator_id"),
  evaluationPeriod: evaluationPeriodEnum("evaluation_period"),
  evaluationYear: integer("evaluation_year"),
  productivityScore: decimal("productivity_score"),
  qualityScore: decimal("quality_score"),
  teamworkScore: decimal("teamwork_score"),
  leadershipScore: decimal("leadership_score"),
  overallScore: decimal("overall_score"),
  comments: text("comments"),
  status: evaluationStatusEnum("status"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const notifications = pgTable("notifications", {
  id: varchar("id").primaryKey(),
  userId: varchar("user_id"),
  title: varchar("title"),
  content: text("content"),
  type: notificationTypeEnum("type"),
  isRead: boolean("is_read"),
  createdAt: timestamp("created_at"),
});

export const departmentEmployees = pgTable("department_employees", {
  id: varchar("id").primaryKey(),
  departmentId: varchar("department_id"),
  employeeId: varchar("employee_id"),
  isPrimary: boolean("is_primary"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
