function helpExecutor()
{
    console.log(`1. node mycli.js<dir-name> view -- tree
                     2. node mycli.js<dir-name> view -- flat
                     3. node mycli.js<dir-name> organise
                     4. node mycli.js help`);
}

module.exports = {
            helpFn : helpExecutor   }