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
const taskFilePath = path.join(__dirname, 'db', 'tasks.json');



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
        this.onList = this.onList.bind(this)


        process.stdin.on('data', this.onData)




    
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
                "📘 Usage: add | bulkadd | list | searchList <keyword> | complete <id> | delete <id> | archive <id> | archiveView | archiveSearch <keyword> | archiveDelete <id> | archiveDeleteAll | recycleView | recycle <id> | recycleDelete <id> | RecycleDeleteAll | clear | help | exit"
            )
        )


        // CLI Input
        this.onStdOut()
        

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

        const string = data.trim().toLowerCase()
        const stringArr = string.split(' ')

        const commands = ['add', 'bulkadd', 'list', 'searchlist', 'complete', 'delete', 'archive', 'archiveview', 'archivesearch', 'archivedelete', 'archivedeleteall', 'recycleview', 'recycle', 'recycledelete', 'recycledeleteall', 'clear', 'help', 'exit']

        // Check if command is in list
        if (!commands.includes(stringArr[0])) {
            console.log(this.chalk.red("❌ Command not recognized. Type 'help' to see the list of available commands."))
            return process.stdout.write(
            this.chalk.bgMagenta.black("Task-Manager-$> ")
        )
        }

        if (data.trim().toLowerCase() === 'help'){
            return this.showHelp()
        }

        if (data.trim().toLowerCase() === 'exit'){
            console.log("👋 Exiting...")
            return this.onExit()
        }

        if (data.trim().toLowerCase() === 'clear'){
            console.log("👋 Clearing Terminal...")
            return this.onClearTerminal()
        }

        if (stringArr[0] === 'add'){
            return this.onAdd(stringArr, taskFilePath)
        }

        if (data.trim().toLowerCase() === 'list'){
            
            return this.onList()
        }


        this.onStdOut()

    }

    // To add Task
    onAdd(stringArr, taskFilePath){
        fs.readFile(taskFilePath, 'utf-8', (err, data)=>{
            if (err) {
                console.log(this.chalk.red("❌ File Error: Couldn't write to file. Kindly ensure 'storage file' is in place"))
                return process.stdout.write(
                    this.chalk.bgMagenta.black("Task-Manager-$> ")
        )
            }

            let dataString
            let newData
            let temp = ""

            if (data === ""){
                for(let i = 1; i < stringArr.length - 1; i++){
                    i !== stringArr.length - 2? temp += stringArr[i]+" " : temp += stringArr[i]
                }
                dataString = `[{"id": 1, "desc": "${temp}", "due": "${stringArr[stringArr.length - 1]}", "completed": false, "delId": 1, "archived": false}]`
                
            }
            else{
                try{
                    newData = JSON.parse(data)
                    let newId = newData[newData.length - 1].id + 1
                    let newDeleteId = newData[newData.length - 1].delId + 1

                    for(let i = 1; i < stringArr.length - 1; i++){
                    i !== stringArr.length - 2? temp += stringArr[i]+" " : temp += stringArr[i]
                }
                    newData.push({"id": newId, "desc": temp, "due": stringArr[stringArr.length - 1], "completed": false, "delId": newDeleteId, "archived": false})
                    
                    dataString = JSON.stringify(newData)
                    
                }
                catch(err){
                    
                }
            }
            fs.writeFile(taskFilePath, dataString, err=>{
                if (err) {
                    console.log(this.chalk.red("❌ File Error: Couldn't write to file. Kindly ensure command is correct"))
                    return process.stdout.write(
                        this.chalk.bgMagenta.black("Task-Manager-$> ")
        )
                }
            })
            
            

            
        })

        console.log("✅ Task Added")
        this.onStdOut()

    }

    // To BulkAdd Tasks
    bulkAdd(){

    }

    // To List Tasks
    onList(){

        const statusHeader = "Status".padEnd(10);
        const idHeader = "ID".padEnd(20);
        const dueHeader = "Due date".padEnd(20);
        const descHeader = "Description";
        console.log(
            "\n" + this.chalk.bold(statusHeader + idHeader + dueHeader + descHeader)
        )
        console.log(
            this.chalk.gray(
            "────────────────────────────────────────────────────────────────────────────────────────"
            )
        )

        fs.readFile(taskFilePath, 'utf-8', (err, data)=>{
            if (err) throw err

            const newData = JSON.parse(data)
            newData.forEach(item =>{
                if (item.completed === false){
                    console.log(`[ ]          ${item.id}                ${item.due}          ${item.desc}`)
                }
                else{
                    console.log(`[✔]          ${item.id}                ${item.due}          ${item.desc}`)
                }

                
            })


        this.onStdOut()

        })



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
        this.init()
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
        console.log("  list                       → List all tasks");
        console.log("  searchList <keyword>       → Search for a task");
        console.log("  complete <id>              → Mark a task as completed");
        console.log("  delete <id>                → Delete a task by id");

        console.log(this.chalk.bold("\n📁 Archive Commands:"));
        console.log(
        "  archive <id>               → Archive a completed task by id"
        )
        console.log("  archiveView               → View archived tasks");
        console.log("  archiveSearch <keyword>    → Search for an archived task");
        console.log(
        "  archiveDelete <id>         → Remove specific task from archive"
        )
        console.log(
        "  archiveDeleteAll           → Delete all archived tasks"
        )
        console.log(this.chalk.bold("\n📁 Recycling Commands:"));
        console.log(
        "  recycleView                → View tasks in bin"
        )
        console.log("  recycle <id>               → Restore a task from the bin");
        console.log("  recycleDelete <id>         → Delete a task from the bin");
        console.log(
        "  recycleDeleteAll           → Empty the recycle bin"
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