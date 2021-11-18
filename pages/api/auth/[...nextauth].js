import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { OAuth2Client } from 'google-auth-library'
import prisma from '../../../lib/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

const googleAuthClient = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_ID)

const adapter = PrismaAdapter(prisma)
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  adapter,
  // https://next-auth.js.org/configuration/providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    CredentialsProvider({
      // The id of this credential provider. It's important to give an id because, in frontend we don't want to
      // show anything about this provider in a normal login flow
      id: 'googleonetap',
      // A readable name
      name: 'googleonetap',
      // This field define what parameter we expect from the FE and what's its name. In this case "credential"
      // This field will contain the token generated by google
      credentials: {
        credential: { type: 'text' }
      },
      // This where all the logic goes
      authorize: async (credentials) => {
        // The token given by google and provided from the frontend
        const token = (credentials).credential
        // We use the google library to exchange the token with some information about the user
        const ticket = await googleAuthClient.verifyIdToken({
          // The token received from the interface
          idToken: token,
          // This is the google ID of your application
          audience: process.env.NEXT_PUBLIC_GOOGLE_ID
        })
        const payload = ticket.getPayload() // This is the user

        if (!payload) {
          throw new Error('Cannot extract payload from signin token')
        }

        const {
          email,
          sub,
          given_name: givenName,
          family_name: familyName,
          email_verified: emailVerified,
          picture: image
        } = payload

        // If for some reason the email is not provided, we cannot login the user with this method
        if (!email) {
          throw new Error('Email not available')
        }

        // Let's check on our DB if the user exists
        let user = await adapter.getUserByEmail(email)
        // If there's no user, we need to create it
        if (!user) {
          user = await adapter.createUser({
            name: [givenName, familyName].join(' '),
            email,
            image,
            emailVerified: emailVerified ? new Date() : undefined
          })
        }
        // Let's also retrieve any account for the user from the DB, if any
        let account
        if (user) {
          account = await adapter.getUserByAccount({ provider: 'google', providerAccountId: sub })
        }
        // In case the account is not yet present on our DB, we want to create one and link to the user
        if (!account && user) {
          await adapter.linkAccount({
            userId: user.id,
            provider: 'google',
            providerAccountId: sub,
            accessToken: null,
            accessTokenExpires: null,
            refresh_token: null
          })
        }
        // We can finally returned the retrieved or created user
        return user
      }
    })
  ],
  database: process.env.DATABASE_URL,
  secret: process.env.SECRET,
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    strategy: 'jwt'

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `jwt: true` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    // secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
    secret: process.env.SECRET
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    // signIn: '/auth/signin',  // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) { return true },
    // async redirect({ url, baseUrl }) { return baseUrl },
    // async session({ session, token, user }) { return session },
    // async jwt({ token, user, account, profile, isNewUser }) { return token },
    async jwt ({ token, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        token.userId = user.id
        token.docorId = user.doctorId
      }
      return token
    },
    async session ({ session, token, user }) {
      session.user.id = token.userId
      session.user.doctorId = token.doctorId
      return session
    }
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // You can set the theme to 'light', 'dark' or use 'auto' to default to the
  // whatever prefers-color-scheme is set to in the browser. Default is 'auto'
  theme: {
    colorScheme: 'auto'
  },

  // Enable debug messages in the console if you are having problems
  debug: false
})