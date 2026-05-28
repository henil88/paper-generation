import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { dash } from "@better-auth/infra";
import { account, db, session, user, verification } from "@paper-generation/db";
import { env } from "@paper-generation/env/server";
import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
import { admin as adminPlugin } from "better-auth/plugins";
import { ac, admin, student, teacher } from "./permissions";
import { ROLES, type Role } from "./roles";

export const auth = betterAuth({
  appName: "Paper Generation",
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),

  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  trustedOrigins: [env.FRONTEND_URL, env.MOBILE_URL],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
      strategy: "jwe",
    },
  },
  user: {
    additionalFields: {
      signUpRole: {
        type: "string",
        input: true,
        required: false,
      },
      schoolName: {
        type: "string",
        required: false,
        input: true,
      },
      phone: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user, _ctx) => {
          const requestedRole = (user.signUpRole || "student") as Role;
          if (requestedRole === "admin") {
            throw new APIError("BAD_REQUEST", {
              message: "Cannot self-assign admin role",
            });
          }

          const allowedRoles = [ROLES.STUDENT, ROLES.TEACHER];
          if (!allowedRoles.includes(requestedRole)) {
            throw new APIError("BAD_REQUEST", {
              message: "Invalid role selected",
            });
          }

          return {
            data: {
              ...user,
              role: requestedRole,
              signUpRole: null,
            },
          };
        },
      },
    },
  },
  advanced: {
    ipAddress: {
      ipAddressHeaders: ["cf-connecting-ip", "x-forwarded-for"],
    },
    database: {
      generateId: false,
    },
  },
  plugins: [
    adminPlugin({
      ac,
      roles: {
        admin,
        teacher,
        student,
      },
      defaultRole: ROLES.STUDENT,
    }),
    dash({
      apiKey: env.BETTER_AUTH_API_KEY,
      kvUrl: env.BETTER_AUTH_IDENTIFY_URL,
    }),
  ],
  experimental: {
    joins: true,
  },
});
