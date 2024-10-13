# Task man

a minimal task manager to get the job done!

## Features

![alt text](https://deepcms.danaenergy.com/uploads/task_man_5139be3a48.gif)

Key Features:

- Landing page
- TailwindCSS
- Mantine for UI components
- Dark mode
- Auth with Clerk
- Organizations / Workspaces
- Board creation
- Unsplash API for random beautiful cover images
- Activity log for entire organization
- Board rename and delete
- List creation
- List rename, delete, drag & drop reorder and copy
- Card creation
- Card description, rename, delete, drag & drop reorder and copy
- Card activity log
- Supabase
- Prisma ORM

## Usage

### Prerequisites

**Node version 18.x.x**

### Cloning the repository

```shell
git clone https://github.com/navid70/task-man.git
```

### Install packages

```shell
yarn install
```

### Setup .env file

```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=

DATABASE_URL=

DIRECT_URL=

NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=

```

### Setup Prisma

Add your SQL Database, then:
```shell
npx prisma generate
npx prisma db push

```

### Start the app

```shell
yarn dev
```


## Thanks

I should thank Diginext mentors and teachers for helping to develop and improve this project
