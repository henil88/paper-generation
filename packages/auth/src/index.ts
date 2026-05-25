import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { account, db, session, user, verification } from "@paper-generation/db";
import { env } from "@paper-generation/env/server";
import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
import { admin as adminPlugin } from "better-auth/plugins";
import { ac, admin, student, teacher } from "./permissions";
import { ROLES, type Role } from "./roles";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { user, session, account, verification },
  }),

  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  trustedOrigins: [env.FRONTEND_URL, env.MOBILE_URL],
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },
  user: {
    additionalFields: {
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
        before: async (user, ctx) => {
          const requestedRole = ctx?.body?.role as Role;

          const allowedRoles = [ROLES.STUDENT, ROLES.TEACHER];

          if (requestedRole) {
            if (requestedRole === "admin") {
              throw new APIError("BAD_REQUEST", {
                message: "Cannot self-assign admin role",
              });
            } else if (!allowedRoles.includes(requestedRole)) {
              throw new APIError("BAD_REQUEST", {
                message: "Invalid role selected",
              });
            } else {
              user.role = requestedRole;
            }
          }

          if (!user.role) {
            user.role = ROLES.STUDENT;
          }

          return { data: user };
        },
      },
    },
  },
  advanced: {
    disableCSRFCheck: true,
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
  ],
});
