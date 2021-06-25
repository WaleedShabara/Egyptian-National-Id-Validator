export class NationalIdValidator
{
    public validateNid(nid:string):boolean{
        var pattern = /^(2|3)[0-9][0-9][0-1][0-9][0-3][0-9](01|02|03|04|05|06|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)\d\d\d\d\d$/;
        var result = pattern.test(nid);
        if (result) {
            for (var a = nid.substring(13, 14), n = nid.substring(0, 13), i = 0, u = n.length - 1, l = 2; u >= 0;) 8 == l && (l = 2), i += l * parseInt(n.substring(u, u + 1)), u -= 1, l += 1;
            var f = 11 - (i%11);
            if (f > 9) { (f -= 10) };
            result = (parseInt(a) == f)
            }
        return result;
    }
}