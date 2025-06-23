import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

// Demo users data (in production, this would come from your database)
const demoUsers = [
  {
    id: 1,
    email: "admin@masscar.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // bcrypt hash of "123456"
    role: "admin",
    firstName: "System",
    lastName: "Administrator",
    phone: "+252-61-234-5678",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    email: "staff@masscar.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // bcrypt hash of "123456"
    role: "staff",
    firstName: "Workshop",
    lastName: "Staff",
    phone: "+252-61-234-5679",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    email: "tech@masscar.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // bcrypt hash of "123456"
    role: "technician",
    firstName: "Senior",
    lastName: "Technician",
    phone: "+252-61-234-5680",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    email: "customer@masscar.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // bcrypt hash of "123456"
    role: "customer",
    firstName: "Demo",
    lastName: "Customer",
    phone: "+252-61-234-5681",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user by email
    const user = demoUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json({ error: "Account is deactivated" }, { status: 401 })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create user session data (exclude password)
    const userData = {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      loginTime: new Date().toISOString(),
    }

    // In production, you would:
    // 1. Create a JWT token or session
    // 2. Store session in database
    // 3. Set secure HTTP-only cookies

    return NextResponse.json({
      success: true,
      user: userData,
      message: "Login successful",
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
