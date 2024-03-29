// #!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import { AddStudent, ViewStudents } from './student.js';
import { AddTeacher, ViewTeachers } from './teacher.js';
import { AddCourse, ViewCourses } from './course.js';
console.log(chalk.bold.rgb(204, 204, 204)(`\n   <<<===========================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<=======>>>  ${chalk.redBright.bold('STUDENT MANAGEMENT SYSTEM')}  <<<=======>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`   <<<===========================================>>>\n`));
let students = [];
let courses = [];
let teachers = [];
const DetailsInputs = async (type, name) => {
    let value;
    while (true) {
        const input = await inquirer.prompt([{
                name: 'input',
                message: `Enter ${name}: `,
                type: type
            }]);
        value = await input['input'];
        if (value) {
            break;
        }
    }
    return value;
};
async function IndividualChoice(val, ...options) {
    const input = await inquirer.prompt([{
            name: 'choice',
            message: `${val} Options`,
            type: 'rawlist',
            choices: options,
        }]);
    let value = await input['choice'];
    return value;
}
async function MakeChoice() {
    const input = await inquirer.prompt([{
            name: 'choice',
            message: "Select One",
            type: 'rawlist',
            choices: ["Student", "Teacher", "Course"]
        }]);
    let value = await input['choice'];
    if (value === "Student") {
        const option = await IndividualChoice("Student", "Add Student", "View Students");
        if (option === "Add Student") {
            await AddStudent(DetailsInputs, students);
        }
        if (option === "View Students") {
            await ViewStudents(students, courses);
        }
    }
    if (value === "Teacher") {
        const option = await IndividualChoice("Teacher", "Add Teacher", "View Teachers");
        if (option === 'Add Teacher') {
            await AddTeacher(DetailsInputs, teachers);
        }
        if (option === 'View Teachers') {
            await ViewTeachers(teachers, courses);
        }
    }
    if (value === "Course") {
        const option = await IndividualChoice("Course", "Add Course", "View Courses");
        if (option === "Add Course") {
            await AddCourse(DetailsInputs, courses);
        }
        if (option === "View Courses") {
            await ViewCourses(courses, teachers, students);
        }
    }
}
// Program Entry Point
while (true) {
    let choices = await MakeChoice();
    const input = await inquirer.prompt([
        {
            name: chalk.rgb(255, 255, 160)(`Do You Want To Exit?`),
            type: "confirm",
            default: false
        }
    ]);
    let value = await input['\x1B[38;2;255;255;160mDo You Want To Exit?\x1B[39m'];
    if (value) {
        break;
    }
    console.log(chalk.whiteBright('\n================================================================\n'));
}
