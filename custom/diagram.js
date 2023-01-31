function prepareLine(from, to, line) {
    var fT = from.offsetTop + from.offsetHeight / 2;
    var tT = to.offsetTop + to.offsetHeight / 2;
    var fL = from.offsetLeft + from.offsetWidth / 2;
    var tL = to.offsetLeft + to.offsetWidth / 2;

    var CA = Math.abs(tT - fT);
    var CO = Math.abs(tL - fL);
    var H = Math.sqrt(CA * CA + CO * CO);
    var ANG = 180 / Math.PI * Math.acos(CA / H);

    if (tT > fT) {
        var top = (tT - fT) / 2 + fT;
    } else {
        var top = (fT - tT) / 2 + tT;
    }
    if (tL > fL) {
        var left = (tL - fL) / 2 + fL;
    } else {
        var left = (fL - tL) / 2 + tL;
    }

    if ((fT < tT && fL < tL) || (tT < fT && tL < fL) || (fT > tT && fL > tL) || (tT > fT && tL > fL)) {
        ANG *= -1;
    }
    top -= H / 2;

    line.style["-webkit-transform"] = 'rotate(' + ANG + 'deg)';
    line.style["-moz-transform"] = 'rotate(' + ANG + 'deg)';
    line.style["-ms-transform"] = 'rotate(' + ANG + 'deg)';
    line.style["-o-transform"] = 'rotate(' + ANG + 'deg)';
    line.style["-transform"] = 'rotate(' + ANG + 'deg)';
    line.style.top = top + 'px';
    line.style.left = left + 'px';
    line.style.height = H + 'px';
}

function dnfDiagramInit() {
    $('.dnf-diagram-line').each(function() {
        var connections = this.id.split("_");
        prepareLine($('#' + connections[0])[0], $('#' + connections[1])[0], this);
    });
}

function packageManagerDiagramInit() {
    pkgMgrLines = [];
    
    $('.pkg-mgr-diagram-line').each(function() {
        var connections = this.id.split("_");
        var dashed = this.classList.contains('pkg-mgr-diagram-dash-line');
        var pkgMgrLine = new LeaderLine($('#' + connections[0])[0], $('#' + connections[1])[0], 
        {
            color: 'rgba(0, 0, 0, 0.527)', 
            size: 8, 
            hide: true,
            path: dashed ? 'fluid' : 'straight',
            dash: dashed
        });
        pkgMgrLines.push(pkgMgrLine);
    });

    pkgMgrLines.forEach(line => {
        line.show('draw', {
            duration: 1000,
            timing: [0.58, 0, 0.42, 1]
        });
    });
}