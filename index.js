// Importing Inbuilt Modules
import fs from 'node:fs' //File System Module
import path from 'node:path' //File System Module


// Importing External Modules
import chalk from 'chalk' //CLI Color Module

import { fileURLToPath } from 'url';

// Simulate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construct path to assets/task.json
const taskFilePath = path.join(__dirname, 'assets', 'tasks.json');

console.log(taskFilePath)


// Task Manager Class
class TaskManager{
    constructor(fs, path, chalk, taskFilePath){
        process.stdin.setEncoding('utf8');


        this.fs = fs
        this.path = path
        this.chalk = chalk
        this.taskFilePath = taskFilePath

        // Bind the methods
        this.onData = this.onData.bind(this)
        this.onStdOut = this.onStdOut.bind(this)
        this.showHelp = this.showHelp.bind(this)
        this.onClearTerminal = this.onClearTerminal.bind(this)
        this.onAdd = this.onAdd.bind(this)



    
    }

    // Init Method
    init(){

        // Clear The Console, and add the TaskManager Title
        console.clear();
        console.log(this.chalk.red("======================================================================================================"));
        console.log(this.chalk.red(" ████████╗ █████╗ ███████╗██╗  ██╗    ███╗   ███╗ █████╗ ███╗   ██╗ █████╗   ██████╗ ███████╗██████╗  "));
        console.log(" ╚══██╔══╝██╔══██╗██╔════╝██║ ██║     ████╗ ████║██╔══██╗████╗  ██║██╔══██╗ ██╔════╝ ██╔════╝██╔══██╗  ");
        console.log("    ██║   ███████║███████╗█████║      ██╔████╔██║███████║██╔██╗ ██║███████║ ██║  ███╗█████╗  ██████╔╝  ");
        console.log("    ██║   ██╔══██║╚════██║██╔══██║    ██║╚██╔╝██║██╔══██║██║╚██╗██║██╔══██║ ██║   ██║██╔══╝  ██╔═███║  ");
        console.log("    ██║   ██║  ██║███████║██║  ██║    ██║ ╚═╝ ██║██║  ██║██║ ╚████║██║  ██║ ╚██████╔╝███████╗██║  ██║  ");
        console.log(this.chalk.green("    ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝    ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝  "));
        console.log(this.chalk.green("======================================================================================================"));

        console.log(
            this.chalk.blue(
                "📘 Usage: add | bulkadd | list | searchlist | complete <id> | delete <id> | archive <id> | archive view | archive clear <id> | archive clear all | archive search <keyword> | recycle <id> | recycle clear | recycle delete <id> | clear | help | exit"
            )
        )


        // CLI Input
        this.onStdOut()

        process.stdin.on('data', this.onData)

        // On Help
        

    }
    // End of Init Method

    // CLI Stdout
    onStdOut(){
        process.stdout.write(
            this.chalk.bgMagenta.black("Task-Manager-$> ")
        )
    }

    // CLI Input Control
    onData(data){

        if (data.trim().toLowerCase() === 'help'){
            return this.showHelp()
        }
        if (data.trim().toLowerCase() === 'exit'){
            console.log("👋 Exiting...")
            return this.onExit()
        }
        if (data.trim().toLowerCase() === 'clear'){
            console.log("👋 Exiting...")
            return this.onClearTerminal()
        }

        const string = data.trim().toLowerCase()
        const stringArr = string.split(' ')

        if (stringArr[0] === 'add'){
            return this.onAdd(stringArr, taskFilePath)
        }


        this.onStdOut()

    }

    // To add Task
    onAdd(stringArr, taskFilePath){
        fs.readFile(taskFilePath, 'utf-8', (err, data)=>{
            if (err) throw err


            
            const newData = JSON.parse(data)

            let temp = ""

            for (let i = 1; i < stringArr.length - 1; i++){
                i < stringArr.length-2? temp += (stringArr[i] + " "):  temp += (stringArr[i])
            }

            newData.push({
                "id": (newData[newData.length - 1].id) + 1,
                "description": `${temp}`,
                "completed": false,
                "due": `${stringArr[stringArr.length - 1]}`
            })

            fs.writeFile(taskFilePath, (JSON.stringify(newData)), (err)=>{
                if (err) throw err
            })
        })

        this.onStdOut()

    }

    // To BulkAdd Tasks
    bulkAdd(){

    }

    // To List Tasks
    onList(){

    }

    // To Search Task List
    onSearchTask(){

    }

    // To Complete a Task
    oncComplete(){

    }

    // Delete a Task
    onDelete(){

    }

    // Archive a Task
    onArchive(){

    }

    // View Archive
    onArchiveView(){

    }

    // Clear Archive
    onArchiveClear(){

    }

    // Clear All Archive
    onArchiveClearAll(){

    }

    // Search Archive
    onArchiveSearch(){

    }

    // Recycle a Task to Task List
    onRecycle(){

    }

    // Clear Recycle Bin
    onRecycleClear(){

    }

    // Delete a Task From Recycle Bin
    onRecycleDelete(){

    }

    // Clear The Terminal
    onClearTerminal(){
        console.clear()
        this.onStdOut()
    }

    // Help List
    showHelp(){
        console.log(this.chalk.bold("\n🧠 Task Manager CLI Help Menu"));
        console.log(this.chalk.cyan("Usage:\n"));

        console.log(this.chalk.bold("📌 Core Commands:"));
        console.log(
        "  add <desc> <due>           → Add a new task with optional due date"
        )
        console.log(
        "  bulkadd <desc1> <due1> ... → Add multiple tasks with paired due dates"
        )
        console.log("  list                       → View active tasks");
        console.log("  complete <desc>            → Mark a task as completed");
        console.log("  delete <desc>              → Delete a task by description");

        console.log(this.chalk.bold("\n📁 Archive Commands:"));
        console.log(
        "  archive <desc>             → Archive a completed task by description"
        )
        console.log("  archive view               → View archived tasks");
        console.log("  archive clear all          → Remove all tasks from archive");
        console.log(
        "  archive clear <desc>       → Remove specific task from archive"
        )
        console.log(
        "  archive search <keyword>   → Search archived tasks by keyword"
        )

        console.log(this.chalk.bold("\n🧼 Utility Commands:"));
        console.log("  clear                      → Clear the terminal screen");
        console.log("  help                       → Show this help message");
        console.log("  exit                       → Exit the program\n");

        this.onStdOut()
    }

    // Exit
    onExit(){
        process.exit(0)
    }
}


// Creating a New Instance
const taskManager  = new TaskManager(fs, path, chalk, taskFilePath)

// Calling The Method
taskManager.init()