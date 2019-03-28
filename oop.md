# Store the search time in a variable
+Using process.argv

# Join the remaining arguments as a single argument
var search = process.argv.slice(3)
console.log("There should be just the search term here:",search)
var command = arg[2]
arg.slice(0, 3)
console.log(arg)

# Check IF (STATEMENT: if no search term was provided, default to the Andy Griffith show)
if (!search){
    search = "show"
}

if (!term) {
    term = "The Andy Griffith Show"
}