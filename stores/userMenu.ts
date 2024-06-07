import { defineStore } from "pinia"

interface MenuItem {
  link: string;
  title: string;
  hide: boolean;
  name: string
  icon: string
  permission: string
}

interface MenuGroup {
  group: string;
  icon: string;
  hide: boolean;
  items: MenuItem[];
}

export const useUserMenu = defineStore('menu', {
  state: () => ({
    menu: [
      {
        group: "Users",
        icon: "mdi-account",
        hide: true,
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
      },
      {
        group: "Employees",
        icon: "mdi-account-group",
        hide: true,
        items: [
          {
            name: "employee-data",
            title: "Employee Data",
            icon: "mdi-account-group",
            link: "/employee-data",
            permission: "browse_employee",
            hide: true,
          },
          {
            name: "department",
            title: "Departments",
            icon: "mdi-archive-outline",
            link: "/departments",
            permission: "browse_department",
            hide: true,
          },
        ]
      }
    ] as MenuGroup[]
  }),
  getters: {
    userMenu: (state) => state.menu
  },
  actions: {
    async getUserMenu() {
      const permissions = userAuthPermissions()
      await permissions.getPermissions()
      // check if users has permission to access menu
      this.menu.forEach(element => {
        element.items.forEach(item => {
          if (permissions.userPermissions.includes(item.permission)) {
            item.hide = false
            element.hide = false
          }
        });
      });
    },
    async resetMenu() {
      this.menu.forEach(element => {
        element.items.forEach(item => {
          item.hide = true
        });
      });
    }
  }
})

