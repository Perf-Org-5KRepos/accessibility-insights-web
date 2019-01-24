// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Messages } from '../../common/messages';
import { CONTENT_PANEL_CLOSED, CONTENT_PANEL_OPENED } from '../../common/telemetry-events';
import { DetailsViewController } from '../details-view-controller';
import { TelemetryEventHandler } from '../telemetry/telemetry-event-handler';
import { BaseActionPayload } from './action-payloads';
import { ContentActions, ContentPayload } from './content-actions';

export class ContentActionCreator {
    constructor(
        private readonly contentActions: ContentActions,
        private readonly telemetryEventHandler: TelemetryEventHandler,
        private readonly registerTypeToPayloadCallback: IRegisterTypeToPayloadCallback,
        private readonly detailsViewController: DetailsViewController,
    ) {}

    public registerCallbacks(): void {
        this.registerTypeToPayloadCallback(Messages.ContentPanel.OpenPanel, (payload, tabId) => this.onOpenContentPanel(payload, tabId));
        this.registerTypeToPayloadCallback(Messages.ContentPanel.ClosePanel, (payload, tabId) => this.onCloseContentPanel(payload, tabId));
    }

    private onOpenContentPanel(payload: ContentPayload, tabId: number): void {
        this.contentActions.openContentPanel.invoke(payload);
        this.showDetailsView(tabId);
        this.telemetryEventHandler.publishTelemetry(CONTENT_PANEL_OPENED, payload, tabId);
    }

    private onCloseContentPanel(payload: BaseActionPayload, tabId: number): void {
        this.contentActions.closeContentPanel.invoke(null);
        this.telemetryEventHandler.publishTelemetry(CONTENT_PANEL_CLOSED, payload, tabId);
    }

    private showDetailsView(tabId: number): void {
        this.detailsViewController.showDetailsView(tabId);
    }
}
