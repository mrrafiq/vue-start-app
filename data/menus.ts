// export const menus = [
//   {
//     group: 'users',
//     title: 'Users',
//     icon: 'mdi-laptop-account',
//     items: [
//       {
//         name: "user-management",
//         title: "User Management",
//         icon: "mdi-account",
//         link: "/users",
//       },
//       {
//         name: "role-management",
//         title: "Role Management",
//         icon: "mdi-clipboard-account",
//         link: "/roles",
//       },
//       {
//         name: "permission-management",
//         title: "Permission Management",
//         icon: "mdi-account-lock-outline",
//         link: "/permissions",
//       },
//     ],
//   },
// ]

const group = [
  {name: "Users", icon: "mdi-account"},
  {name: "Configuration"},
  {name: "HRD"}
]

const users = [
  {
    name: "user-management",
    title: "User Management",
    icon: "mdi-account",
    link: "/users",
  },
  {
    name: "role-management",
    title: "Role Management",
    icon: "mdi-clipboard-account",
    link: "/roles",
  },
  {
    name: "permission-management",
    title: "Permission Management",
    icon: "mdi-account-lock-outline",
    link: "/permissions",
  },
]

const config = [
  {
    name: "setting-management",
    title: "Setting Management",
    icon: "mdi-cog",
    link: "/settings",
  },
]

const hrd = [
  {
    name: "employee-management",
    title: "Employee Management",
    icon: "mdi-account-multiple",
    link: "/employees",
  },
  {
    name: "department-management",
    title: "Department Management",
    icon: "mdi-account-multiple",
    link: "/departments",
  },
  {
    name: "designation-management",
    title: "Designation Management",
    icon: "mdi-account-multiple",
    link: "/designations",
  },
]

export const menus = {
  group: group,
  items: [
    users, config, hrd
  ]
}

// export const menus = [
//   {
//     type: "subheader",
//     title: "Users",
//   },
//   {
//     title: "User Management",
//     value: "User Management",
//     icon: "mdi-account",
//     link: "/users",
//   },
//   {
//     title: "Role Management",
//     value: "Role Management",
//     icon: "mdi-clipboard-account",
//     link: "/roles",
//   },
//   {
//     title: "Permission Management",
//     value: "Permission Management",
//     icon: "mdi-account-lock-outline",
//     link: "/permissions",
//   },

//   { type: 'divider' },

//   {
//     type: "subheader",
//     title: "Users",
//   },
// ]

export const applicationName = "My Application"