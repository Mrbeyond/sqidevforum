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

The basic student auth part.

At present only Google login is implemented for better augmentation and SQI API is 
expected later in the future as well.

Route: /auth (This main route handles login and signup together)
incoming data: {
  firstName, lastName, password, email
}
response data: {student data, token}



Route: /logout
incoming data: {
  (auth header)
}
response data: {success code}

Route: /reget_student (Evalute and get auth student, used in the store's action in front end to get auth student in case of refresh or to force login if not logged in)
incoming data: {
  (auth header)
}
response data: {student data}

Route: /update_student
incoming data: {
  (auth header)
  firstName, lastName, gender, course, phoneNumber
}
response data: {student data}





