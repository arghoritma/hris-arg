CREATE TYPE "public"."attendance_status" AS ENUM('present', 'late', 'absent', 'half_day');--> statement-breakpoint
CREATE TYPE "public"."contract_status" AS ENUM('active', 'expired', 'terminated');--> statement-breakpoint
CREATE TYPE "public"."contract_type" AS ENUM('permanent', 'contract', 'probation');--> statement-breakpoint
CREATE TYPE "public"."employee_status" AS ENUM('active', 'on_leave', 'terminated');--> statement-breakpoint
CREATE TYPE "public"."evaluation_period" AS ENUM('Q1', 'Q2', 'Q3', 'Q4', 'Annual');--> statement-breakpoint
CREATE TYPE "public"."evaluation_status" AS ENUM('draft', 'submitted', 'acknowledged');--> statement-breakpoint
CREATE TYPE "public"."event_type" AS ENUM('holiday', 'leave', 'meeting', 'deadline', 'other');--> statement-breakpoint
CREATE TYPE "public"."leave_request_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."leave_type" AS ENUM('annual', 'sick', 'maternity', 'paternity', 'unpaid', 'other');--> statement-breakpoint
CREATE TYPE "public"."notification_type" AS ENUM('contract', 'leave', 'attendance', 'payroll', 'other');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('pending', 'paid', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('user', 'admin', 'superadmin');--> statement-breakpoint
CREATE TABLE "attendance" (
	"id" varchar PRIMARY KEY NOT NULL,
	"employee_id" varchar,
	"date" date,
	"check_in" timestamp,
	"check_out" timestamp,
	"status" "attendance_status",
	"notes" text,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "calendar_events" (
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"description" text,
	"event_type" "event_type",
	"start_date" date,
	"end_date" date,
	"start_time" time,
	"end_time" time,
	"all_day" boolean,
	"created_by" varchar,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "contracts" (
	"id" varchar PRIMARY KEY NOT NULL,
	"employee_id" varchar,
	"start_date" date,
	"end_date" date,
	"contract_type" "contract_type",
	"salary" numeric,
	"benefits" text,
	"status" "contract_status",
	"approved_by" varchar,
	"approved_at" timestamp,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "department_employees" (
	"id" varchar PRIMARY KEY NOT NULL,
	"department_id" varchar,
	"employee_id" varchar,
	"is_primary" boolean,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "departments" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar,
	"description" text,
	"manager_id" varchar,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "employees" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar,
	"first_name" varchar,
	"last_name" varchar,
	"email" varchar,
	"phone" varchar,
	"address" text,
	"birth_date" date,
	"hire_date" date,
	"department_id" varchar,
	"position_id" varchar,
	"manager_id" varchar,
	"status" "employee_status",
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "employees_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "files" (
	"id" varchar PRIMARY KEY NOT NULL,
	"file_name" varchar NOT NULL,
	"file_url" varchar NOT NULL,
	"uploaded_by" varchar NOT NULL,
	"uploaded_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "leave_balances" (
	"id" varchar PRIMARY KEY NOT NULL,
	"employee_id" varchar,
	"leave_type" "leave_type",
	"year" integer,
	"total_days" integer,
	"used_days" integer,
	"remaining_days" integer,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "leave_requests" (
	"id" varchar PRIMARY KEY NOT NULL,
	"employee_id" varchar,
	"leave_type" "leave_type",
	"start_date" date,
	"end_date" date,
	"duration" integer,
	"reason" text,
	"status" "leave_request_status",
	"approved_by" varchar,
	"approved_at" timestamp,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar,
	"title" varchar,
	"content" text,
	"type" "notification_type",
	"is_read" boolean,
	"created_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "payroll" (
	"id" varchar PRIMARY KEY NOT NULL,
	"employee_id" varchar,
	"period_start" date,
	"period_end" date,
	"basic_salary" numeric,
	"allowances" numeric,
	"deductions" numeric,
	"tax" numeric,
	"net_salary" numeric,
	"payment_date" date,
	"payment_status" "payment_status",
	"created_by" varchar,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "performance_evaluations" (
	"id" varchar PRIMARY KEY NOT NULL,
	"employee_id" varchar,
	"evaluator_id" varchar,
	"evaluation_period" "evaluation_period",
	"evaluation_year" integer,
	"productivity_score" numeric,
	"quality_score" numeric,
	"teamwork_score" numeric,
	"leadership_score" numeric,
	"overall_score" numeric,
	"comments" text,
	"status" "evaluation_status",
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "positions" (
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"description" text,
	"department_id" varchar,
	"salary_min" numeric,
	"salary_max" numeric,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"token" varchar NOT NULL,
	"device" varchar,
	"ip_address" varchar,
	"user_agent" text,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"last_accessed" timestamp DEFAULT now(),
	"expires_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"name" varchar NOT NULL,
	"phone" varchar,
	"password_hash" varchar NOT NULL,
	"avatar" varchar,
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_uploaded_by_users_id_fk" FOREIGN KEY ("uploaded_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;