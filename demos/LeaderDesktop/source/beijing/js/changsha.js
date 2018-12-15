(function (root, factory) {if (typeof define === 'function' && define.amd) {define(['exports', 'echarts.js'], factory);} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {factory(exports, require('echarts'));} else {factory({}, root.echarts);}}(this, function (exports, echarts) {var log = function (msg) {if (typeof console !== 'undefined') {console && console.error && console.error(msg);}};if (!echarts) {log('ECharts is not Loaded');return;}if (!echarts.registerMap) {log('ECharts Map is not loaded');return;}echarts.registerMap('changsha', {"type":"FeatureCollection","features":[{"type":"Feature","id":"430104","properties":{"name":"岳麓区","cp":[112.911591,28.213044],"childNum":1},"geometry":{"type":"Polygon","coordinates":["@@@AMEOCUBE@G@IAKMF@D@BA@ABABAB@BAB@BAB@BABCBABCBA@C@CAE@CDC@G@E@A@AFCHABABCDCBABEBCBCBC@ABA@@B@B@BBBB@@B@DBB@D@D@B@@@@@DIBKASIIIMEGBKFEFGHEFAFJJFFFH@NEP@@@@@B@@@@@BSZ@HBJDJFJPJXFHDBH@FAFHHLBZD@@D@NDJHNJFFTANGHCH@F@LF@@BBB@BBBB@@JFDENiB_I"],"encodeOffsets":[[115679,28873]]}},{"type":"Feature","id":"430105","properties":{"name":"开福区","cp":[112.985525,28.201336],"childNum":1},"geometry":{"type":"Polygon","coordinates":["@@VOFEREPAR@P@N@JCFEHMZKNGL@LDHAFC@AAA@@@@A@@A@@@@@A@@@@B@BA@@BA@A@A@@AA@AA@AA@@CB@@@@A@@A@@@A@@@@@A@@BA@@@@@CAA@@AA@A@@@@@A@@@@@@AA@@A@@@A@@@A@@A@@@A@@A@@A@@@A@@@A@@@A@@@AA@@AA@@AA@@@AACAA@AA@@A@@@A@@@A@@@AA@@@A@@@@@AB@@@@A@@@A@@@@@A@@@@B@@A@@B@@@BA@@BA@A@@@@@@@@A@@@@@@@AA@@A@@@A@@A@@@@@A@@BA@@@A@A@@@@@A@@@A@@@@@AA@@@@@@@@@AB@@@B@B@@@@A@@@@AA@@A@@@@@A@@BAB@BA@AB@@@@@BA@@@@B@@A@@@@@A@@@@@A@@A@@@@AA@@A@@A@@A@@A@@@AB@@A@AAA@@@AA@A@@AAEAC@C@AACACACCAEACCECEAECCAE@EJGBABADA@CBAB@B@B@B@B@BBFBDBB@BBBAB@@AAE@C@A@A@@@AB@FABA@@@ABA@C@A@C@CAC@AAE@@@@@@@AAA@A@A@ABE@@WKIAOBIBGBIAKAAAC@AB@BABEA@@ACAA@@AAA@@A@@@@@A@@@@B@BAB@@A@@@@BA@@@@@@@@@@@@B@B@@@@@@@B@@AA@@@@@AA@@@@B@@A@@@@@@@AA@C@AAA@A@A@ABA@A@C@@@A@AAA@@A@@@@@@@A@@@@@AA@@@@A@A@@@@@A@@@AC@C@C@@B@@@@C@A@@@A@@@@BA@@@@@@@A@@@@@A@CBA@@E@C@AKBA@A@A@JA`MjCFABAHCDS^UXYXSTCBEFCFA@ZNpNNFBD@DFLDJ@D@D@B@D@B@B@BBB@@D@D@B@DBBBFDDBD@DBDBDB@@@B@B@B@B@B@@"],"encodeOffsets":[[115690,29073]]}},{"type":"Feature","id":"430102","properties":{"name":"芙蓉区","cp":[112.988094,28.193106],"childNum":1},"geometry":{"type":"Polygon","coordinates":["@@BGBCB@BAB@D@HAD@B@F@TCNAHAFADADAFADABABA@ABA@A@ABAAC@AACAAAA@A@@@C@A@A@C@ABEA@A@GAKGGC@@GCG@E@G@EBIFGFOLCBIF@@@@@A@@AA@@@@@BA@@@@@A@@A@@@@@@@A@@A@AA@@@@AA@@@AA@C@C@A@C@C@A@C@A@A@E@C@IB@@@@@@@@@@@@A@C@A@I@C@I@C@C@@@@@A@AB@@@@A@@@@@@@C@A@C@E@A@A@@@A@@@@@@@@@@@@@@@A@A@ABA@@@A@AA@@A@@@@@@@@@@@A@@@C@A@@B@@@@@@@B@B@B@@@@@@@B@B@F@B@D@FB@DAB@@@@@B@@@@@@@B@@A@@B@@@B@D@@@@@@AD@D@D@@B@@@B@@@@@B@B@@B@@B@@@@@B@@@@@@@BB@BBB@@@D@B@B@BAB@B@B@BBD@B@@B@@@@@@@BA@@@@@BB@@@@B@@BA@@@@@@@A@A@@@@@@@@@@@@@AB@@@@@BA@ABA@@@@@@B@@@@@BB@BB@@BBBD@@FBBA@ABAD@BBLBJBHAJAPAJBXL"],"encodeOffsets":[[115771,28901]]}},{"type":"Feature","id":"430103","properties":{"name":"天心区","cp":[112.97307,28.192375],"childNum":1},"geometry":{"type":"Polygon","coordinates":["@@@E@A@A@@@@@@@A@A@A@@@@@@@AB@D@@@B@@@@@@@@@@@B@@@BBB@@@B@BAB@B@@@@@@@@@@@@C@A@A@A@A@AAA@A@C@A@@AC@C@A@A@A@AB@@A@A@A@@@E@AAA@AA@@A@@@@@CBA@C@A@C@@@ABA@C@A@@@@@@BBB@B@BB@@BBB@B@@@B@@A@@BA@A@AB@@ABADCBA@@BA@@BA@CBA@ABA@@BC@@@ABA@A@A@@BA@A@@@@@@@AA@@@A@A@CBA@@A@@@ADAB@@A@CAIAACC@AAC@E@A@OBKBC@@@@BEFIFSDDDBB@B@B@B@BABAB@BADCDCDCB@DEF@BBBA@AAABABAAC@ABABCAADACCA@FCAECAAC@AC@AAA@@AC@DAACCA@@@AAACAAAE@GB@AB@BA@C@ABA@E@AD@DADE@CDGFEFADFBE@C@AHBHDCACGCCCEEC@@AA@CDIDEDE@A@E@ACAC@A@ABABAB@DBBBBBBABABEBC@AAA@@A@A@ABADC@AAACEAAC@AAEBA@CAA@EGCCA@CAKLABIHQLSLOLCDABCZ_rCDQXCFAFCRAXBVFLNLTVJNDLBL@J@HAFDVFPN@BB@B@B@LA"],"encodeOffsets":[[115688,28872]]}},{"type":"Feature","id":"430111","properties":{"name":"雨花区","cp":[113.016337,28.109937],"childNum":1},"geometry":{"type":"Polygon","coordinates":["@@B@@@B@BABC@@FIBC@A@@@@@A@A@AA@CAA@C@EBGDEBG@CAGACCGEEEEGAGAGAI@GBGDEDELIBGFQDCXYBAZQB@RAVHBANANAH@LMBCFCFGJKDM@AAAACBCRBDEBABCCG@GAE@EBE@E@E@A@ECECECCCCA@C@CAC@CAAAAAAAAC@C@ABAHEBA@A@@A@A@@A@A@@@A@@@@AAA@A@A@ABA@@BA@@@@@B@@BB@@@@BA@@BA@@@@@@@@@A@@@@@@@@A@AAA@@A@CCEAEAA@AA@@@CBABA@A@CACAA@CB@BABA@CBA@C@@BABAD@BCBA@C@ACACAA@AAACACAECCAAG@EAC@AAA@@ABABCBCAAAAAAC@C@AAAA@A@A@ADABA@CACBCB@BAD@DA@A@@@AAA@AAA@C@C@A@CAC@AA@EAC@E@CBC@ABCBADAB@B@BABABCDCBAD@BABADADA@A@C@C@ABCBABCBCDCDCDCFCB@DABBDBD@DBDBFBD@D@@@BA@A@CACACBA@ABAB@B@B@@CBCAABA@AB@@@B@BBBBB@BBBD@BDFBDDDDFFBDBB@BABABADAD@BEDGHGHADADEBGAiEKA@@GCGA@B@DAFCEEBEFCH@DCFCBC@@B@FAB@B@DABA@@BHAF@BBDBBB@B@@DBBDCBD@@BB@BBD@@BBDDBBFEDB@DDCBBBADAB@BBDABABBB@BABAAE@CFA@CDCDCDABA@ABABA@A@A@A@CACCETEJAF@@@@ADAL@P@B@FBD@BDDBBBJ@D@BA@CB@B@@@BB@DAB@B@@@B@@B@@@@@@@BAB@@@B@BAB@B@@AD@@AB@BAB@DAB@@AB@@ABCDAB@BA@@B@BAB@@@BA@@@A@A@AA@@AAA@A@AA@@@@@@@B@DAB@B@@@D@B@DAB@D@@@@@BB@@BBB@B@F@@@B@B@BA@@B@B@B@B@DBD@@@B@D@BBB@B@B@B@B@B@D@@@@@@@@@@@@B@@@B@B@F@D@B@D@@@@@@@B@@@@@BAB@@@@@D@D@J@D@J@B@D@B@@@@@@@@@@@@@JAD@F@B@B@D@B@D@D@B@D@D@B@@B@@BB@@@@BBB@@@@B@@@@@@@BB@@@@@B@@A@@@@BB@@@B@@@@JEDAPKHEJEFAH@F@H@HD@@HDLHHBB@B@"],"encodeOffsets":[[115822,28859]]}},{"type":"Feature","id":"430112","properties":{"name":"望城区","cp":[112.819549,28.347458],"childNum":2},"geometry":{"type":"MultiPolygon","coordinates":[["@@@E@@@A@C@A@C@AAA@CCAAC@A@C@A@ABCBA@ABA@A@@AA@AA@AA@AC@AACA@AAA@AAC@A@AAAAA@AA@CACA@AA@@CBABADCFEDCBADADAFAFBB@B@BABA@ABABAD@@@B@F@HDFBJDJDDBLFFB@BBBBFBBDFDBDBDDDBD@D@B@D@BAD@BADCDADABA@@@A@@@A@AAA@@AAAAA@A@A@A@C@A@CAC@A@C@CA@AA@AC@AAA@A@A@A@@AAAAAAAG@KAQ@CBCBA@A@EAIEGGEIIEEEAAAA@A@C@A@C@@@C@A@AAA@@@AB@@A@A@CCACEA@A@AB@@@@AB@B@BAB@@ABA@CBCAA@ACAECAAA@EBAAA@A@@@@A@A@A@A@A@@CACACAC@CAECAACAA@C@C@@@AA@A@A@A@C@A@C@CCIEK@CACMEoMYMB@DEFEDATSZWVWT]DCBGBAIE@@AAAAA@AA@@KEE@G@GDMHSBEEMIIGMCC@@@YCKAGGBE@EAGGCWEOIEICIAI@GTY@A@@@@@A@@@@FO@MEGEEIIBEFEHGFELEHANFJJTJLBJA@C@@@@@A@C@CAA@C@AA@AA@A@A@AB@BAD@DADAFABADADCBABADGBEB@F@H@D@DCF@DBD@B@DABADABA@ABA@ABA@ABABABAB@@A@CNECKIMSUMKEKAUBWDQBEDERWDC`qDYBA@@A@@@A@@@ABCBCBADEFCHCHABCFEDABCBA@CAECAA@@BC@ABCBC@C@CAEACAACCCCAA@A@@@AB@HBD@D@B@@ABABABC@A@A@A@AAA@AC@@@@@@FAD@@A@@AAAE@GACC@@@AB@BAD@@@@CAAGCA@C@@@CDA@ABC@C@ACCACACCAAA@A@AB@BADADCBABC@E@CAAAAAACA@C@A@@BAB@@@BAB@BBBBBBDBBDBBDDD@BBD@@BDADA@C@A@A@ACA@CAC@C@@B@@BBFDADCFCBCB@@ABA@C@@AAAA@CA@@AABAB@D@BAB@@@BA@AAE@CCAACCAC@CAA@C@C@C@@B@@@B@BBD@BBF@B@B@FAD@DABADCDEPADCDADA@A@AAA@CAC@E@EDCDA@AB@D@BBDBH@D@BADABABEBCDGPGJADAB@B@DBD@BBBBD@DCBA@AACAA@CAABC@A@A@E@OBG@CDE@EBC@AA@@ADADABABABABA@CBCBCBCBCBADABA@ABA@A@A@CAA@ECECECA@CACAI@w@IBGBEBCBCBAD@BAB@BABABABCBA@IBMBGBCBABAB@DABCBABABA@CBC@A@A@@BAB@B@D@B@BABC@ABC@CAC@EAE@KAM@C@E@C@@BAB@@@B@D@B@DCBAD@B@B@BBB@@BBB@DBDBHBFDD@@BBDBB@F@FBH@D@BBD@BBDBF@BAF@FADAFCDAB@@@@BBB@@BB@B@BBB@B@B@BB@B@BBDDH@D@DBBBBBBBBDBDBDBDBD@DBB@BBBBBBBBBBDBDBDBDBD@B@D@B@B@BADAB@DABBB@BBDBFFBFBD@@BBDBDB@@BBD@BBBDDBBBBBBB@B@B@BABABCDCDCD@BAB@B@B@BDB@BBB@BDBDLADADCD@F@HAD@F@D@BBB@BBBB@BBB@D@FBHBDBBDB@@BA@A@ECA@ABAB@@DBF@HDB@@B@B@D@D@BAB@@ABCBCBABAB@@AB@DABAFABAB@B@BBBB@BBB@B@@BBB@@AB@BA@AB@BAB@@@DB@BBDBDBDBBD@B@@AD@B@BB@B@DBB@B@@BA@ABADABEHCFCFEDADEDABAB@BAHADBFBDDBF@FBFDDBDBDBFB@BDD@BAB@D@DAB@BABA@C@ICE@@@A@ABC@ABA@C@CAC@A@AB@BA@@BBB@@DDBBDDBB@D@B@BABA@CBE@E@E@CBA@CBABA@ABCDAD@BAD@D@D@DBBBBBD@BBB@@AB@@AD@BABABC@GDODCDCBAB@B@B@B@D@DBD@FBDBDBDBBBDDHFHFDB@DBLDDD@@@BADGFCDMJWDEDBBBB@BBFBFHPNVDHBDB@DBDBDFBB@@B@F@@BDABAB@NCJCNKHCFCL@D@DCHAH@JBJBHBB@AH@DBB@@D@B@HBBLFLFFNLLPHFVJRHTDD@@AB@A@@CECCGGECGIGAAA@ACAEBCAA@CBA@A@ABABCBABA@ABAD@BAD@D@D@D@D@B@DBB@BBBFBDBBBB@@D@BBB@B@D@@AB@@A@A@ABA@AAEAC@E@A@A@ABA@@D@B@B@DBB@D@BAF@DAB@L@HBDBD@B@B@FCDABAB@DAB@@A@C@AB@@AD@BAB@FA@@BB@B@D@BAF@DAFAD@D@BBBBBB@D@B@F@F@FBFBBDB@BB@@B@BA@ABABA@ABADABAB@D@D@J@B@F@FBDDD@D@B@B@BAB@BAFAFEHGBABAD@BBDBDDFDBBD@D@DBB@DBDBDBDBDBD@F@FABBFBDD"],["@@BAD@D@BAD@DADADCDADCDC@@FCDCAGCECGAAC@G@CAE@A@AB@F@D@DCDABC@AAC@EBADC@C@C@AAC@ADABAB@@AB@BBB@@BBB@B@B@B@B@@@@D@D@DBBB@B@@@DCBAB@BAB@BBBBBF"]],"encodeOffsets":[[[115691,29209]],[[115492,28725]]]}},{"type":"Feature","id":"430121","properties":{"name":"长沙县","cp":[113.080098,28.237888],"childNum":1},"geometry":{"type":"Polygon","coordinates":["@@CFAH@HBJBHBHFHFFHFDDHBDBH@FAHCFAD@B@DBB@@B@B@B@@@@@BADEJ@@ADABA@@@A@AF@B@D@B@B@D@@@BBBBBBD@BBDAB@B@BAB@BABABCBEBCBCBEBGBMBSDE@A@C@GBC@A@ABA@ADAH@@AF@B@B@BBB@B@@@@@@BF@BBD@D@D@B@DAB@B@@ABEBA@@B@@@B@B@DBF@BA@ABAAA@CAEAAAA@A@A@A@A@AB@DCBABABIH@FBFDDBFDFDFBDBFDDDBDBBBD@D@FBBB@@@BBB@@B@BBB@@@BA@@B@@@@BB@@@@BB@@B@@B@@@@B@@@@@B@@@@@BA@@@@@AB@@@@A@@BABA@AB@@@B@@@@@BB@@B@@B@@@@@@A@A@@BA@@@@@@@@B@@B@@@@@B@@@B@@@@@B@B@@AB@@@B@@@@@BB@@@B@@@BB@@@@@@B@@@@@@@@@@BAB@@AB@@A@@@@BA@@@@@@B@@@@@B@@@B@@A@@B@@@@@B@@BB@@B@@@B@@@B@@@BBB@DBBB@@B@@BB@@BB@@B@@@B@@@B@@@B@@@BB@@@@B@@@BB@@@B@@@B@@@BB@@@@@@@B@@@@@BBB@@BB@D@@@@AB@@@B@@@@@B@@@BB@@@@@DA@@BBB@@BBB@@@B@BAB@@ABA@@@@@@B@@@@@BB@@@@@BB@BEDGBKCK@MHYLGNEFIDM@O@Q@OBQFEFUPB@B@BBFAB@BBFDDB@BBBAD@DAB@BA@ABA@A@@B@@A@@B@BFBBDDDB@B@@@BA@@B@BBB@D@@@D@B@D@B@B@BBFBFFJJHFFHBJ@F@BABAD@DBR@LBHBBBBBB@@@B@B@BBB@BBDB@@BDBD@B@D@DBB@D@B@B@B@B@BBBB@@BB@B@B@@@B@@ABCBCBCDABFDFFFFBDDDBDBBDBBBFBBBDDBFBD@BBH@DBDBDDBBDD@B@D@BABAFEFG@CBA@C@C@ADADAFBDBBBB@@@D@BABAD@@ABA@ADCJADAFABBDBD@D@D@FAD@DA@@BC@CBCAC@C@E@@AA@A@AAE@AAE@CBCB@BAB@B@D@BBD@D@D@D@B@FAD@DADBFBDBBDBBDBD@BBDBDB@@BB@BBB@@@B@DAD@BBD@B@BB@B@B@BBBB@BBB@D@BB@BBD@BBDBB@@BBB@B@@ADABAB@B@DBF@HBL@DBDBDBDBBFJDDBBAF@DADBDB@BBBBDBBBBB@BABABAFADADADA@A@ABEACBA@AB@BAB@BBDDDBFDD@DADCFAHCHAD@B@BBBBBBBD@FBD@DBBBBDBB@BB@F@BBB@BDDDDBFDDDDB@B@D@DAFAH@BADBB@BBBB@BBDBD@BBFBDBDBDBD@DBBB@D@B@DAF@D@B@B@HB@DAB@B@DCBADC@ABA@C@CDCBCBA@@AAAA@AAA@AB@BA@ABABADC@C@ED@BAD@BAD@B@BBBBBBBB@@D@B@D@D@D@B@BBB@BB@DBDB@BBB@B@DBDAD@DADAB@HABAN@LAFCDABABAAG@C@C@ABABCBAD@@@B@D@B@PFDBLAF@HCD@D@@B@@D@FDFHBD@LDDDD@@DDHFDBHDDBDBD@F@PEJEHEFCFAFAB@@@B@D@HBHBDBBBB@BA@A@A@A@CAC@EAE@@AC@@@AA@A@C@A@@AAC@ABC@ADC@A@A@AA@AAAAAA@CAMAI@EBABBB@BBBA@@B@BA@CBCBE@ABAB@@@BB@B@B@DBDBDBB@B@@BBH@H@F@B@B@@BBBBB@BB@B@BA@ABAB@B@DA@@DBBBBDDDBBB@B@B@@AB@DCDCFCDEDC@CBAAA@A@A@@BABABAD@DCJCFAFADCDABABA@ABCBABC@ABC@C@EBGBE@CBA@CBABCBAAGBGAC@CACACCCCA@CECCAE@CBEAGCE@EAC@CABA@E@CACCAC@C@E@A@CAACCAE@GAIAG@EAEBABAD@DCAACAGAGACAACACAGAEAC@EAGAAAAA@CBABCBABABE@G@C@C@AACEAEAEAG@GAC@CACAICIAC@C@ECCCCCACBGAA@CAAACE@CAG@AE@C@ACCC@C@E@CACAACGCEAACCCCAAAAC@E@CBCBIDGFMDMBIBG@C@C@CAECAEAAC@C@CBE@EBEBEBA@C@CAECAAE@AAC@EAC@E@E@CAAAACAAAACDCBC@A@CECEEGEC@CDABCAAA@A@C@AACCACCCAAE@EACAAAC@E@@@C@C@GAEACACACCACAE@ACDE@CCAEE@AAE@CACGEICGACA@AA@@@@@@A@CBEBAHIHIDEBABE@CACAAACBCDGBCBAD@B@BA@CBABCBEDC@CB@@AD@BBB@BDB@BBFBFDFBDBD@DBDBD@FBDBD@HFHDDBDBBBFA@C@AAEBABAD@BBBBBDDDF@F@D@DDBDBBBBD@DCDAB@DABC@AAE@CCACAAAC@C@CACGAC@EAEACCE@CDAFBDCDEFEBC@ACEEC@AAA@CFABDFDDBFBFDHDJBJDHBJBDBF@DBDCBA@E@CDCDADCB@FEF@F@HBF@DADA@CAAEEGECAEEGGCCICGCCA@CCCCAIACACACACCCAEAACAAACCCCACAEACAACAA@E@CACCAAACACAAECECCECCCCAGCGEEAEACBCBAAAEAECAA@C@IBG@C@AACCAAAC@CBABCDEDCDCFAD@DABACEEACAE@EAC@EBABCBAFDDBD@D@BABABE@C@IBK@EBGDGDIFYLEDIJGJCFABC@A@AAACCCAEAC@C@ABCJC@A@A@CAACCEAC@A@CB@BCJ@BABABC@C@E@KEEEGIAAA@A@ABELABABA@G@E@IAQAADBDBB@BCNILEHEDADKNG@MBMBABUGQBA@YRABWZCDERAHKJCF"],"encodeOffsets":[[115792,28810]]}},{"type":"Feature","id":"430124","properties":{"name":"宁乡县","cp":[112.553182,28.253928],"childNum":1},"geometry":{"type":"Polygon","coordinates":["@@@BEBCFIFEDED@BCHAHADCJADCDC@C@C@EAEEGECACACBCDCDCBI@A@AAEAAAC@E@C@AAEAEACA@AAC@E@AABCBA@CACCACAA@A@CACACAADCBA@C@CAC@ABABCBCBCAAAAAAACACAC@C@AACC@A@GBC@A@AA@A@A@C@AB@@AB@D@D@B@DBB@BAB@@ABCBA@@B@D@B@@@@AAGCMAA@E@C@ABA@AAA@C@C@EAA@@A@@@@H@D@BA@ABA@AA@ADI@@AAABCD@BA@CAAAAAC@EAC@CA@BAB@BA@@@C@C@@BADAB@@C@EAE@ABABABC@IACAA@CA@@CAA@C@AAAA@C@A@@GCAACAC@C@C@A@CBEHABA@CBC@EACAKEAAA@C@ABCDAJABAFAB@@CBGAE@C@CACAEA]GQEAACAA@C@A@C@@@ABABA@A@A@A@C@ABA@ABA@C@G@EAE@A@CAA@AB@B@BAB@B@BAB@BABABA@A@A@A@@AAA@@@ABCBA@AAA@@AAA@@AAAACAAAA@@AA@AA@AAA@A@ABCD@BABABC@A@A@A@@B@BA@@@AB@B@BBF@B@BABA@@@AAAAAAAA@@AA@A@C@A@ACGCGKKACBE@CACA@C@ABGDA@@AA@@CBGAA@@A@ABABA@CAECECCCACAC@CDCDC@A@AA@EACA@@AAA@@C@CCAAAE@@@C@CBAAA@CACAA@@DABBD@BABA@GBAACAKQAAACAA@ACAC@A@EAEAEAC@C@C@C@C@@@ABABABCJAF@DCDEBEBSJG@@BA@A@CBABABABA@AACAA@A@ABABA@AACG@AA@A@AAA@AA@@AAABEBA@C@A@@@AA@CAA@@AAA@A@BH@BABA@AAA@AAAAA@A@C@CAAAACAAAAA@AB@BAB@@A@A@AAA@C@@@ABC@C@EA@BAD@D@D@DADADCFAFAFAFAL@FADABAFABADADADCBA@CBC@ABA@ADABADCBABC@CBABABAB@B@BADABAFADABADAFCDABABCBCBEBEBCBA@A@CAA@AAACCCCCCEECECEAGACAC@A@A@CBCBABCDABAB@D@B@BBBBDBBBD@BBFDDBB@@@DBBABGDID@@ADCB@BBDBDBD@B@D@BBB@BB@DB@@DDDBB@B@DBDBBB@B@BADABABADABAB@D@B@B@D@BDFBD@D@BDDDDDBBBBDBDBBDBDBDBB@@BABA@C@CBABADABAB@B@B@B@BCBABABB@BB@BEFEFABEDGD@BADCD@B@BB@FD@B@@@BDHDJDFDDFDFDFDFDDBDDDBDDDD@BBB@D@D@B@D@BCH@D@D@BDB@BBF@D@D@FAF@DBBBBD@D@BBDBBDBDBF@BABABA@ABABA@@B@B@@@B@@B@F@D@B@DDBBBDBBB@B@D@BABBBBBDDB@BB@@BAJBDBFDDDBF@DBBB@@@BDBBB@@@D@BB@DBHBDB@BBBD@H@L@H@F@DBDBBB@BAB@BCBAD@D@B@BBFDDBDB@DBFBDBD@DBD@B@BBBBDBDBD@D@D@HBFAD@BBDBDADAB@@@D@BDBBD@B@D@DAB@BBBBD@D@D@DBBBB@DBDBDDB@@B@D@D@B@@BBDADADAD@D@B@DBBBBDBBB@D@BAB@B@B@HBHDD@D@BAFEBADAD@L@HBD@DADCDA@CBC@CBABCHALGHADADAD@HADABCBCFGDAFAD@HAD@DBBADAD@DBBBDB@@HFB@BBHAF@DA@ADAB@@@FADABABA@CBCBA@G@CDC@C@@DAB@DAB@BA@A@@BA@ABADBDDBB@DBBDFHDDDBF@B@BDFBDB@B@D@BBBBB@B@B@B@BBBB@BDB@B@BDBB@DDBDBBB@D@B@BB@@A@@B@DBBBBB@DB@BDAD@DC@ADEBAB@B@HJB@BB@D@BBD@@DDBBHBB@J@D@B@D@D@BB@D@FAFADCDAJ@BAD@B@@BBD@D@DAF@FBF@FCDAFCBABABADABAB@F@D@DBB@DB@BB@BF@B@B@@@BEAEAE@A@@@AB@@@BBB@@ABCDAB@BBBBBD@H@HCHADAD@BADABAD@FBDBBDDB@F@DB@BBB@BA@CBCDAD@D@F@DBBBBB@BBBD@B@D@@BBDBBB@B@B@@EBAB@B@BDDDDDDBFBDBBB@B@DABAD@B@D@@BBDA@ABABAD@DBBDDFBDBB@@BABCAC@CBAD@B@DBBB@BBB@BBBB@B@DBD@D@BABAB@BAB@BAD@@BD@DAFADBDD@BB@@BB@B@@@BA@@BABCBAHABAFCD@DBDDDBD@F@D@DA@@DD@D@DADAFCF@B@BB@DADEBC@A@@B@D@DBFBFDF@F@FB@@B@DBBBDDDBDBBBB@B@BAB@@@@A@A@AAAAACA@A@@BAB@B@B@DAB@D@BAB@BAFABAB@D@BBBBBBBBDFDBB@B@@@B@B@F@DCB@BB@BABABCDCBCB@@AB@@@B@D@B@BAD@DAD@BDBD@FDDBBBDBBD@DBB@F@D@F@D@D@BBBBBBBBBB@@B@B@D@BAD@D@B@DBF@BBFBD@LBDBDD@HBFDBD@FBH@BBB@@BBDBDBFBFBHD@BB@@@@BB@@BJRLTBB@@BRBP@BB@@B@F@BF@B@J@D@DBHHNPJJFCXCNIDCHEBC@A@@CCKCCAA@ECEGCGACAAACACAC@EAC@C@C@A@A@ABADADCPCHCD@BABA@ABC@@BA@@AA@AACAAAA@C@C@CBC@ABCDCBAB@BADAB@DAF@F@F@DAB@BA@A@A@CAACCAACC@@AA@AB@@ABAB@D@DBD@B@BAD@BAB@@@F@JDD@B@BA@ABA@C@CBA@ACC@AEACACACAECEAE@CAACAEBCBG@ABABAFCBCFCDEDEFGBABCBAB@@AA@A@CAA@A@@A@ABC@@@AACCACACAAAA@@C@@BA@ABAB@@ABA@@AA@AA@A@AAA@AA@A@ABABABEBA@CBA@@BABADADABA@@BA@A@C@C@A@AA@GCE@CA@@BABAB@FDB@B@@AA@ACCAGAEAC@A@AAA@AA@AAA@A@C@EBC@G@EDCBCBCCKCA@AAA@ACA@A@A@ABA@ADCDCDCBABA@A@A@AAAAAAACAACAAC@AA@@CACAAA@@ACAEEECAAAA@AACBA@CBABA@A@C@A@C@CACACACAAAAAAAAAAAA@CAC@CACACACAAAAAAAAA@C@CCGAC@A@AAAA@A@A@AAA@A@@AA@AA@@@@BADCBEBC@EBE@AAEAC@AAC@A@CAG@E@EAAAC@AC@ECGACACAA@AA@@AA@A@A@ABCDA@C@A@C@A@@BA@AD@F@D@N@LBF@FBD@DBD@BAD@BA@A@A@C@ABA@AB@B@D@DAB@BABADABA@CBABADAHANAJAB@DABABABA@ABA@ABCDADAFAHAJAx@J@DBDBB@FDFDFDB@DBB@B@B@BAB@BABCDADADADADAB@BABABABABCBCA@@A@A@A@A@AAEAC@CFGFGDCAEAAAAA@ABA@ABCD@@A@A@AA@C@C@C@@A@A@A@A@A@AA@@AA@ABA@@BABABCD@@A@A@A@CLGDCBCAAGEE@EC@@AE@C@E@EAAAAAAC@@A@CBCBC@C@C@AAC@CAAAAACAAAC@C@CACAC@ABA@A@A@CACACCCCCACCEEECECC@C@CBA@EAA@C@CAC@A@@AAAACAI@A@AB@@AA@AAAAC@A@A@@BADABA@@@AAAAAI@EAC@C@G@C@ABKLAB@@A@AAC@@@E@CAE@E@EAE@C@A@@BBBB@BBBBBBB@@B@@ABC@CBCBCBCBABCBABCBC@EBCB@BCDABABA@C@E@CAAC@AACACCCAAAACC@A@@EI@A@ABAFCBAB@B@DFBA@@BC@A@C@A@CBCBE@CBABABC@A@A@AAAC@AC@A@C@C@C@CACACAA@@C@C@CAE@E@E@ABABAB@B@BAD@B@DAB@BABADABCBABEDCBC@C@C@C@ABAB@B@DBBBBBB@BA@CBCB@@@BAD@F@D@@ABA@@@AAA@@AABA@ABAD@BABBB@B@BABABADAB@@AD@B@B@D@DDDBD@BBDBB@B@B@B@BAB@BABCBCBEBCDE@A@A@C@A@C@ABA@AB@@AB@BBB@B@B@BAB@BC@A@CBABA@ABAD@B@BAD@DABABA@AA@AACACAAA@AACAC@CBA@A@ABCBC@C@C@@@ABAB@BABAB@@@DAB@B@F@DAD@D@@ABCBA@EACBE@C@C@A@AAA@C@A@@BAB@@BB@@ABADAD@DAF@F@DBDBD@@@BBBD@FB@@@@@BABCBCDGDABA@CBCD"],"encodeOffsets":[[115202,28702]]}},{"type":"Feature","id":"430181","properties":{"name":"浏阳市","cp":[113.633301,28.141112],"childNum":1},"geometry":{"type":"Polygon","coordinates":["@@BCBABCBCDABABABADE@@DADADADAD@F@D@FBD@DAFABABCD@BBD@BBD@D@D@DABCBGBE@GDABCBADAB@DEBCDCDCBCF@DADABCDCDADAHADAF@FADBF@FBD@FBB@DADADCBADADABADCDABAFABAF@BABC@C@C@E@E@EACACCCGCECCAC@C@CC@CACACCACAAACAAA@CAGAAAAECC@C@C@G@CACABCF@F@FAD@DAD@DBFAD@DCFCHEDEDEDEDG@ADCBC@ABA@CFAD@D@B@DABCBA@ADCBDDBDBDABAD@F@DAF@D@D@F@BADABC@E@K@ADCBC@C@AAEEACCECACBCBAJEDCDCBC@CCCA@EBCA@CAACCACAAAA@C@ABCDEBEDABABC@C@A@AACCACCCAEAC@AAACCACAE@ACACC@CC@ECACACAAAAACCGAC@E@C@CACCE@C@CA@AAEACBEDC@AACBC@C@EECA@C@CAC@EBA@AEAG@CBECC@C@A@ACAABCBGBABC@E@C@MEECCBC@A@C@CACAAA@A@CBC@CACCACCAACCCAKE@AAGAAACCCCA@AAECACCEAACCCCAEA@CACBCBE@CAC@C@CBA@CAACCC@C@K@C@AAE@EAE@CC@AAAEAC@ECGAE@K@GAEBA@ADADCBC@CAAAEAA@E@EBC@ECC@C@E@EBEBGBAAAEEIAAIAA@C@E@CAAC@EBA@@BEBCDEDEJADA@IB@@A@@@@@AB@@A@@@@@AAA@A@@@A@A@@@@@I@CBABA@@D@B@@BB@@A@@B@@@B@@@@A@@BA@@B@@A@@@A@@A@@A@A@@@@@C@C@E@CBA@E@A@ABED@@@D@@@@AB@@A@@@A@A@@@ABA@@@AB@@@B@@AB@@@@@@@@@@A@@@A@@@@BA@@@A@AB@@A@A@A@@@@A@@@A@@@@@A@A@@BA@@@@@@BA@@A@@@@AA@@@@@@AB@@@@A@@@A@@@@@@@@@BA@@BA@@@@BAB@@ABAB@@@B@@@BBB@@@@@B@@A@@@AB@B@B@@@B@@@BA@@B@@@@@B@@@B@@ABA@@@A@@@@@@@@@@@@@A@@@@@@@AB@@@A@@@@@@A@@@@@AB@@AB@@AB@@AB@@@@AB@@@@@BA@@@A@AB@@A@@@A@@BA@ABA@@@A@@@AB@@A@@@@@@A@@@A@@@@A@@@A@@@@@A@A@@@@@@@@@@@@A@@AA@A@@@A@@@AAA@@@A@@@A@@@A@A@@AA@@@@AA@@A@@@A@AA@ACCC@@A@@AA@@@@@@@@@@A@@@A@@@A@@AAB@@A@@@CAEAAABA@CBA@@@AB@@ABA@EDIBCBCACBA@ABCBA@C@EAGAA@E@EBEBE@C@C@CBC@A@CAA@C@AACAAACCAA@AAC@A@A@ABA@@DCDADCDCBA@A@A@@AAAACAC@EAC@C@E@C@@@A@C@C@ABCBCBCB@BC@AACCCA@GEICCCACAA@@@AA@@@@AAACACAA@C@@@A@@AA@@AAIAC@CAC@EAA@C@E@CBEBC@ABABA@C@C@C@ADCF@B@@AB@@CD@BAB@@CB@BA@ABC@A@AAA@EEAA@C@@@AAACCACCC@AAA@A@E@C@C@C@C@AAA@AAACAC@A@A@C@C@A@C@A@EAA@E@A@ABABAB@D@D@DAB@BA@C@C@A@CAAACCCACAA@AAC@C@AACAAACAAAACAAACAA@A@A@A@CB@BC@A@AC@A@AAG@GAEBG@EAC@AACCACCCACACAACCCAAACACAAAACAAACAEAAAAAEAA@C@A@AACAA@AACC@AAAAACACAAAC@C@C@AAAACAE@CACAA@C@AABG@CBCAA@@AAAAACAAACACCCAC@CAAAAACCCAEACBE@CBCBCBCBE@EBEBE@EDCDEDCDCBA@AAA@AAAAAA@C@CA@A@A@C@CBCBA@AB@B@D@BABABABCBABABADABAD@BCBCBCBE@CBEDCBCDCBCBCBCDCDA@ABEB@@A@GAA@AA@A@ADE@A@EAAAEAEAE@AAAA@ABA@ABCBCDEBCBA@ABABABAFADADAF@B@B@BBDBB@B@B@BABABAD@BAD@D@B@DBBBB@B@D@BB@@BD@BBB@B@BB@BAD@B@D@D@D@D@B@DADAD@BADABEBCBA@C@CAEAC@EAC@C@C@EBE@C@CACAEACAC@C@CBC@A@@@AA@A@C@ABE@E@CCCAECAC@C@CAC@EACAE@E@C@GBE@E@A@CACAAAAC@C@CAC@AAACAAACAE@CACAGCCAACA@ACACAE@C@A@C@CBA@C@@CAAACACAC@C@E@C@C@@@EBG@EBE@E@C@CGAAAACACA@AA@@@AC@A@CBA@C@A@EBE@CAE@CAA@CBC@CAAAA@ACAEAEAEAA@CAA@C@GBC@@@GBEAC@GAE@G@CAE@AAEAECA@ABA@ABEDEDEDCDCBC@@@A@AAC@CAC@A@A@C@CBEBCDCDEBCBCBC@A@C@EBEBCBA@@B@B@D@D@D@BABC@A@@AA@A@C@E@A@AA@@BA@C@CBC@CBCAA@@A@A@E@A@EAEAA@C@A@@B@B@D@DBB@DBFBDBBBB@@BBBDBB@D@DADBF@D@BAD@B@DADADABABA@C@ABAB@@@B@BB@B@BBD@D@B@DBB@BAD@D@D@B@@B@@@BAB@BAB@BABABCBCBC@A@C@A@C@AAA@AB@B@BA@@D@B@B@B@BAB@BCFADCDEFCDAB@B@BBDBDBBBBB@B@BADABAB@BB@@@BBB@BAD@D@D@D@BBDBB@BDBBDDB@B@B@BABABCBABCDABAB@BBB@FBDBD@DAD@BCBA@A@@B@BB@BB@@BBCDAD@B@@D@@B@DGLADACAAAA@@AG@CAC@C@C@@BA@@@@@A@@@@@@@@@@@@A@@@@@@@A@AA@@@@@@A@@BB@@@@@@@@@BB@B@@@D@F@@@B@DBDBH@F@@A@@BAAAA@@AB@@@B@B@BAFA@@@EBA@EGAACGAAAAA@ABAB@BCBK@GB@BAF@D@@A@EAC@CAABABCDAD@BAAAA@GEMAAA@C@GBE@CAEAE@ABA@CBE@G@A@AB@BABDDDDDFDF@F@B@F@FAF@FBF@HDHADABCFJBF@H@B@BABAFKBAB@B@BBHJFFLFF@D@D@BABA@ADI@ADAB@D@FBDDBB@D@B@BIDAD@B@DBDBFDDBDBBB@D@BADEHIJIFCZKJEHCHCFAL@JAD@F@BABA@A@CACCCBEDABAFAD@FBF@DBFBDFABCBC@EBCDCDCFADAB@DBDBBDDBBD@H@JAD@B@DBBFBFBBDADAFBFBHFHDDBDDFDDDDFBFDBDBBBDBBD@D@FBBBDDBFBDBDBDDBDBBBDFBDBDDDBDBDBJBDBDD@DDBHDJDDDHHFFDBHFFFBB@DCBCBE@GAE@E@EFA@CDCBCD@D@FABCDCAE@CAIAGAICIAGCECEACAECACEB@DBB@BFDDF@BADEFCFCDEACB@DDFBDBF@FBDDHDBD@D@BBDBDB@DBF@BADCBA@CBCDC@AAAAACCCC@E@E@CCACAAAAC@ABABBF@B@DEBAACACAGCGEC@CAEAC@CACAC@CAEAECEAAAA@ACA@AAC@@BA@@DCDAFADAB@DABA@C@ABADCHADBDBBBD@DAFABCFGJGJABAF@D@B@@@@B@@BDBHBJDHFBD@DBF@BFFDB@DCFBDF@DBDBBDBDBDBF@H@D@D@@@FBDBBBD@FBFDBDDDBBD@B@D@BBBDBBADCD@HFFFFD@D@BADCDBDBBDBBBBB@D@F@FBD@FBD@BBFDBBF@D@DABAFAF@FAF@D@DBDFBDBBF@D@D@DAHAJCNENCHAJAD@D@FBDBBDBDDBDFBHDBDDBDBF@D@D@DD@B@DBFH@DBF@BDBB@DBBAHBDDDDDFDD@D@JBJDDBDBD@HBH@FBFBFBBD@B@D@D@HAFABABADAB@DBBBBHBFBD@FBHBDBDBBBBDBHBHBDDB@CBCBAFAFBH@JBHBF@DBBDDBB@F@D@D@DBBD@D@FABDBD@FBF@HDFBDAF@DBFD@DDBDDBDBD@DBDAHBH@@B@B@D@@@D@B@B@B@B@B@@ADADABCDADCB@@AFBHAF@DA@@D@DAD@DAB@B@BBB@BB@BBDBBDBBBB@B@F@D@D@B@@@FDHBDB@@B@BAB@BABABA@ADABCBEFCDEBAFGHGFEDCDCDCJIDADCDCDAB@FABA@@BADCBCBA@A@ABAD@DBB@B@@@@AB@BABCBADCB@B@BCB@BABABABABC@ABCBABA@ABADAB@BABABCB@@A@AAACAACA@@A@@@A@AB@@@BAB@F@B@DAFAD@FADADADAFCFAFEFCDCDC@@BAHEHEB@RBHBDBBBBLHHBBBDDDB@DBHDJBLDHDLBJDF@HAD@H@FBFDJHFBDAB@D@D@FAF@B@DBFBRNFD@BDJFPDFDBBBB@DDB@BBBD@DAF@B@@@B@BBDDFFNDJDFBHBDDDFDFDFBBBDBB@BABABADCFCDCJEFCFABADAFAD@B@BBDDHHFFDDDBBB@@B@DAB@DADAF@FABBVFHDD@BBBABABABCB@BA@@DBDDDDBBFJFDLFFBBBFNBFFLDDBDBBBBB@B@BAB@D@FAB@B@D@F@DBBB@@B@B@BAD@HCHE@@DAFABABCBCBC@IBADADAF@F@BBHFDBBBHDFBFADABADCDABAD@D@DBF@DBHBDDBDBBDBDDD@D@D@D@F@DB"],"encodeOffsets":[[116825,29242]]}}],"UTF8Encoding":true});}));
