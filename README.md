## Name
HW3 load-trucks project

## Description
Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## Badges
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Contributing and instllation
2. Install node js package in https://nodejs.org/uk/ for your system
1. In the beginning you should install all packages with command 'npm install'
2. Then set environmental variables in .env file: 
    SECRET_KEY - key for interaction with jwt-token;
    SENDGRID_API_KEY - API key for using Send Grid
    (also set in function forgotPassword(in file authentificateService) your own email, from which you want to send letters)
3. Run program with command 'npm start'