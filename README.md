This app is basically for SQI college of ICT developers to relate and get overflow of help. Students progress are monitored and any challenge posing situation would be rectified collectively. This is help over flow.



The features:

1) Basic auths and modifications,

2)Post your feelings right from day one about programming or a particular language. And people can comment.

3) Student stack:
All known languages
And current language is emphasized with progress, issues and thoughts.

4) Projects:
Progress report,.repo, description.

Current project is emphasized with issues, need help?, need collaborator?, progress, language, repo.

4) Realtime chat, private and general.

Messages can be tagged,   modified.

5) General questions and answers:
Weekly and monthly assessment of best problem solver with profiling point.

6) General recommendations and updates.



This following part is for co-developers to have the glimpse of expected data on reach route.

The basic student auth part

Route: /signup
incoming data: {
  firstName, lastName, password, email, phoneNum, gender, course
}
response data: {student data, token}


Route: /login
incoming data: {
  password, email
}
response data: {student data, token}

Route: /logout
incoming data: {
  (auth header)
}
response data: {success code}

Route: /update_student
incoming data: {
  (auth header)
  firstName, lastName, gender, course
}
response data: {student data}

Route: /change_email
incoming data: {
  (auth header)
  email
}
response data: {student data}

Route: /change_password
incoming data: {
  (auth header)
  password
}
response data: {success code}

Route: /change_phone_number
incoming data: {
  (auth header)
  phone
}
response data: {student data}



