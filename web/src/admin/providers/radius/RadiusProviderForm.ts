import { BaseProviderForm } from "@goauthentik/admin/providers/BaseProviderForm";
import { DEFAULT_CONFIG } from "@goauthentik/common/api/config";
import { WithBrandConfig } from "@goauthentik/elements/Interface/brandProvider";

import { customElement } from "lit/decorators.js";

import { ProvidersApi, RadiusProvider } from "@goauthentik/api";

import { renderForm } from "./RadiusProviderFormForm.js";

@customElement("ak-provider-radius-form")
export class RadiusProviderFormPage extends WithBrandConfig(BaseProviderForm<RadiusProvider>) {
    loadInstance(pk: number): Promise<RadiusProvider> {
        return new ProvidersApi(DEFAULT_CONFIG).providersRadiusRetrieve({
            id: pk,
        });
    }

    async send(data: RadiusProvider): Promise<RadiusProvider> {
        if (this.instance) {
            return new ProvidersApi(DEFAULT_CONFIG).providersRadiusUpdate({
                id: this.instance.pk,
                radiusProviderRequest: data,
            });
        } else {
            return new ProvidersApi(DEFAULT_CONFIG).providersRadiusCreate({
                radiusProviderRequest: data,
            });
        }
    }

<<<<<<< HEAD
    renderForm() {
        return renderForm(this.instance ?? {}, [], this.brand);
=======
    // All Provider objects have an Authorization flow, but not all providers have an Authentication
    // flow. Radius needs only one field, but it is not the Authorization field, it is an
    // Authentication field. So, yeah, we're using the authorization field to store the
    // authentication information, which is why the ak-branded-flow-search call down there looks so
    // weird-- we're looking up Authentication flows, but we're storing them in the Authorization
    // field of the target Provider.
    renderForm(): TemplateResult {
        return html`
            <ak-form-element-horizontal label=${msg("Name")} required name="name">
                <input
                    type="text"
                    value="${ifDefined(this.instance?.name)}"
                    class="pf-c-form-control"
                    required
                />
            </ak-form-element-horizontal>
            <ak-form-element-horizontal
                label=${msg("Authentication flow")}
                required
                name="authorizationFlow"
            >
                <ak-branded-flow-search
                    flowType=${FlowsInstancesListDesignationEnum.Authentication}
                    .currentFlow=${this.instance?.authorizationFlow}
                    .brandFlow=${this.brand?.flowAuthentication}
                    required
                ></ak-branded-flow-search>
                <p class="pf-c-form__helper-text">${msg("Flow used for users to authenticate.")}</p>
            </ak-form-element-horizontal>
            <ak-form-element-horizontal name="mfaSupport">
                <label class="pf-c-switch">
                    <input
                        class="pf-c-switch__input"
                        type="checkbox"
                        ?checked=${first(this.instance?.mfaSupport, true)}
                    />
                    <span class="pf-c-switch__toggle">
                        <span class="pf-c-switch__toggle-icon">
                            <i class="fas fa-check" aria-hidden="true"></i>
                        </span>
                    </span>
                    <span class="pf-c-switch__label">${msg("Code-based MFA Support")}</span>
                </label>
                <p class="pf-c-form__helper-text">
                    ${msg(
                        "When enabled, code-based multi-factor authentication can be used by appending a semicolon and the TOTP code to the password. This should only be enabled if all users that will bind to this provider have a TOTP device configured, as otherwise a password may incorrectly be rejected if it contains a semicolon.",
                    )}
                </p>
            </ak-form-element-horizontal>

            <ak-form-group expanded>
                <span slot="header"> ${msg("Protocol settings")} </span>
                <div slot="body" class="pf-c-form">
                    <ak-form-element-horizontal
                        label=${msg("Shared secret")}
                        required
                        name="sharedSecret"
                    >
                        <input
                            type="text"
                            value="${first(
                                this.instance?.sharedSecret,
                                randomString(128, ascii_letters + digits),
                            )}"
                            class="pf-c-form-control"
                            required
                        />
                    </ak-form-element-horizontal>
                    <ak-form-element-horizontal
                        label=${msg("Client Networks")}
                        required
                        name="clientNetworks"
                    >
                        <input
                            type="text"
                            value="${first(this.instance?.clientNetworks, "0.0.0.0/0, ::/0")}"
                            class="pf-c-form-control"
                            required
                        />
                        <p class="pf-c-form__helper-text">
                            ${msg(`List of CIDRs (comma-seperated) that clients can connect from. A more specific
                            CIDR will match before a looser one. Clients connecting from a non-specified CIDR
                            will be dropped.`)}
                        </p>
                    </ak-form-element-horizontal>
                    <ak-form-element-horizontal
                        label=${msg("Property mappings")}
                        name="propertyMappings"
                    >
                        <ak-dual-select-dynamic-selected
                            .provider=${radiusPropertyMappingsProvider}
                            .selector=${makeRadiusPropertyMappingsSelector(
                                this.instance?.propertyMappings,
                            )}
                            available-label=${msg("Available Property Mappings")}
                            selected-label=${msg("Selected Property Mappings")}
                        ></ak-dual-select-dynamic-selected>
                    </ak-form-element-horizontal>
                </div>
            </ak-form-group>
            <ak-form-group>
                <span slot="header"> ${msg("Advanced flow settings")} </span>
                <div slot="body" class="pf-c-form">
                    <ak-form-element-horizontal
                        label=${msg("Invalidation flow")}
                        name="invalidationFlow"
                        required
                    >
                        <ak-flow-search
                            flowType=${FlowsInstancesListDesignationEnum.Invalidation}
                            .currentFlow=${this.instance?.invalidationFlow}
                            defaultFlowSlug="default-invalidation-flow"
                            required
                        ></ak-flow-search>
                        <p class="pf-c-form__helper-text">
                            ${msg("Flow used when logging out of this provider.")}
                        </p>
                    </ak-form-element-horizontal>
                </div></ak-form-group
            >
        `;
>>>>>>> main
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "ak-provider-radius-form": RadiusProviderFormPage;
    }
}
