/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace sales {
    export namespace ui {
        export namespace c {
            /**
             * 查看视图-销售订单
             */
            export class SalesOrderViewView extends ibas.BOViewView implements app.ISalesOrderViewView {

                private page: sap.m.Page;
                private layoutMain: sap.ui.layout.VerticalLayout;
                private viewTopForm: sap.ui.layout.form.SimpleForm;
                private viewBottomForm: sap.ui.layout.form.SimpleForm;
                private tableSalesOrderItem: sap.ui.table.Table;

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.viewTopForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: false,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("sales_title_general") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_salesorder_docentry") }),
                            new sap.m.Text("", {
                            }).bindProperty("text", {
                                path: "docEntry",
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_salesorder_customercode") }),
                            new sap.m.Text("", {
                            }).bindProperty("text", {
                                path: "customerCode"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_salesorder_customername") }),
                            new sap.m.Text("", {
                            }).bindProperty("text", {
                                path: "customerName"
                            }),
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("sales_order_status") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_salesorder_documentstatus") }),
                            new sap.m.Text("", {
                                wrapping: false
                            }).bindProperty("text", {
                                path: "documentStatus",
                                formatter(data: any): any {
                                    return ibas.enums.describe(ibas.emDocumentStatus, data);
                                }
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_salesorder_canceled") }),
                            new sap.m.Text("", {
                                wrapping: false
                            }).bindProperty("text", {
                                path: "canceled",
                                formatter(data: any): any {
                                    return ibas.enums.describe(ibas.emYesNo, data);
                                }
                            }),
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("sales_order_time") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_salesorder_documentdate") }),
                            new sap.m.Text("", {
                            }).bindProperty("text", {
                                path: "documentDate",
                                type: new sap.ui.model.type.Date({
                                    pattern: "yyyy-MM-dd",
                                    strictParsing: true,
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_salesorder_postingdate") }),
                            new sap.m.Text("", {
                            }).bindProperty("text", {
                                path: "postingDate",
                                type: new sap.ui.model.type.Date({
                                    pattern: "yyyy-MM-dd",
                                    strictParsing: true,
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_salesorder_deliverydate") }),
                            new sap.m.Text("", {
                            }).bindProperty("text", {
                                path: "deliveryDate",
                                type: new sap.ui.model.type.Date({
                                    pattern: "yyyy-MM-dd",
                                    strictParsing: true,
                                })
                            })
                        ]
                    });
                    this.viewBottomForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: false,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_salesorder_remarks") }),
                            new sap.m.Text("", {
                            }).bindProperty("text", {
                                path: "remarks"
                            }),
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("sales_order_amount") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_salesorder_documenttotal") }),
                            new sap.m.Text("", {
                            }).bindProperty("text", {
                                path: "documentTotal"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_salesorder_discounttotal") }),
                            new sap.m.Text("", {
                            }).bindProperty("text", {
                                path: "discountTotal"
                            }),
                        ]
                    });
                    this.tableSalesOrderItem = new sap.ui.table.Table("", {
                        enableSelectAll: false,
                        selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                        selectionMode: sap.ui.table.SelectionMode.None,
                        visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 10),
                        rows: "{/rows}",
                        columns: [
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_salesorderitem_lineid"),
                                template: new sap.m.Text("", {
                                    width: "100%",
                                }).bindProperty("text", {
                                    path: "lineId"
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_salesorderitem_linestatus"),
                                template: new sap.m.Text("", {
                                    wrapping: false
                                }).bindProperty("text", {
                                    path: "lineStatus",
                                    formatter(data: any): any {
                                        return ibas.enums.describe(ibas.emDocumentStatus, data);
                                    }
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_salesorderitem_itemcode"),
                                template: new sap.m.Text("", {
                                }).bindProperty("text", {
                                    path: "itemCode"
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_salesorderitem_price"),
                                template: new sap.m.Text("", {
                                    type: sap.m.InputType.Number
                                }).bindProperty("text", {
                                    path: "price"
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_salesorderitem_quantity"),
                                template: new sap.m.Text("", {
                                    type: sap.m.InputType.Number
                                }).bindProperty("text", {
                                    path: "quantity"
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_salesorderitem_discount"),
                                template: new sap.m.Text("", {
                                    type: sap.m.InputType.Number
                                }).bindProperty("text", {
                                    path: "discount"
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_salesorderitem_linetotal"),
                                template: new sap.m.Text("", {
                                    width: "100%",
                                    wrapping: false
                                }).bindProperty("text", {
                                    path: "lineTotal"
                                })
                            })
                        ]
                    });
                    this.layoutMain = new sap.ui.layout.VerticalLayout("", {
                        content: [
                            this.viewTopForm,
                            this.tableSalesOrderItem,
                            this.viewBottomForm,
                        ]
                    });
                    this.page = new sap.m.Page("", {
                        showHeader: false,
                        subHeader: new sap.m.Bar("", {
                            contentLeft: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_edit"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://edit",
                                    press: function (): void {
                                        that.fireViewEvents(that.editDataEvent);
                                    }
                                })
                            ],
                            contentRight: [
                                new sap.m.Button("", {
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://action",
                                    press: function (event: any): void {
                                        ibas.servicesManager.showServices({
                                            proxy: new ibas.BOListServiceProxy({
                                                data: (<any>that.layoutMain.getModel()).getObject(),
                                                converter: new bo.DataConverter(),
                                            }),
                                            displayServices(services: ibas.IServiceAgent[]): void {
                                                if (ibas.objects.isNull(services) || services.length === 0) {
                                                    return;
                                                }
                                                let popover: sap.m.Popover = new sap.m.Popover("", {
                                                    showHeader: false,
                                                    placement: sap.m.PlacementType.Bottom,
                                                });
                                                for (let service of services) {
                                                    popover.addContent(new sap.m.Button({
                                                        text: ibas.i18n.prop(service.name),
                                                        type: sap.m.ButtonType.Transparent,
                                                        icon: service.icon,
                                                        press: function (): void {
                                                            service.run();
                                                            popover.close();
                                                        }
                                                    }));
                                                }
                                                (<any>popover).addStyleClass("sapMOTAPopover sapTntToolHeaderPopover");
                                                popover.openBy(event.getSource(), true);
                                            }
                                        });
                                    }
                                })
                            ]
                        }),
                        content: [this.layoutMain]
                    });
                    this.id = this.page.getId();
                    return this.page;
                }

                /** 改变视图状态 */
                private changeViewStatus(data: bo.SalesOrder): void {
                    if (ibas.objects.isNull(data)) {
                        return;
                    }
                    // 新建时：禁用删除，
                    if (data.isNew) {
                        if (this.page.getSubHeader() instanceof sap.m.Toolbar) {
                            openui5.utils.changeToolbarDeletable(<sap.m.Toolbar>this.page.getSubHeader(), false);
                        }
                    }
                    // 不可编辑：已批准，
                    if (data.approvalStatus === ibas.emApprovalStatus.APPROVED
                        || data.documentStatus === ibas.emDocumentStatus.CLOSED
                        || data.canceled === ibas.emYesNo.YES) {
                        if (this.page.getSubHeader() instanceof sap.m.Toolbar) {
                            openui5.utils.changeToolbarSavable(<sap.m.Toolbar>this.page.getSubHeader(), false);
                            openui5.utils.changeToolbarDeletable(<sap.m.Toolbar>this.page.getSubHeader(), false);
                        }
                        openui5.utils.changeFormEditable(this.layoutMain, false);
                    }
                }

                /** 显示数据 */
                showSalesOrder(data: bo.SalesOrder): void {
                    this.layoutMain.setModel(new sap.ui.model.json.JSONModel(data));
                    this.layoutMain.bindObject("/");
                }
                /** 显示数据 */
                showSalesOrderItems(datas: bo.SalesOrderItem[]): void {
                    this.tableSalesOrderItem.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                }
            }
        }
    }
}