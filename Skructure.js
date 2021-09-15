var Skructure = {
    apiURLPath: '/[Path To]/_api'
    , CodeName: 'Skructure'
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

                        case 'Image':
                            ReturnValue = 'string';
                            break;
                        case 'Likes':
                            ReturnValue = 'string';
                            break;
                        case 'TaxonomyFieldTypeMulti':
                            ReturnValue = 'string';
                            break;
                        case 'AverageRating':
                            ReturnValue = 'string';
                            break;
                        case 'RatingCount':
                            ReturnValue = 'string';
                            break;

                        case 'Image':
                            ReturnValue = 'string';
                            break;

                        case 'TargetTo':
                            ReturnValue = 'string';
                            break;

                        case 'HTML':
                            ReturnValue = 'string';
                            break;

                        case 'SummaryLinks':
                            ReturnValue = 'string';
                            break;

                        case 'RelatedItems':
                            ReturnValue = 'string';
                            break;

                        case 'RelatedItems':
                            ReturnValue = 'string';
                            break;
                        case 'WorkflowEventType':
                            ReturnValue = 'string';
                            break;
                        case 'PublishingScheduleStartDateFieldType':
                            ReturnValue = 'string';
                            break;
                        case 'PublishingScheduleEndDateFieldType':
                            ReturnValue = 'string';
                            break;
                        case 'PublishingScheduleStartDateFieldType':
                            ReturnValue = 'string';
                            break;
                        case 'OutcomeChoice':
                            ReturnValue = 'string';
                            break;
                        case 'ExemptField':
                            ReturnValue = 'string';
                            break;
                        case 'AllDayEvent':
                            ReturnValue = 'string';
                            break;
                        case 'Recurrence':
                            ReturnValue = 'string';
                            break;
                        case 'LookupMulti':
                            ReturnValue = 'string';
                            break;
                        case 'CrossProjectLink':
                            ReturnValue = 'string';
                            break;
                        case 'UserMulti':
                            ReturnValue = 'string';
                            break;
                        case 'Facilities':
                            ReturnValue = 'string';
                            break;
                        case 'FreeBusy':
                            ReturnValue = 'string';
                            break;
                        case 'Overbook':
                            ReturnValue = 'string';
                            break;
                        case 'File':
                            ReturnValue = 'string';
                            break;
                        case 'WorkflowStatus':
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
        $('#dvModels').html('Document Ready...');
        Virgil.DocumentReady(Skructure);
    }
};
