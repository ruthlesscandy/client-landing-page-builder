# Client Landing Page Builder

A simple first version of a business landing page for a menu, photos, social links, and news. It is a static website: no sign-in or database is set up yet.

## Add your business details

1. Open [`app.js`](app.js) in the repository.
2. Click the pencil/edit button on GitHub.
3. Replace the sample information in the `business` section at the top with your business name, description, menu, address, hours, phone, and social links.
4. Replace the sample image URLs with links to your own pictures. The links should begin with `https://`.
5. Click **Commit changes**. The webpage reads the details from this file.

For example, change `name: "Your Business"` to `name: "Sunny Side Cafe"`. To add a menu item, copy one `{ name, description, price }` entry and edit its values. To add a photo or update, copy an existing entry in that list.

## Preview it

You can preview locally by downloading the repository and opening `index.html` in a browser. To publish it free with GitHub Pages, open the repository's **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save. GitHub will show the public website link in that Pages section after it builds.

## Important for client editing

Right now, changing details means editing `app.js` and committing the change. This starter does not yet include a private editor, user accounts, photo-upload storage, or a drag-and-drop page builder. Those features need to be added before clients can safely sign in and edit their own live pages. Do not put passwords, private customer information, or other secrets in this public repository.
