///<reference path="../globals.ts" />
///<reference path="../host/control.ts" />
///<reference path="../os/shell.ts"/>
/**
 * Created by jarettmiller on 10/19/15.
 */
var TSOS;
(function (TSOS) {
    var MemManager = (function () {
        function MemManager(memBlock, blockBases, blockLimits) {
            if (memBlock === void 0) { memBlock = 0; }
            if (blockBases === void 0) { blockBases = [0, 256, 512]; }
            if (blockLimits === void 0) { blockLimits = [256, 512.768]; }
            this.memBlock = memBlock;
            this.blockBases = blockBases;
            this.blockLimits = blockLimits;
        }
        MemManager.prototype.loadInputProg = function (prog) {
            var insertToMem;
            var memIndex = 0;
            for (var i = 0; i < prog.length; i++) {
                insertToMem = prog.slice(i, i + 2);
                _Memory.mem[memIndex] = insertToMem;
                _Kernel.krnTrace("Program: " + prog + "Inserted memory at: " + memIndex);
                i++;
                memIndex++;
            }
            _PCB = new TSOS.PCB();
            _PCB.init();
            _StdOut.putText("Progam Loaded To memory, Pid = " + _PCB.PiD);
            _OsShell.pid++;
            TSOS.Control.editMemoryTbl();
        };
        return MemManager;
    })();
    TSOS.MemManager = MemManager;
})(TSOS || (TSOS = {}));
