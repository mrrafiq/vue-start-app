export const menu = [
  {
    group: "Users",
    icon: "mdi-account",
    items: [
      {
        name: "user-management",
        title: "User Management",
        icon: "mdi-account",
        link: "/users",
        permission: "browse_user",
        hide: true,
      },
      {
        name: "role-management",
        title: "Role Management",
        icon: "mdi-clipboard-account",
        link: "/roles",
        permission: "browse_roles",
        hide: true,
      },
      {
        name: "permission-management",
        title: "Permission Management",
        icon: "mdi-account-lock-outline",
        link: "/permissions",
        permission: "browse_permissions",
        hide: true,
      },
    ]
  }
]

const permissions = userAuthPermissions()
// console.log(permissions.userPermissions);

// check if users has permission to access menu
menu.forEach(element => {
  element.items.forEach(item => {
    if (permissions.userPermissions.includes(item.permission)) {
      item.hide = false
    }
  });
});

export const applicationName = "My Application"