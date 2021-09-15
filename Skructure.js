var Skructure = {
    apiURLPath: '/[Path To]/_api'
    , CodeName: 'Skructure'
    , ControlElements: { dvDatabase: '#dvDatabase', dvModels: '#dvModels' }
    , PrintDB: function PrintDB(dvDatabase, Lists) {


        var PrintList = function PrintList(ListIndex, tmpList) {
            var tmpText = '';
            var EntityTypeName = tmpList.EntityTypeName;
            var uri = tmpList.Items.__deferred.uri;
            var Top = '$top=10';
            var url = uri + '?' + Top;
            var gotData = function gotData(xhrData) {
                var Records = '';
                var PrintRecords = function (xhrData) {
                    var PrintRecord = function (RecordIndex, tmpRecord) {

                        Records = Records + '{';
                        for (let tmpField in tmpRecord) {
                            var FieldValue = tmpRecord[tmpField];
                            var DataType = typeof FieldValue;

                            Records = Records + '<Div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
                            Records = Records + '"' + tmpField + '"';
                            Records = Records + ':';

                            switch (DataType) {
                                case 'object':
                                    Records = Records + '"' + FieldValue + '"';
                                    break;
                                case 'number':
                                    Records = Records + FieldValue;
                                    break;
                                case 'string':
                                    Records = Records + '"' + FieldValue + '"';
                                    break;
                                default:
                                    Records = Records + '"' + DataType + '"';
                                    break;
                            }

                            Records = Records + '</Div>';
                        }
                        Records = Records + '}';

                        if (RecordIndex < xhrData.length - 1) {
                            Records = Records + ', ';
                        }

                    };
                    $(xhrData).each(PrintRecord);
                };

                PrintRecords(xhrData);

                tmpText = tmpText + '<Div ListIndex="' + ListIndex + '"><B>"' + EntityTypeName + '"</B>:[' + Records + ']</Div>';
                $(dvDatabase).append(tmpText);
            };

            Virgil.ajax(EntityTypeName, url, gotData);
        };

        $(Lists).each(PrintList);


    }
    , PrintModels: function PrintModels(Lists) {
        $('#dvModels').html('Loading...');
        var PrintModel = function PrintModel(ListIndex, tmpList) {
            var EntityTypeName = tmpList.EntityTypeName;
            var Fields = tmpList.Fields;
            var FieldDefs = '';
            var PrintFields = function PrintFields(FieldIndex, tmpField) {

                var getDataType = function getDataType(TypeAsString) {
                    var ReturnValue;
                    switch (TypeAsString) {
                        case 'Counter':
                            ReturnValue = 'number';
                            break;
                        case 'Number':
                            ReturnValue = 'number';
                            break;
                        case 'Integer':
                            ReturnValue = 'number';
                            break;
                        case 'Lookup':
                            ReturnValue = 'number';
                            break;
                        case 'Boolean':
                            ReturnValue = 'boolean';
                            break;
                        case 'File':
                            ReturnValue = 'string';
                            break;
                        case 'Text':
                            ReturnValue = 'string';
                            break;
                        case 'Choice':
                            ReturnValue = 'string';
                            break;
                        case 'MultiChoice':
                            ReturnValue = 'string';
                            break;
                        case 'Calculated':
                            ReturnValue = 'string';
                            break;
                        case 'Attachments':
                            ReturnValue = 'string';
                            break;
                        case 'AccessRequestsPermissionLevel':
                            ReturnValue = 'string';
                            break;
                        case 'URL':
                            ReturnValue = 'string';
                            break;
                        case 'Guid':
                            ReturnValue = 'string';
                            break;
                        case 'Note':
                            ReturnValue = 'string';
                            break;
                        case 'ModStat':
                            ReturnValue = 'string';
                            break;
                        case 'User':
                            ReturnValue = 'string';
                            break;
                        case 'DateTime':
                            ReturnValue = 'string';
                            break;
                        case 'ContentTypeId':
                            ReturnValue = 'string';
                            break;
                        case 'ContentTypeId':
                            ReturnValue = 'string';
                            break;
                        case 'Computed':
                            ReturnValue = 'string';
                            break;
                        default:
                            ReturnValue = TypeAsString;
                    }
                    return ReturnValue;
                };

                FieldDefs = FieldDefs + '<Div Class = "' + getDataType(tmpField.TypeAsString) + '">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + tmpField.EntityPropertyName + '!: ' + getDataType(tmpField.TypeAsString) + '  //  ' + tmpField.Title + '</Div>'
            };

            $(Fields).each(PrintFields);

            $('#dvModels').prepend('<br/><div>export class <B>' + EntityTypeName + '</B>Model{' + FieldDefs + '};</div>');
        };
        $('#dvModels').html('');
        $(Lists).each(PrintModel);
    }
    , default: function myfunction() {

        if (Skructure.hasOwnProperty('Lists')) {
            var Lists = Skructure.Lists;

            var getFields = function getFields(ListIndex, tmpList) {
                if (tmpList.hasOwnProperty('EntityTypeName')) {
                    var EntityTypeName = tmpList.EntityTypeName;

                    if (tmpList.hasOwnProperty('Fields')) {
                        var Fields = tmpList.Fields;
                        if (Fields.hasOwnProperty('__deferred')) {
                            var __deferred = Fields.__deferred;
                            if (__deferred.hasOwnProperty('uri')) {
                                var uri = __deferred.uri;
                                var TableName = EntityTypeName + 'Fields';
                                var gotData = function gotFields(xhrFields) {
                                    Lists[ListIndex].Fields = xhrFields;
                                    if (ListIndex === Lists.length - 1) {
                                        Skructure.PrintDB(Skructure.ControlElements.dvDatabase, Lists);
                                        Skructure.PrintModels(Lists);
                                    }
                                };
                                Virgil.ajax(TableName, uri, gotData);
                            }
                        }
                    }

                }
            };

            $(Lists).each(getFields);
        }

    }
    , DocumentReady: function () {
        Virgil.DocumentReady(Skructure);
    }
};
