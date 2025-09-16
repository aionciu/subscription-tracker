# Documentation

This directory contains all documentation for the Subscription Tracker app, organized by category for easy navigation.

## 📁 Structure

```
docs/
├── README.md                    # This file - documentation index
├── phase1_plan.md              # Project planning and roadmap
├── setup/                      # Setup and installation guides
│   ├── SUPABASE_SETUP.md       # Supabase database setup
│   └── env.example             # Environment variables template
├── development/                # Development guides and troubleshooting
│   └── TROUBLESHOOTING.md      # Common issues and solutions
├── testing/                    # Testing documentation
│   └── README.md              # Test suite documentation
└── database/                   # Database documentation
    ├── MIGRATION_GUIDE.md      # Database migration guide
    └── SUPABASE_README.md      # Supabase-specific documentation
```

## 🚀 Quick Start

### For New Developers
1. **Setup**: Start with [Supabase Setup](setup/SUPABASE_SETUP.md)
2. **Environment**: Copy [env.example](setup/env.example) to `.env.local`
3. **Development**: Read [Troubleshooting](development/TROUBLESHOOTING.md) for common issues
4. **Testing**: Check [Testing Guide](testing/README.md) for test structure

### For Project Management
- **Planning**: Review [Phase 1 Plan](phase1_plan.md) for project roadmap
- **Database**: Check [Migration Guide](database/MIGRATION_GUIDE.md) for schema changes

## 📚 Documentation Categories

### 🛠️ Setup & Installation
- **[Supabase Setup](setup/SUPABASE_SETUP.md)** - Database configuration and setup
- **[Environment Variables](setup/env.example)** - Required environment configuration

### 🔧 Development
- **[Troubleshooting](development/TROUBLESHOOTING.md)** - Common issues and solutions
- **[Phase 1 Plan](phase1_plan.md)** - Project roadmap and milestones

### 🧪 Testing
- **[Testing Guide](testing/README.md)** - Test structure, utilities, and best practices

### 🗄️ Database
- **[Migration Guide](database/MIGRATION_GUIDE.md)** - Database schema migrations
- **[Supabase Documentation](database/SUPABASE_README.md)** - Supabase-specific setup and configuration

## 📖 Contributing to Documentation

When adding new documentation:

1. **Choose the right category**:
   - `setup/` - Installation and configuration guides
   - `development/` - Development workflows and troubleshooting
   - `testing/` - Testing guides and best practices
   - `database/` - Database-related documentation

2. **Follow naming conventions**:
   - Use descriptive filenames in UPPERCASE with underscores
   - Use `.md` extension for Markdown files
   - Update this README.md to include new files

3. **Keep documentation up to date**:
   - Update relevant docs when making code changes
   - Remove outdated information
   - Add examples and code snippets where helpful

## 🔗 Related Resources

- **Main Project README**: [../README.md](../README.md)
- **Source Code**: [../src/](../src/)
- **App Routes**: [../app/](../app/)
- **Test Suite**: [../__tests__/](../__tests__/)

## 📝 Documentation Standards

- Use clear, descriptive headings
- Include code examples where relevant
- Keep instructions step-by-step
- Add troubleshooting sections for complex procedures
- Use consistent formatting and structure
