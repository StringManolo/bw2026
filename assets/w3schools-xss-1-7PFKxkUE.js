const e=`## XSS - Stored

Report made 1 oct, 2020 to mypage.w3schools.com where I found a Stored XSS.

![Alert box prompted from w3schools.com](/resources/w3schoolsxss.webp)

I found this stored XSS bug testing w3schools security. Just made an account following the login link in the main domain. Here is the original report in case you want to take a look.

## Original Security Report

---

**Security report for https://mypage.w3schools.com at 1 october, 01:20 (Spain).**

The input "name" located at https://mypage.w3schools.com/mypage/editprofile.php is vulnerable to XSS.

**Step replication.**

1. Create new account and Log in.
2. Click edit profile button or go to the vulnerable url.
3. Introduce \`<svg/onload=alert()>\`
4. Save changes.

The javascript code get executed everytime i visit the webpage.

**Safety recommendation:**

In case it's a "feature", should be removed anyways. I'm sure there is a lot of ways to use this vulnerability to damage the website and the users.

---

## This is the payload:

![inserted payload](/resources/w3schoolspayload.webp)

The bug was totally a low hanging fruit.
`;export{e as default};
