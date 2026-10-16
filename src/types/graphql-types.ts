export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** Defines the bundle products to add to the cart. */
export type AddBundleProductsToCartInput = {
  /** The ID of the cart. */
  cart_id: Scalars['String']['input'];
  /** An array of bundle products to add. */
  cart_items: Array<InputMaybe<BundleProductCartItemInput>>;
};

/** Contains details about the cart after adding bundle products. */
export type AddBundleProductsToCartOutput = {
  __typename?: 'AddBundleProductsToCartOutput';
  /** The cart after adding products. */
  cart: Cart;
};

export type AddConfigAttribute = {
  __typename?: 'AddConfigAttribute';
  /** Message indicating success or failure of the attribute creation operation */
  message?: Maybe<Scalars['String']['output']>;
  /** Indicates whether the attribute was successfully added (true: success, false: failure) */
  status?: Maybe<Scalars['Boolean']['output']>;
};

/** Defines the configurable products to add to the cart. */
export type AddConfigurableProductsToCartInput = {
  /** The ID of the cart. */
  cart_id: Scalars['String']['input'];
  /** An array of configurable products to add. */
  cart_items: Array<InputMaybe<ConfigurableProductCartItemInput>>;
};

/** Contains details about the cart after adding configurable products. */
export type AddConfigurableProductsToCartOutput = {
  __typename?: 'AddConfigurableProductsToCartOutput';
  /** The cart after adding products. */
  cart: Cart;
};

export type AddDownloadableProductsToCartInput = {
  /** The ID of the cart. */
  cart_id: Scalars['String']['input'];
  /** An array of downloadable products to add. */
  cart_items: Array<InputMaybe<DownloadableProductCartItemInput>>;
};

/** Contains details about the cart after adding downloadable products. */
export type AddDownloadableProductsToCartOutput = {
  __typename?: 'AddDownloadableProductsToCartOutput';
  /** The cart after adding products. */
  cart: Cart;
};

/** Contains details about the cart after adding products to it. */
export type AddProductsToCartOutput = {
  __typename?: 'AddProductsToCartOutput';
  /** The cart after products have been added. */
  cart: Cart;
  /** Contains errors encountered while adding an item to the cart. */
  user_errors: Array<Maybe<Error>>;
};

/** Contains products to add to an existing compare list. */
export type AddProductsToCompareListInput = {
  /** An array of product IDs to add to the compare list. */
  products: Array<InputMaybe<Scalars['ID']['input']>>;
  /** The unique identifier of the compare list to modify. */
  uid: Scalars['ID']['input'];
};

/** Contains details about the cart after adding products to it. */
export type AddProductsToNewCartOutput = {
  __typename?: 'AddProductsToNewCartOutput';
  /** The cart after products have been added. */
  cart?: Maybe<Cart>;
  /** Contains errors encountered while adding an item to the cart. */
  user_errors?: Maybe<Array<Maybe<CartUserInputError>>>;
};

/** Contains the customer's wish list and any errors encountered. */
export type AddProductsToWishlistOutput = {
  __typename?: 'AddProductsToWishlistOutput';
  /** An array of errors encountered while adding products to a wish list. */
  user_errors: Array<Maybe<WishListUserInputError>>;
  /** Contains the wish list with all items that were successfully added. */
  wishlist: Wishlist;
};

/** Defines the simple and group products to add to the cart. */
export type AddSimpleProductsToCartInput = {
  /** The unique ID of a `Cart` object. */
  cart_id: Scalars['String']['input'];
  /** An array of simple and group items to add. */
  cart_items: Array<InputMaybe<SimpleProductCartItemInput>>;
};

/** Contains details about the cart after adding simple or group products. */
export type AddSimpleProductsToCartOutput = {
  __typename?: 'AddSimpleProductsToCartOutput';
  /** The cart after adding products. */
  cart: Cart;
};

/** Defines the virtual products to add to the cart. */
export type AddVirtualProductsToCartInput = {
  /** The unique ID of a `Cart` object. */
  cart_id: Scalars['String']['input'];
  /** An array of virtual products to add. */
  cart_items: Array<InputMaybe<VirtualProductCartItemInput>>;
};

/** Contains details about the cart after adding virtual products. */
export type AddVirtualProductsToCartOutput = {
  __typename?: 'AddVirtualProductsToCartOutput';
  /** The cart after adding products. */
  cart: Cart;
};

/** Contains the resultant wish list and any error information. */
export type AddWishlistItemsToCartOutput = {
  __typename?: 'AddWishlistItemsToCartOutput';
  /** An array of errors encountered while adding products to the customer's cart. */
  add_wishlist_items_to_cart_user_errors: Array<Maybe<WishlistCartUserInputError>>;
  /** Indicates whether the attempt to add items to the customer's cart was successful. */
  status: Scalars['Boolean']['output'];
  /** Contains the wish list with all items that were successfully added. */
  wishlist: Wishlist;
};

export type AddressBillingData = {
  __typename?: 'AddressBillingData';
  country?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  telephone?: Maybe<Scalars['String']['output']>;
};

/** Contains information for each filterable option (such as price, category `UID`, and custom attributes). */
export type Aggregation = {
  __typename?: 'Aggregation';
  /** Attribute code of the aggregation group. */
  attribute_code: Scalars['String']['output'];
  /** The number of options in the aggregation group. */
  count?: Maybe<Scalars['Int']['output']>;
  /** The aggregation display name. */
  label?: Maybe<Scalars['String']['output']>;
  /** Array of options for the aggregation. */
  options?: Maybe<Array<Maybe<AggregationOption>>>;
  /** The relative position of the attribute in a layered navigation block. */
  position?: Maybe<Scalars['Int']['output']>;
};

/** An implementation of `AggregationOptionInterface`. */
export type AggregationOption = AggregationOptionInterface & {
  __typename?: 'AggregationOption';
  /** The number of items that match the aggregation option. */
  count?: Maybe<Scalars['Int']['output']>;
  /** The display label for an aggregation option. */
  label?: Maybe<Scalars['String']['output']>;
  /** The internal ID that represents the value of the option. */
  value: Scalars['String']['output'];
};

/** Defines aggregation option fields. */
export type AggregationOptionInterface = {
  /** The number of items that match the aggregation option. */
  count?: Maybe<Scalars['Int']['output']>;
  /** The display label for an aggregation option. */
  label?: Maybe<Scalars['String']['output']>;
  /** The internal ID that represents the value of the option. */
  value: Scalars['String']['output'];
};

/** Filter category aggregations in layered navigation. */
export type AggregationsCategoryFilterInput = {
  /** Indicates whether to include only direct subcategories or all children categories at all levels. */
  includeDirectChildrenOnly?: InputMaybe<Scalars['Boolean']['input']>;
};

/** An input object that specifies the filters used in product aggregations. */
export type AggregationsFilterInput = {
  /** Filter category aggregations in layered navigation. */
  category?: InputMaybe<AggregationsCategoryFilterInput>;
};

export type AllSellerOrder = {
  __typename?: 'AllSellerOrder';
  /** The total count of orders associated with the seller. */
  count?: Maybe<Scalars['String']['output']>;
  /** A label or category describing the type of orders. */
  label?: Maybe<Scalars['String']['output']>;
};

export type ApplePayConfig = PaymentConfigItem & {
  __typename?: 'ApplePayConfig';
  /** The styles for the ApplePay Smart Button configuration */
  button_styles?: Maybe<ButtonStyles>;
  /** The payment method code as defined in the payment gateway */
  code?: Maybe<Scalars['String']['output']>;
  /** Indicates whether the payment method is displayed */
  is_visible?: Maybe<Scalars['Boolean']['output']>;
  /** Defines the payment intent (Authorize or Capture */
  payment_intent?: Maybe<Scalars['String']['output']>;
  /** The payment source for the payment method */
  payment_source?: Maybe<Scalars['String']['output']>;
  /** The PayPal parameters required to load the JS SDK */
  sdk_params?: Maybe<Array<Maybe<SdkParams>>>;
  /** The relative order the payment method is displayed on the checkout page */
  sort_order?: Maybe<Scalars['String']['output']>;
  /** The name displayed for the payment method */
  title?: Maybe<Scalars['String']['output']>;
};

/** Apple Pay inputs */
export type ApplePayMethodInput = {
  /** The payment source for the payment method */
  payment_source?: InputMaybe<Scalars['String']['input']>;
  /** The payment services order ID */
  payments_order_id?: InputMaybe<Scalars['String']['input']>;
  /** PayPal order ID */
  paypal_order_id?: InputMaybe<Scalars['String']['input']>;
};

/** Contains the applied coupon code. */
export type AppliedCoupon = {
  __typename?: 'AppliedCoupon';
  /** The coupon code the shopper applied to the card. */
  code: Scalars['String']['output'];
};

export type AppliedLayerFilter = {
  __typename?: 'AppliedLayerFilter';
  /** filed attribute code */
  attribute_code?: Maybe<Scalars['String']['output']>;
  /** Field name */
  label?: Maybe<Scalars['String']['output']>;
  /** Value of field search by value */
  options?: Maybe<Array<Maybe<FilterOptions>>>;
  /** Field filter value */
  value?: Maybe<Scalars['String']['output']>;
};

/** Specifies the coupon code to apply to the cart. */
export type ApplyCouponToCartInput = {
  /** The unique ID of a `Cart` object. */
  cart_id: Scalars['String']['input'];
  /** A valid coupon code. */
  coupon_code: Scalars['String']['input'];
};

/** Contains details about the cart after applying a coupon. */
export type ApplyCouponToCartOutput = {
  __typename?: 'ApplyCouponToCartOutput';
  /** The cart after applying a coupon. */
  cart: Cart;
};

/** AreaInput defines the parameters which will be used for filter by specified location. */
export type AreaInput = {
  /** The radius for the search in KM. */
  radius: Scalars['Int']['input'];
  /** The country code where search must be performed. Required parameter together with region, city or postcode. */
  search_term: Scalars['String']['input'];
};

/** Contains the results of the request to assign a compare list. */
export type AssignCompareListToCustomerOutput = {
  __typename?: 'AssignCompareListToCustomerOutput';
  /** The contents of the customer's compare list. */
  compare_list?: Maybe<CompareList>;
  /** Indicates whether the compare list was successfully assigned to the customer. */
  result: Scalars['Boolean']['output'];
};

/** Contains details about the attribute, including the code and type. */
export type Attribute = {
  __typename?: 'Attribute';
  /** The unique identifier for an attribute code. This value should be in lowercase letters without spaces. */
  attribute_code?: Maybe<Scalars['String']['output']>;
  /** Attribute options list. */
  attribute_options?: Maybe<Array<Maybe<AttributeOption>>>;
  /** The data type of the attribute. */
  attribute_type?: Maybe<Scalars['String']['output']>;
  /** The type of entity that defines the attribute. */
  entity_type?: Maybe<Scalars['String']['output']>;
  /** The frontend input type of the attribute. */
  input_type?: Maybe<Scalars['String']['output']>;
  /** Details about the storefront properties configured for the attribute. */
  storefront_properties?: Maybe<StorefrontProperties>;
};

/** List of all entity types. Populated by the modules introducing EAV entities. */
export enum AttributeEntityTypeEnum {
  CatalogCategory = 'CATALOG_CATEGORY',
  CatalogProduct = 'CATALOG_PRODUCT',
  Customer = 'CUSTOMER',
  CustomerAddress = 'CUSTOMER_ADDRESS'
}

/** An input object that specifies the filters used for attributes. */
export type AttributeFilterInput = {
  /** Whether a product or category attribute can be compared against another or not. */
  is_comparable?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether a product or category attribute can be filtered or not. */
  is_filterable?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether a product or category attribute can be filtered in search or not. */
  is_filterable_in_search?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether a product or category attribute can use HTML on front or not. */
  is_html_allowed_on_front?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether a product or category attribute can be searched or not. */
  is_searchable?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether a product or category attribute can be used for price rules or not. */
  is_used_for_price_rules?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether a product or category attribute is used for promo rules or not. */
  is_used_for_promo_rules?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether a product or category attribute is visible in advanced search or not. */
  is_visible_in_advanced_search?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether a product or category attribute is visible on front or not. */
  is_visible_on_front?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether a product or category attribute has WYSIWYG enabled or not. */
  is_wysiwyg_enabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether a product or category attribute is used in product listing or not. */
  used_in_product_listing?: InputMaybe<Scalars['Boolean']['input']>;
};

/** EAV attribute frontend input types. */
export enum AttributeFrontendInputEnum {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  Datetime = 'DATETIME',
  File = 'FILE',
  Gallery = 'GALLERY',
  Hidden = 'HIDDEN',
  Image = 'IMAGE',
  MediaImage = 'MEDIA_IMAGE',
  Multiline = 'MULTILINE',
  Multiselect = 'MULTISELECT',
  Price = 'PRICE',
  Select = 'SELECT',
  Text = 'TEXT',
  Textarea = 'TEXTAREA',
  Undefined = 'UNDEFINED',
  Weight = 'WEIGHT'
}

/** Defines the attribute characteristics to search for the `attribute_code` and `entity_type` to search. */
export type AttributeInput = {
  /** The unique identifier for an attribute code. This value should be in lowercase letters without spaces. */
  attribute_code?: InputMaybe<Scalars['String']['input']>;
  /** The type of entity that defines the attribute. */
  entity_type?: InputMaybe<Scalars['String']['input']>;
};

/** Specifies selected option for a select or multiselect attribute value. */
export type AttributeInputSelectedOption = {
  /** The attribute option value. */
  value: Scalars['String']['input'];
};

/** Base EAV implementation of CustomAttributeMetadataInterface. */
export type AttributeMetadata = CustomAttributeMetadataInterface & {
  __typename?: 'AttributeMetadata';
  /** The unique identifier for an attribute code. This value should be in lowercase letters without spaces. */
  code: Scalars['ID']['output'];
  /** Default attribute value. */
  default_value?: Maybe<Scalars['String']['output']>;
  /** The type of entity that defines the attribute. */
  entity_type: AttributeEntityTypeEnum;
  /** The frontend class of the attribute. */
  frontend_class?: Maybe<Scalars['String']['output']>;
  /** The frontend input type of the attribute. */
  frontend_input?: Maybe<AttributeFrontendInputEnum>;
  /** Whether the attribute value is required. */
  is_required: Scalars['Boolean']['output'];
  /** Whether the attribute value must be unique. */
  is_unique: Scalars['Boolean']['output'];
  /** The label assigned to the attribute. */
  label?: Maybe<Scalars['String']['output']>;
  /** Attribute options. */
  options: Array<Maybe<CustomAttributeOptionInterface>>;
};

/** Attribute metadata retrieval error. */
export type AttributeMetadataError = {
  __typename?: 'AttributeMetadataError';
  /** Attribute metadata retrieval error message. */
  message: Scalars['String']['output'];
  /** Attribute metadata retrieval error type. */
  type: AttributeMetadataErrorType;
};

/** Attribute metadata retrieval error types. */
export enum AttributeMetadataErrorType {
  /** The requested attribute was not found. */
  AttributeNotFound = 'ATTRIBUTE_NOT_FOUND',
  /** The requested entity was not found. */
  EntityNotFound = 'ENTITY_NOT_FOUND',
  /** The filter cannot be applied as it does not belong to the entity */
  FilterNotFound = 'FILTER_NOT_FOUND',
  /** Not categorized error, see the error message. */
  Undefined = 'UNDEFINED'
}

/** Defines an attribute option. */
export type AttributeOption = {
  __typename?: 'AttributeOption';
  /** The label assigned to the attribute option. */
  label?: Maybe<Scalars['String']['output']>;
  /** The attribute option value. */
  value?: Maybe<Scalars['String']['output']>;
};

/** Base EAV implementation of CustomAttributeOptionInterface. */
export type AttributeOptionMetadata = CustomAttributeOptionInterface & {
  __typename?: 'AttributeOptionMetadata';
  /** Is the option value default. */
  is_default: Scalars['Boolean']['output'];
  /** The label assigned to the attribute option. */
  label: Scalars['String']['output'];
  /** The attribute option value. */
  value: Scalars['String']['output'];
};

export type AttributeSelectedOption = AttributeSelectedOptionInterface & {
  __typename?: 'AttributeSelectedOption';
  /** The attribute selected option label. */
  label: Scalars['String']['output'];
  /** The attribute selected option value. */
  value: Scalars['String']['output'];
};

export type AttributeSelectedOptionInterface = {
  /** The attribute selected option label. */
  label: Scalars['String']['output'];
  /** The attribute selected option value. */
  value: Scalars['String']['output'];
};

export type AttributeSelectedOptions = AttributeValueInterface & {
  __typename?: 'AttributeSelectedOptions';
  /** The attribute code. */
  code: Scalars['ID']['output'];
  selected_options: Array<Maybe<AttributeSelectedOptionInterface>>;
};

export type AttributeValue = AttributeValueInterface & {
  __typename?: 'AttributeValue';
  /** The attribute code. */
  code: Scalars['ID']['output'];
  /** The attribute value. */
  value: Scalars['String']['output'];
};

/** Specifies the value for attribute. */
export type AttributeValueInput = {
  /** The code of the attribute. */
  attribute_code: Scalars['String']['input'];
  /** An array containing selected options for a select or multiselect attribute. */
  selected_options?: InputMaybe<Array<InputMaybe<AttributeInputSelectedOption>>>;
  /** The value assigned to the attribute. */
  value?: InputMaybe<Scalars['String']['input']>;
};

export type AttributeValueInterface = {
  /** The attribute code. */
  code: Scalars['ID']['output'];
};

/** Product configurable attribute Data Params */
export type AttributesDataInput = {
  /** ID of the product attribute */
  attribute_id?: InputMaybe<Scalars['Int']['input']>;
  /** Code of the product attribute */
  code?: InputMaybe<Scalars['String']['input']>;
  /** Label of the product attribute */
  label?: InputMaybe<Scalars['String']['input']>;
  /** Position of the attribute in the product options */
  position?: InputMaybe<Scalars['Int']['input']>;
  /** List of values for the configurable product attribute */
  values?: InputMaybe<Array<InputMaybe<MpAttributeValueInput>>>;
};

/** Metadata of EAV attributes associated to form */
export type AttributesFormOutput = {
  __typename?: 'AttributesFormOutput';
  /** Errors of retrieving certain attributes metadata. */
  errors: Array<Maybe<AttributeMetadataError>>;
  /** Requested attributes metadata. */
  items: Array<Maybe<CustomAttributeMetadataInterface>>;
};

/** Product configurable attribute Data Params */
export type AttributesInput = {
  /** Product Attribute Data Input */
  attribute_data?: InputMaybe<Array<InputMaybe<AttributesDataInput>>>;
  /** product manage Stock */
  attribute_id?: InputMaybe<Scalars['Int']['input']>;
};

/** Metadata of EAV attributes. */
export type AttributesMetadataOutput = {
  __typename?: 'AttributesMetadataOutput';
  /** Errors of retrieving certain attributes metadata. */
  errors: Array<Maybe<AttributeMetadataError>>;
  /** Requested attributes metadata. */
  items: Array<Maybe<CustomAttributeMetadataInterface>>;
};

export type AvailableCurrencyData = {
  __typename?: 'AvailableCurrencyData';
  /** Currency code. */
  code?: Maybe<Scalars['String']['output']>;
  /** Currency Symbol. */
  symbol?: Maybe<Scalars['String']['output']>;
};

/** Describes a payment method that the shopper can use to pay for the order. */
export type AvailablePaymentMethod = {
  __typename?: 'AvailablePaymentMethod';
  /** The payment method code. */
  code: Scalars['String']['output'];
  /** If the payment method is an online integration */
  is_deferred: Scalars['Boolean']['output'];
  /** The payment method title. */
  title: Scalars['String']['output'];
};

/** Contains details about the possible shipping methods and carriers. */
export type AvailableShippingMethod = {
  __typename?: 'AvailableShippingMethod';
  /** The cost of shipping using this shipping method. */
  amount: Money;
  /** Indicates whether this shipping method can be applied to the cart. */
  available: Scalars['Boolean']['output'];
  /** @deprecated The field should not be used on the storefront. */
  base_amount?: Maybe<Money>;
  /** A string that identifies a commercial carrier or an offline shipping method. */
  carrier_code: Scalars['String']['output'];
  /** The label for the carrier code. */
  carrier_title: Scalars['String']['output'];
  /** Describes an error condition. */
  error_message?: Maybe<Scalars['String']['output']>;
  /** A shipping method code associated with a carrier. The value could be null if no method is available. */
  method_code?: Maybe<Scalars['String']['output']>;
  /** The label for the shipping method code. The value could be null if no method is available. */
  method_title?: Maybe<Scalars['String']['output']>;
  /** The cost of shipping using this shipping method, excluding tax. */
  price_excl_tax: Money;
  /** The cost of shipping using this shipping method, including tax. */
  price_incl_tax: Money;
};

/** Get the average order value for the seller */
export type AverageOrderValue = {
  __typename?: 'AverageOrderValue';
  /** Formatted average order value */
  avg_order_value?: Maybe<Scalars['String']['output']>;
  /** Formatted average order value string */
  avg_order_value_formatted?: Maybe<Scalars['String']['output']>;
  /** Graph data for visualizing the average order value */
  graph_data?: Maybe<Scalars['String']['output']>;
  /** Graphical value for the average order value */
  graphx_value?: Maybe<Scalars['String']['output']>;
  /** Percentage comparison of the current average order value */
  percent_compare?: Maybe<Scalars['Float']['output']>;
};

export type Banner = {
  __typename?: 'Banner';
  /** banner description */
  bannerDesc?: Maybe<Scalars['String']['output']>;
  /** banner subtitle */
  bannerSubtitle?: Maybe<Scalars['String']['output']>;
  /** banner title */
  bannerTitle?: Maybe<Scalars['String']['output']>;
  /** bannerType */
  bannerType?: Maybe<Scalars['String']['output']>;
  /** button text */
  buttonText?: Maybe<Scalars['String']['output']>;
  /** dominantColor */
  dominantColor?: Maybe<Scalars['String']['output']>;
  /** Id */
  id?: Maybe<Scalars['Int']['output']>;
  /** url */
  url?: Maybe<Scalars['String']['output']>;
  /** urlKey */
  urlKey?: Maybe<Scalars['String']['output']>;
};

/** Banner Data for displaying on the marketplace */
export type Banners = {
  __typename?: 'Banners';
  /** Content to be displayed on the banner */
  content?: Maybe<Scalars['String']['output']>;
  /** Image URL for the banner */
  image?: Maybe<Scalars['String']['output']>;
  /** Text label for the banner button */
  label?: Maybe<Scalars['String']['output']>;
};

export enum BatchMutationStatus {
  Failure = 'FAILURE',
  MixedResults = 'MIXED_RESULTS',
  Success = 'SUCCESS'
}

export type BenefitsData = {
  __typename?: 'BenefitsData';
  /** Icon Image URL */
  iconImgUrl?: Maybe<Scalars['String']['output']>;
  /** Id */
  id?: Maybe<Scalars['Int']['output']>;
  /** Subtitle */
  subtitle?: Maybe<Scalars['String']['output']>;
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
};

/** Billing Address Data */
export type BillingAddressData = {
  __typename?: 'BillingAddressData';
  /** Address */
  address?: Maybe<OrderAddress>;
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
};

/** Defines the billing address. */
export type BillingAddressInput = {
  /** Defines a billing address. */
  address?: InputMaybe<CartAddressInput>;
  /** An ID from the customer's address book that uniquely identifies the address to be used for billing. */
  customer_address_id?: InputMaybe<Scalars['Int']['input']>;
  /** Indicates whether to set the billing address to be the same as the existing shipping address on the cart. */
  same_as_shipping?: InputMaybe<Scalars['Boolean']['input']>;
  /** Indicates whether to set the shipping address to be the same as this billing address. */
  use_for_shipping?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The billing address information */
export type BillingAddressPaymentSourceInput = {
  /** The first line of the address */
  address_line_1?: InputMaybe<Scalars['String']['input']>;
  /** The second line of the address */
  address_line_2?: InputMaybe<Scalars['String']['input']>;
  /** The city of the address */
  city?: InputMaybe<Scalars['String']['input']>;
  /** The country of the address */
  country_code: Scalars['String']['input'];
  /** The postal code of the address */
  postal_code?: InputMaybe<Scalars['String']['input']>;
  /** The region of the address */
  region?: InputMaybe<Scalars['String']['input']>;
};

/** Contains details about the billing address. */
export type BillingCartAddress = CartAddressInterface & {
  __typename?: 'BillingCartAddress';
  /** The city specified for the billing or shipping address. */
  city: Scalars['String']['output'];
  /** The company specified for the billing or shipping address. */
  company?: Maybe<Scalars['String']['output']>;
  /** An object containing the country label and code. */
  country: CartAddressCountry;
  /** @deprecated The field is used only in shipping address. */
  customer_notes?: Maybe<Scalars['String']['output']>;
  /** The customer's fax number. */
  fax?: Maybe<Scalars['String']['output']>;
  /** The first name of the customer or guest. */
  firstname: Scalars['String']['output'];
  /** Id of the customer address. */
  id?: Maybe<Scalars['Int']['output']>;
  /** The last name of the customer or guest. */
  lastname: Scalars['String']['output'];
  /** The middle name of the person associated with the billing/shipping address. */
  middlename?: Maybe<Scalars['String']['output']>;
  /** The ZIP or postal code of the billing or shipping address. */
  postcode?: Maybe<Scalars['String']['output']>;
  /** An honorific, such as Dr., Mr., or Mrs. */
  prefix?: Maybe<Scalars['String']['output']>;
  /** An object containing the region label and code. */
  region?: Maybe<CartAddressRegion>;
  /** An array containing the street for the billing or shipping address. */
  street: Array<Maybe<Scalars['String']['output']>>;
  /** A value such as Sr., Jr., or III. */
  suffix?: Maybe<Scalars['String']['output']>;
  /** The telephone number for the billing or shipping address. */
  telephone?: Maybe<Scalars['String']['output']>;
  /** The unique id of the customer address. */
  uid: Scalars['String']['output'];
  /** The VAT company number for billing or shipping address. */
  vat_id?: Maybe<Scalars['String']['output']>;
};

export type BraintreeCcVaultInput = {
  device_data?: InputMaybe<Scalars['String']['input']>;
  public_hash: Scalars['String']['input'];
};

export type BraintreeInput = {
  /** Contains a fingerprint provided by Braintree JS SDK and should be sent with sale transaction details to the Braintree payment gateway. */
  device_data?: InputMaybe<Scalars['String']['input']>;
  /** States whether the payment details (Credit/Debit Card, PayPal Account) entered by a customer should be tokenized for later usage. Required only if Vault is enabled for the relevant Braintree payment integration. */
  is_active_payment_token_enabler: Scalars['Boolean']['input'];
  /** The one-time payment token generated by Braintree payment gateway based on payment details (Card, PayPal). Required field to make sale transaction. */
  payment_method_nonce: Scalars['String']['input'];
};

export type BraintreeVaultInput = {
  device_data?: InputMaybe<Scalars['String']['input']>;
  public_hash: Scalars['String']['input'];
};

export type BrandType = {
  __typename?: 'BrandType';
  /** Description */
  description?: Maybe<Scalars['String']['output']>;
  /** Id */
  id?: Maybe<Scalars['Int']['output']>;
  /** Items */
  items?: Maybe<Array<Maybe<Banner>>>;
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
};

/** Contains details about an individual category that comprises a breadcrumb. */
export type Breadcrumb = {
  __typename?: 'Breadcrumb';
  /**
   * The ID of the category.
   * @deprecated Use `category_uid` instead.
   */
  category_id?: Maybe<Scalars['Int']['output']>;
  /** The category level. */
  category_level?: Maybe<Scalars['Int']['output']>;
  /** The display name of the category. */
  category_name?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `Breadcrumb` object. */
  category_uid: Scalars['ID']['output'];
  /** The URL key of the category. */
  category_url_key?: Maybe<Scalars['String']['output']>;
  /** The URL path of the category. */
  category_url_path?: Maybe<Scalars['String']['output']>;
};

/** An implementation for bundle product cart items. */
export type BundleCartItem = CartItemInterface & {
  __typename?: 'BundleCartItem';
  /** An array containing the bundle options the shopper selected. */
  bundle_options: Array<Maybe<SelectedBundleOption>>;
  /** An array containing the customizable options the shopper selected. */
  customizable_options: Array<Maybe<SelectedCustomizableOption>>;
  /** An array of errors encountered while loading the cart item */
  errors?: Maybe<Array<Maybe<CartItemError>>>;
  /** The entered gift message for the cart item */
  gift_message?: Maybe<GiftMessage>;
  /** @deprecated Use `uid` instead. */
  id: Scalars['String']['output'];
  /** True if requested quantity is less than available stock, false otherwise. */
  is_available: Scalars['Boolean']['output'];
  /** Message to display when the product is not available with this selected option. */
  not_available_message?: Maybe<Scalars['String']['output']>;
  /** Contains details about the price of the item, including taxes and discounts. */
  prices?: Maybe<CartItemPrices>;
  /** Details about an item in the cart. */
  product: ProductInterface;
  /** The quantity of this item in the cart. */
  quantity: Scalars['Float']['output'];
  /** The unique ID for a `CartItemInterface` object. */
  uid: Scalars['ID']['output'];
};

/** Defines bundle product options for `CreditMemoItemInterface`. */
export type BundleCreditMemoItem = CreditMemoItemInterface & {
  __typename?: 'BundleCreditMemoItem';
  /** A list of bundle options that are assigned to a bundle product that is part of a credit memo. */
  bundle_options?: Maybe<Array<Maybe<ItemSelectedBundleOption>>>;
  /** Details about the final discount amount for the base product, including discounts on options. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** The unique ID for a `CreditMemoItemInterface` object. */
  id: Scalars['ID']['output'];
  /** The order item the credit memo is applied to. */
  order_item?: Maybe<OrderItemInterface>;
  /** The name of the base product. */
  product_name?: Maybe<Scalars['String']['output']>;
  /** The sale price for the base product, including selected options. */
  product_sale_price: Money;
  /** The SKU of the base product. */
  product_sku: Scalars['String']['output'];
  /** The number of refunded items. */
  quantity_refunded?: Maybe<Scalars['Float']['output']>;
};

/** Defines bundle product options for `InvoiceItemInterface`. */
export type BundleInvoiceItem = InvoiceItemInterface & {
  __typename?: 'BundleInvoiceItem';
  /** A list of bundle options that are assigned to an invoiced bundle product. */
  bundle_options?: Maybe<Array<Maybe<ItemSelectedBundleOption>>>;
  /** Information about the final discount amount for the base product, including discounts on options. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** The unique ID for an `InvoiceItemInterface` object. */
  id: Scalars['ID']['output'];
  /** Details about an individual order item. */
  order_item?: Maybe<OrderItemInterface>;
  /** The name of the base product. */
  product_name?: Maybe<Scalars['String']['output']>;
  /** The sale price for the base product including selected options. */
  product_sale_price: Money;
  /** The SKU of the base product. */
  product_sku: Scalars['String']['output'];
  /** The number of invoiced items. */
  quantity_invoiced?: Maybe<Scalars['Float']['output']>;
};

/** Defines an individual item within a bundle product. */
export type BundleItem = {
  __typename?: 'BundleItem';
  /**
   * An ID assigned to each type of item in a bundle product.
   * @deprecated Use `uid` instead
   */
  option_id?: Maybe<Scalars['Int']['output']>;
  /** An array of additional options for this bundle item. */
  options?: Maybe<Array<Maybe<BundleItemOption>>>;
  /** A number indicating the sequence order of this item compared to the other bundle items. */
  position?: Maybe<Scalars['Int']['output']>;
  /** The range of prices for the product */
  price_range: PriceRange;
  /** Indicates whether the item must be included in the bundle. */
  required?: Maybe<Scalars['Boolean']['output']>;
  /** The SKU of the bundle product. */
  sku?: Maybe<Scalars['String']['output']>;
  /** The display name of the item. */
  title?: Maybe<Scalars['String']['output']>;
  /** The input type that the customer uses to select the item. Examples include radio button and checkbox. */
  type?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `BundleItem` object. */
  uid?: Maybe<Scalars['ID']['output']>;
};

/** Defines the characteristics that comprise a specific bundle item and its options. */
export type BundleItemOption = {
  __typename?: 'BundleItemOption';
  /** Indicates whether the customer can change the number of items for this option. */
  can_change_quantity?: Maybe<Scalars['Boolean']['output']>;
  /**
   * The ID assigned to the bundled item option.
   * @deprecated Use `uid` instead
   */
  id?: Maybe<Scalars['Int']['output']>;
  /** Indicates whether this option is the default option. */
  is_default?: Maybe<Scalars['Boolean']['output']>;
  /** The text that identifies the bundled item option. */
  label?: Maybe<Scalars['String']['output']>;
  /** When a bundle item contains multiple options, the relative position of this option compared to the other options. */
  position?: Maybe<Scalars['Int']['output']>;
  /** The price of the selected option. */
  price?: Maybe<Scalars['Float']['output']>;
  /** One of FIXED, PERCENT, or DYNAMIC. */
  price_type?: Maybe<PriceTypeEnum>;
  /** Contains details about this product option. */
  product?: Maybe<ProductInterface>;
  /**
   * Indicates the quantity of this specific bundle item.
   * @deprecated Use `quantity` instead.
   */
  qty?: Maybe<Scalars['Float']['output']>;
  /** The quantity of this specific bundle item. */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** The unique ID for a `BundleItemOption` object. */
  uid: Scalars['ID']['output'];
};

/** Defines the input for a bundle option. */
export type BundleOptionInput = {
  /** The ID of the option. */
  id: Scalars['Int']['input'];
  /** The number of the selected item to add to the cart. */
  quantity: Scalars['Float']['input'];
  /** An array with the chosen value of the option. */
  value: Array<InputMaybe<Scalars['String']['input']>>;
};

/** Defines bundle product options for `OrderItemInterface`. */
export type BundleOrderItem = OrderItemInterface & {
  __typename?: 'BundleOrderItem';
  /** A list of bundle options that are assigned to the bundle product. */
  bundle_options?: Maybe<Array<Maybe<ItemSelectedBundleOption>>>;
  /** The final discount information for the product. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** The entered option for the base product, such as a logo or image. */
  entered_options?: Maybe<Array<Maybe<OrderItemOption>>>;
  /** The selected gift message for the order item */
  gift_message?: Maybe<GiftMessage>;
  /** The unique ID for an `OrderItemInterface` object. */
  id: Scalars['ID']['output'];
  /** The SKU of parent product. */
  parent_sku?: Maybe<Scalars['String']['output']>;
  /** Contains details about the price of the item, including taxes and discounts. */
  prices?: Maybe<OrderItemPrices>;
  /** The ProductInterface object, which contains details about the base product */
  product?: Maybe<ProductInterface>;
  /** The name of the base product. */
  product_name?: Maybe<Scalars['String']['output']>;
  /** The sale price of the base product, including selected options. */
  product_sale_price: Money;
  /** The SKU of the base product. */
  product_sku: Scalars['String']['output'];
  /** The type of product, such as simple, configurable, etc. */
  product_type?: Maybe<Scalars['String']['output']>;
  /** URL key of the base product. */
  product_url_key?: Maybe<Scalars['String']['output']>;
  /** The number of canceled items. */
  quantity_canceled?: Maybe<Scalars['Float']['output']>;
  /** The number of invoiced items. */
  quantity_invoiced?: Maybe<Scalars['Float']['output']>;
  /** The number of units ordered for this item. */
  quantity_ordered?: Maybe<Scalars['Float']['output']>;
  /** The number of refunded items. */
  quantity_refunded?: Maybe<Scalars['Float']['output']>;
  /** The number of returned items. */
  quantity_returned?: Maybe<Scalars['Float']['output']>;
  /** The number of shipped items. */
  quantity_shipped?: Maybe<Scalars['Float']['output']>;
  /** The selected options for the base product, such as color or size. */
  selected_options?: Maybe<Array<Maybe<OrderItemOption>>>;
  /** The status of the order item. */
  status?: Maybe<Scalars['String']['output']>;
};

/** Defines basic features of a bundle product and contains multiple BundleItems. */
export type BundleProduct = CustomizableProductInterface & PhysicalProductInterface & ProductInterface & RoutableInterface & {
  __typename?: 'BundleProduct';
  /** The productdata query returns the product attributes */
  attributeValues?: Maybe<Array<Maybe<ProductAttributes>>>;
  /**
   * The attribute set assigned to the product.
   * @deprecated The field should not be used on the storefront.
   */
  attribute_set_id?: Maybe<Scalars['Int']['output']>;
  /** Name of the product attribute set */
  attribute_set_name?: Maybe<Scalars['String']['output']>;
  /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled. */
  canonical_url?: Maybe<Scalars['String']['output']>;
  /** The categories assigned to a product. */
  categories?: Maybe<Array<Maybe<CategoryInterface>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  color?: Maybe<Scalars['Int']['output']>;
  /** The product's country of origin. */
  country_of_manufacture?: Maybe<Scalars['String']['output']>;
  /**
   * Timestamp indicating when the product was created.
   * @deprecated The field should not be used on the storefront.
   */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Crosssell Products */
  crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** Product custom attributes. */
  custom_attributesV2?: Maybe<ProductCustomAttributes>;
  /** Reason for denying the product listing */
  deny_reason?: Maybe<DenyReason>;
  /** Detailed information about the product. The value can include simple HTML tags. */
  description?: Maybe<ComplexTextValue>;
  /** Indicates whether the bundle product has a dynamic price. */
  dynamic_price?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the bundle product has a dynamic SKU. */
  dynamic_sku?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the bundle product has a dynamically calculated weight. */
  dynamic_weight?: Maybe<Scalars['Boolean']['output']>;
  /** Returns a value indicating gift message availability for the product. */
  gift_message_available: Scalars['Boolean']['output'];
  /**
   * The ID number assigned to the product.
   * @deprecated Use the `uid` field instead.
   */
  id?: Maybe<Scalars['Int']['output']>;
  /** The relative path to the main image on the product page. */
  image?: Maybe<ProductImage>;
  /** An array containing information about individual bundle items. */
  items?: Maybe<Array<Maybe<BundleItem>>>;
  /**
   * A number representing the product's manufacturer.
   * @deprecated Use the `custom_attributes` field instead.
   */
  manufacturer?: Maybe<Scalars['Int']['output']>;
  /** Maximum Qty Allowed in Shopping Cart */
  max_sale_qty?: Maybe<Scalars['Float']['output']>;
  /** An array of media gallery objects. */
  media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
  /**
   * An array of MediaGalleryEntry objects.
   * @deprecated Use `media_gallery` instead.
   */
  media_gallery_entries?: Maybe<Array<Maybe<MediaGalleryEntry>>>;
  /** A brief overview of the product for search results listings, maximum 255 characters. */
  meta_description?: Maybe<Scalars['String']['output']>;
  /** A comma-separated list of keywords that are visible only to search engines. */
  meta_keyword?: Maybe<Scalars['String']['output']>;
  /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
  meta_title?: Maybe<Scalars['String']['output']>;
  /** Minimum Qty Allowed in Shopping Cart */
  min_sale_qty?: Maybe<Scalars['Float']['output']>;
  /** The product name. Customers use this name to identify the product. */
  name?: Maybe<Scalars['String']['output']>;
  /** The beginning date for new product listings, and determines if the product is featured as a new product. */
  new_from_date?: Maybe<Scalars['String']['output']>;
  /** The end date for new product listings. */
  new_to_date?: Maybe<Scalars['String']['output']>;
  /** Product stock only x left count */
  only_x_left_in_stock?: Maybe<Scalars['Float']['output']>;
  /** An array of options for a customizable product. */
  options?: Maybe<Array<Maybe<CustomizableOptionInterface>>>;
  /** If the product has multiple options, determines where they appear on the product page. */
  options_container?: Maybe<Scalars['String']['output']>;
  /**
   * Indicates the price of an item.
   * @deprecated Use `price_range` for product price information.
   */
  price?: Maybe<ProductPrices>;
  /** The price details of the main product */
  price_details?: Maybe<PriceDetails>;
  /** The range of prices for the product */
  price_range: PriceRange;
  /** An array of `TierPrice` objects. */
  price_tiers?: Maybe<Array<Maybe<TierPrice>>>;
  /** One of PRICE_RANGE or AS_LOW_AS. */
  price_view?: Maybe<PriceViewEnum>;
  /** An array of `ProductLinks` objects. */
  product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>;
  /** Current status of the product */
  product_status?: Maybe<Scalars['String']['output']>;
  /** Quantity available for the product */
  qty?: Maybe<Scalars['Int']['output']>;
  /** Quantity of the product confirmed for sale */
  qty_confirmed?: Maybe<ProductQtyConfirmed>;
  /** Quantity of the product pending sale */
  qty_pending?: Maybe<ProductQtyPending>;
  /** Quantity of the product sold */
  qty_sold?: Maybe<ProductQtySold>;
  /** Amount of available stock */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** The average of all the ratings given to the product. */
  rating_summary: Scalars['Float']['output'];
  /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
  redirect_code: Scalars['Int']['output'];
  /** An array of products to be displayed in a Related Products block. */
  related_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
  relative_url?: Maybe<Scalars['String']['output']>;
  /** The total count of all the reviews given to the product. */
  review_count: Scalars['Int']['output'];
  /** The list of products reviews. */
  reviews: ProductReviews;
  /** @deprecated Use the `custom_attributes` field instead. */
  seller_id?: Maybe<Scalars['Int']['output']>;
  /** Indicates whether to ship bundle items together or individually. */
  ship_bundle_items?: Maybe<ShipBundleItemsEnum>;
  /** A short description of the product. Its use depends on the theme. */
  short_description?: Maybe<ComplexTextValue>;
  /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
  sku?: Maybe<Scalars['String']['output']>;
  /** The relative path to the small image, which is used on catalog pages. */
  small_image?: Maybe<ProductImage>;
  /**
   * The beginning date that a product has a special price.
   * @deprecated The field should not be used on the storefront.
   */
  special_from_date?: Maybe<Scalars['String']['output']>;
  /** The discounted price of the product. */
  special_price?: Maybe<Scalars['Float']['output']>;
  /** The end date for a product with a special price. */
  special_to_date?: Maybe<Scalars['String']['output']>;
  /** Stock status of the product */
  stock_status?: Maybe<ProductStockStatus>;
  /** The file name of a swatch image. */
  swatch_image?: Maybe<Scalars['String']['output']>;
  /** The relative path to the product's thumbnail image. */
  thumbnail?: Maybe<ProductImage>;
  /**
   * The price when tier pricing is in effect and the items purchased threshold has been reached.
   * @deprecated Use `price_tiers` for product tier price information.
   */
  tier_price?: Maybe<Scalars['Float']['output']>;
  /**
   * An array of ProductTierPrices objects.
   * @deprecated Use `price_tiers` for product tier price information.
   */
  tier_prices?: Maybe<Array<Maybe<ProductTierPrices>>>;
  /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
  type?: Maybe<UrlRewriteEntityTypeEnum>;
  /**
   * One of simple, virtual, bundle, downloadable, grouped, or configurable.
   * @deprecated Use `__typename` instead.
   */
  type_id?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `ProductInterface` object. */
  uid: Scalars['ID']['output'];
  /**
   * Timestamp indicating when the product was updated.
   * @deprecated The field should not be used on the storefront.
   */
  updated_at?: Maybe<Scalars['String']['output']>;
  /** Upsell Products */
  upsell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The part of the URL that identifies the product */
  url_key?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use product's `canonical_url` or url rewrites instead */
  url_path?: Maybe<Scalars['String']['output']>;
  /** URL rewrites list */
  url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>;
  /** The part of the product URL that is appended after the url key */
  url_suffix?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  voguish_featured?: Maybe<Scalars['String']['output']>;
  /**
   * An array of websites in which the product is available.
   * @deprecated The field should not be used on the storefront.
   */
  websites?: Maybe<Array<Maybe<Website>>>;
  /** The weight of the item, in units defined by the store. */
  weight?: Maybe<Scalars['Float']['output']>;
};


/** Defines basic features of a bundle product and contains multiple BundleItems. */
export type BundleProductAttributeValuesArgs = {
  attributeCode?: InputMaybe<Array<InputMaybe<AttributeCodeInput>>>;
};


/** Defines basic features of a bundle product and contains multiple BundleItems. */
export type BundleProductCustom_AttributesV2Args = {
  filters?: InputMaybe<AttributeFilterInput>;
};


/** Defines basic features of a bundle product and contains multiple BundleItems. */
export type BundleProductReviewsArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

/** Defines a single bundle product. */
export type BundleProductCartItemInput = {
  /** A mandatory array of options for the bundle product, including each chosen option and specified quantity. */
  bundle_options: Array<InputMaybe<BundleOptionInput>>;
  /** The ID and value of the option. */
  customizable_options?: InputMaybe<Array<InputMaybe<CustomizableOptionInput>>>;
  /** The quantity and SKU of the bundle product. */
  data: CartItemInput;
};

/** Defines bundle product options for `ShipmentItemInterface`. */
export type BundleShipmentItem = ShipmentItemInterface & {
  __typename?: 'BundleShipmentItem';
  /** A list of bundle options that are assigned to a shipped product. */
  bundle_options?: Maybe<Array<Maybe<ItemSelectedBundleOption>>>;
  /** The unique ID for a `ShipmentItemInterface` object. */
  id: Scalars['ID']['output'];
  /** The order item associated with the shipment item. */
  order_item?: Maybe<OrderItemInterface>;
  /** The name of the base product. */
  product_name?: Maybe<Scalars['String']['output']>;
  /** The sale price for the base product. */
  product_sale_price: Money;
  /** The SKU of the base product. */
  product_sku: Scalars['String']['output'];
  /** The number of shipped items. */
  quantity_shipped: Scalars['Float']['output'];
};

/** Defines bundle product options for `WishlistItemInterface`. */
export type BundleWishlistItem = WishlistItemInterface & {
  __typename?: 'BundleWishlistItem';
  /** The date and time the item was added to the wish list. */
  added_at: Scalars['String']['output'];
  /** An array containing information about the selected bundle items. */
  bundle_options?: Maybe<Array<Maybe<SelectedBundleOption>>>;
  /** Custom options selected for the wish list item. */
  customizable_options: Array<Maybe<SelectedCustomizableOption>>;
  /** The description of the item. */
  description?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `WishlistItemInterface` object. */
  id: Scalars['ID']['output'];
  /** Product details of the wish list item. */
  product?: Maybe<ProductInterface>;
  /** The quantity of this wish list item. */
  quantity: Scalars['Float']['output'];
};

export type ButtonStyles = {
  __typename?: 'ButtonStyles';
  /** The button color */
  color?: Maybe<Scalars['String']['output']>;
  /** The button height in pixels */
  height?: Maybe<Scalars['Int']['output']>;
  /** The button label */
  label?: Maybe<Scalars['String']['output']>;
  /** The button layout */
  layout?: Maybe<Scalars['String']['output']>;
  /** The button shape */
  shape?: Maybe<Scalars['String']['output']>;
  /** Indicates whether the tagline is displayed */
  tagline?: Maybe<Scalars['Boolean']['output']>;
  /** Defines if the button uses default height. If the value is false, the value of height is used */
  use_default_height?: Maybe<Scalars['Boolean']['output']>;
};

/** Buyer Data */
export type BuyerData = {
  __typename?: 'BuyerData';
  /** Email Label */
  emailLabel?: Maybe<Scalars['String']['output']>;
  /** Email Value */
  emailValue?: Maybe<Scalars['String']['output']>;
  /** Name Label */
  nameLabel?: Maybe<Scalars['String']['output']>;
  /** Name Value */
  nameValue?: Maybe<Scalars['String']['output']>;
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
};

export type CancelOrderError = {
  __typename?: 'CancelOrderError';
  /** An error code that is specific to cancel order. */
  code: CancelOrderErrorCode;
  /** A localized error message. */
  message: Scalars['String']['output'];
};

export enum CancelOrderErrorCode {
  InvalidOrderStatus = 'INVALID_ORDER_STATUS',
  OrderCancellationDisabled = 'ORDER_CANCELLATION_DISABLED',
  OrderNotFound = 'ORDER_NOT_FOUND',
  PartialOrderItemShipped = 'PARTIAL_ORDER_ITEM_SHIPPED',
  Unauthorised = 'UNAUTHORISED',
  Undefined = 'UNDEFINED'
}

/** Defines the order to cancel. */
export type CancelOrderInput = {
  /** The unique ID of an `Order` type. */
  order_id: Scalars['ID']['input'];
  /** Cancellation reason. */
  reason: Scalars['String']['input'];
};

/** Contains the updated customer order and error message if any. */
export type CancelOrderOutput = {
  __typename?: 'CancelOrderOutput';
  /** Error encountered while cancelling the order. */
  error?: Maybe<Scalars['String']['output']>;
  errorV2?: Maybe<CancelOrderError>;
  /** Updated customer order. */
  order?: Maybe<CustomerOrder>;
};

export type CancellationReason = {
  __typename?: 'CancellationReason';
  description: Scalars['String']['output'];
};

export type Card = {
  __typename?: 'Card';
  /** Card bin details */
  bin_details?: Maybe<CardBin>;
  /** Expiration month of the card */
  card_expiry_month?: Maybe<Scalars['String']['output']>;
  /** Expiration year of the card */
  card_expiry_year?: Maybe<Scalars['String']['output']>;
  /** Last four digits of the card */
  last_digits?: Maybe<Scalars['String']['output']>;
  /** Name on the card */
  name?: Maybe<Scalars['String']['output']>;
};

export type CardBin = {
  __typename?: 'CardBin';
  /** Card bin number */
  bin?: Maybe<Scalars['String']['output']>;
};

/** The card payment source information */
export type CardPaymentSourceInput = {
  /** The billing address of the card */
  billing_address: BillingAddressPaymentSourceInput;
  /** The name on the cardholder */
  name?: InputMaybe<Scalars['String']['input']>;
};

/** The card payment source information */
export type CardPaymentSourceOutput = {
  __typename?: 'CardPaymentSourceOutput';
  /** The brand of the card */
  brand?: Maybe<Scalars['String']['output']>;
  /** The expiry of the card */
  expiry?: Maybe<Scalars['String']['output']>;
  /** The last digits of the card */
  last_digits?: Maybe<Scalars['String']['output']>;
};

/** Contains the contents and other details about a guest or customer cart. */
export type Cart = {
  __typename?: 'Cart';
  /** @deprecated Use `applied_coupons` instead. */
  applied_coupon?: Maybe<AppliedCoupon>;
  /** An array of `AppliedCoupon` objects. Each object contains the `code` text attribute, which specifies the coupon code. */
  applied_coupons?: Maybe<Array<Maybe<AppliedCoupon>>>;
  /** An array of available payment methods. */
  available_payment_methods?: Maybe<Array<Maybe<AvailablePaymentMethod>>>;
  /** The billing address assigned to the cart. */
  billing_address?: Maybe<BillingCartAddress>;
  /** The email address of the guest or customer. */
  email?: Maybe<Scalars['String']['output']>;
  /** The entered gift message for the cart */
  gift_message?: Maybe<GiftMessage>;
  /** The unique ID for a `Cart` object. */
  id: Scalars['ID']['output'];
  /** Indicates whether the cart contains only virtual products. */
  is_virtual: Scalars['Boolean']['output'];
  /**
   * An array of products that have been added to the cart.
   * @deprecated Use `itemsV2` instead.
   */
  items?: Maybe<Array<Maybe<CartItemInterface>>>;
  itemsV2?: Maybe<CartItems>;
  /** Pricing details for the quote. */
  prices?: Maybe<CartPrices>;
  /** Indicates which payment method was applied to the cart. */
  selected_payment_method?: Maybe<SelectedPaymentMethod>;
  /** An array of shipping addresses assigned to the cart. */
  shipping_addresses: Array<Maybe<ShippingCartAddress>>;
  /** The total number of items in the cart. */
  total_quantity: Scalars['Float']['output'];
};


/** Contains the contents and other details about a guest or customer cart. */
export type CartItemsV2Args = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<QuoteItemsSortInput>;
};

/** Contains details the country in a billing or shipping address. */
export type CartAddressCountry = {
  __typename?: 'CartAddressCountry';
  /** The country code. */
  code: Scalars['String']['output'];
  /** The display label for the country. */
  label: Scalars['String']['output'];
};

/** Defines the billing or shipping address to be applied to the cart. */
export type CartAddressInput = {
  /** The city specified for the billing or shipping address. */
  city: Scalars['String']['input'];
  /** The company specified for the billing or shipping address. */
  company?: InputMaybe<Scalars['String']['input']>;
  /** The country code and label for the billing or shipping address. */
  country_code: Scalars['String']['input'];
  /** The customer's fax number. */
  fax?: InputMaybe<Scalars['String']['input']>;
  /** The first name of the customer or guest. */
  firstname: Scalars['String']['input'];
  /** The last name of the customer or guest. */
  lastname: Scalars['String']['input'];
  /** The middle name of the person associated with the billing/shipping address. */
  middlename?: InputMaybe<Scalars['String']['input']>;
  /** The ZIP or postal code of the billing or shipping address. */
  postcode?: InputMaybe<Scalars['String']['input']>;
  /** An honorific, such as Dr., Mr., or Mrs. */
  prefix?: InputMaybe<Scalars['String']['input']>;
  /** A string that defines the state or province of the billing or shipping address. */
  region?: InputMaybe<Scalars['String']['input']>;
  /** An integer that defines the state or province of the billing or shipping address. */
  region_id?: InputMaybe<Scalars['Int']['input']>;
  /** Determines whether to save the address in the customer's address book. The default value is true. */
  save_in_address_book?: InputMaybe<Scalars['Boolean']['input']>;
  /** An array containing the street for the billing or shipping address. */
  street: Array<InputMaybe<Scalars['String']['input']>>;
  /** A value such as Sr., Jr., or III. */
  suffix?: InputMaybe<Scalars['String']['input']>;
  /** The telephone number for the billing or shipping address. */
  telephone?: InputMaybe<Scalars['String']['input']>;
  /** The VAT company number for billing or shipping address. */
  vat_id?: InputMaybe<Scalars['String']['input']>;
};

export type CartAddressInterface = {
  /** The city specified for the billing or shipping address. */
  city: Scalars['String']['output'];
  /** The company specified for the billing or shipping address. */
  company?: Maybe<Scalars['String']['output']>;
  /** An object containing the country label and code. */
  country: CartAddressCountry;
  /** The customer's fax number. */
  fax?: Maybe<Scalars['String']['output']>;
  /** The first name of the customer or guest. */
  firstname: Scalars['String']['output'];
  /** Id of the customer address. */
  id?: Maybe<Scalars['Int']['output']>;
  /** The last name of the customer or guest. */
  lastname: Scalars['String']['output'];
  /** The middle name of the person associated with the billing/shipping address. */
  middlename?: Maybe<Scalars['String']['output']>;
  /** The ZIP or postal code of the billing or shipping address. */
  postcode?: Maybe<Scalars['String']['output']>;
  /** An honorific, such as Dr., Mr., or Mrs. */
  prefix?: Maybe<Scalars['String']['output']>;
  /** An object containing the region label and code. */
  region?: Maybe<CartAddressRegion>;
  /** An array containing the street for the billing or shipping address. */
  street: Array<Maybe<Scalars['String']['output']>>;
  /** A value such as Sr., Jr., or III. */
  suffix?: Maybe<Scalars['String']['output']>;
  /** The telephone number for the billing or shipping address. */
  telephone?: Maybe<Scalars['String']['output']>;
  /** The unique id of the customer address. */
  uid: Scalars['String']['output'];
  /** The VAT company number for billing or shipping address. */
  vat_id?: Maybe<Scalars['String']['output']>;
};

/** Contains details about the region in a billing or shipping address. */
export type CartAddressRegion = {
  __typename?: 'CartAddressRegion';
  /** The state or province code. */
  code?: Maybe<Scalars['String']['output']>;
  /** The display label for the region. */
  label?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a pre-defined region. */
  region_id?: Maybe<Scalars['Int']['output']>;
};

/** Contains information about discounts applied to the cart. */
export type CartDiscount = {
  __typename?: 'CartDiscount';
  /** The amount of the discount applied to the item. */
  amount: Money;
  /** The description of the discount. */
  label: Array<Maybe<Scalars['String']['output']>>;
};

export enum CartDiscountType {
  Item = 'ITEM',
  Shipping = 'SHIPPING'
}

export type CartItemError = {
  __typename?: 'CartItemError';
  /** An error code that describes the error encountered */
  code: CartItemErrorType;
  /** A localized error message */
  message: Scalars['String']['output'];
};

export enum CartItemErrorType {
  ItemIncrements = 'ITEM_INCREMENTS',
  ItemQty = 'ITEM_QTY',
  Undefined = 'UNDEFINED'
}

/** Defines an item to be added to the cart. */
export type CartItemInput = {
  /** An array of entered options for the base product, such as personalization text. */
  entered_options?: InputMaybe<Array<InputMaybe<EnteredOptionInput>>>;
  /** For a child product, the SKU of its parent product. */
  parent_sku?: InputMaybe<Scalars['String']['input']>;
  /** The amount or number of an item to add. */
  quantity: Scalars['Float']['input'];
  /** The selected options for the base product, such as color or size, using the unique ID for an object such as `CustomizableRadioOption`, `CustomizableDropDownOption`, or `ConfigurableProductOptionsValues`. */
  selected_options?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** The SKU of the product. */
  sku: Scalars['String']['input'];
};

/** An interface for products in a cart. */
export type CartItemInterface = {
  /** An array of errors encountered while loading the cart item */
  errors?: Maybe<Array<Maybe<CartItemError>>>;
  /** @deprecated Use `uid` instead. */
  id: Scalars['String']['output'];
  /** True if requested quantity is less than available stock, false otherwise. */
  is_available: Scalars['Boolean']['output'];
  /** Message to display when the product is not available with this selected option. */
  not_available_message?: Maybe<Scalars['String']['output']>;
  /** Contains details about the price of the item, including taxes and discounts. */
  prices?: Maybe<CartItemPrices>;
  /** Details about an item in the cart. */
  product: ProductInterface;
  /** The quantity of this item in the cart. */
  quantity: Scalars['Float']['output'];
  /** The unique ID for a `CartItemInterface` object. */
  uid: Scalars['ID']['output'];
};

/** Contains details about the price of the item, including taxes and discounts. */
export type CartItemPrices = {
  __typename?: 'CartItemPrices';
  /** The price discount for the unit price of the item represents the difference between its regular price and final price. */
  catalog_discount?: Maybe<ProductDiscount>;
  /** An array of discounts to be applied to the cart item. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** An array of FPTs applied to the cart item. */
  fixed_product_taxes?: Maybe<Array<Maybe<FixedProductTax>>>;
  /** The value of the original unit price for the item, including discounts. */
  original_item_price: Money;
  /** The value of the original price multiplied by the quantity of the item. */
  original_row_total: Money;
  /** The price of the item before any discounts were applied. The price that might include tax, depending on the configured display settings for cart. */
  price: Money;
  /** The price of the item before any discounts were applied. The price that might include tax, depending on the configured display settings for cart. */
  price_including_tax: Money;
  /** The price discount multiplied by the item quantity represents the total difference between the regular price and the final price for the entire quote item. */
  row_catalog_discount?: Maybe<ProductDiscount>;
  /** The value of the price multiplied by the quantity of the item. */
  row_total: Money;
  /** The value of `row_total` plus the tax applied to the item. */
  row_total_including_tax: Money;
  /** The total of all discounts applied to the item. */
  total_item_discount?: Maybe<Money>;
};

/** Deprecated: The `ShippingCartAddress.cart_items` field now returns `CartItemInterface`. */
export type CartItemQuantity = {
  __typename?: 'CartItemQuantity';
  /** @deprecated The `ShippingCartAddress.cart_items` field now returns `CartItemInterface`. */
  cart_item_id: Scalars['Int']['output'];
  /** @deprecated The `ShippingCartAddress.cart_items` field now returns `CartItemInterface`. */
  quantity: Scalars['Float']['output'];
};

/** Contains details about the price of a selected customizable value. */
export type CartItemSelectedOptionValuePrice = {
  __typename?: 'CartItemSelectedOptionValuePrice';
  /** Indicates whether the price type is fixed, percent, or dynamic. */
  type: PriceTypeEnum;
  /** A string that describes the unit of the value. */
  units: Scalars['String']['output'];
  /** A price value. */
  value: Scalars['Float']['output'];
};

/** A single item to be updated. */
export type CartItemUpdateInput = {
  /** Deprecated. Use `cart_item_uid` instead. */
  cart_item_id?: InputMaybe<Scalars['Int']['input']>;
  /** The unique ID for a `CartItemInterface` object. */
  cart_item_uid?: InputMaybe<Scalars['ID']['input']>;
  /** An array that defines customizable options for the product. */
  customizable_options?: InputMaybe<Array<InputMaybe<CustomizableOptionInput>>>;
  /** Gift message details for the cart item */
  gift_message?: InputMaybe<GiftMessageInput>;
  /** The new quantity of the item. */
  quantity?: InputMaybe<Scalars['Float']['input']>;
};

export type CartItems = {
  __typename?: 'CartItems';
  /** An array of products that have been added to the cart. */
  items: Array<Maybe<CartItemInterface>>;
  /** Metadata for pagination rendering. */
  page_info?: Maybe<SearchResultPageInfo>;
  /** The number of returned cart items. */
  total_count: Scalars['Int']['output'];
};

/** Contains details about the final price of items in the cart, including discount and tax information. */
export type CartPrices = {
  __typename?: 'CartPrices';
  /** An array containing the names and amounts of taxes applied to each item in the cart. */
  applied_taxes?: Maybe<Array<Maybe<CartTaxItem>>>;
  /** @deprecated Use discounts instead. */
  discount?: Maybe<CartDiscount>;
  /** An array containing cart rule discounts, store credit and gift cards applied to the cart. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** The total, including discounts, taxes, shipping, and other fees. */
  grand_total?: Maybe<Money>;
  /** The total of the cart, including discounts, shipping, and other fees without tax. */
  grand_total_excluding_tax?: Maybe<Money>;
  /** The subtotal without any applied taxes. */
  subtotal_excluding_tax?: Maybe<Money>;
  /** The subtotal including any applied taxes. */
  subtotal_including_tax?: Maybe<Money>;
  /** The subtotal with any discounts applied, but not taxes. */
  subtotal_with_discount_excluding_tax?: Maybe<Money>;
};

/** Contains tax information about an item in the cart. */
export type CartTaxItem = {
  __typename?: 'CartTaxItem';
  /** The amount of tax applied to the item. */
  amount: Money;
  /** The description of the tax. */
  label: Scalars['String']['output'];
};

export type CartUserInputError = Error & {
  __typename?: 'CartUserInputError';
  /** A cart-specific error code. */
  code: CartUserInputErrorType;
  /** A localized error message. */
  message: Scalars['String']['output'];
};

export enum CartUserInputErrorType {
  CouldNotFindCartItem = 'COULD_NOT_FIND_CART_ITEM',
  InsufficientStock = 'INSUFFICIENT_STOCK',
  InvalidParameterValue = 'INVALID_PARAMETER_VALUE',
  NotSalable = 'NOT_SALABLE',
  ProductNotFound = 'PRODUCT_NOT_FOUND',
  RequiredParameterMissing = 'REQUIRED_PARAMETER_MISSING',
  Undefined = 'UNDEFINED'
}

export enum CatalogAttributeApplyToEnum {
  Bundle = 'BUNDLE',
  Category = 'CATEGORY',
  Configurable = 'CONFIGURABLE',
  Downloadable = 'DOWNLOADABLE',
  Grouped = 'GROUPED',
  Simple = 'SIMPLE',
  Virtual = 'VIRTUAL'
}

/** Swatch attribute metadata. */
export type CatalogAttributeMetadata = CustomAttributeMetadataInterface & {
  __typename?: 'CatalogAttributeMetadata';
  /** To which catalog types an attribute can be applied. */
  apply_to?: Maybe<Array<Maybe<CatalogAttributeApplyToEnum>>>;
  /** The unique identifier for an attribute code. This value should be in lowercase letters without spaces. */
  code: Scalars['ID']['output'];
  /** Default attribute value. */
  default_value?: Maybe<Scalars['String']['output']>;
  /** The type of entity that defines the attribute. */
  entity_type: AttributeEntityTypeEnum;
  /** The frontend class of the attribute. */
  frontend_class?: Maybe<Scalars['String']['output']>;
  /** The frontend input type of the attribute. */
  frontend_input?: Maybe<AttributeFrontendInputEnum>;
  /** Whether a product or category attribute can be compared against another or not. */
  is_comparable?: Maybe<Scalars['Boolean']['output']>;
  /** Whether a product or category attribute can be filtered or not. */
  is_filterable?: Maybe<Scalars['Boolean']['output']>;
  /** Whether a product or category attribute can be filtered in search or not. */
  is_filterable_in_search?: Maybe<Scalars['Boolean']['output']>;
  /** Whether a product or category attribute can use HTML on front or not. */
  is_html_allowed_on_front?: Maybe<Scalars['Boolean']['output']>;
  /** Whether the attribute value is required. */
  is_required: Scalars['Boolean']['output'];
  /** Whether a product or category attribute can be searched or not. */
  is_searchable?: Maybe<Scalars['Boolean']['output']>;
  /** Whether the attribute value must be unique. */
  is_unique: Scalars['Boolean']['output'];
  /** Whether a product or category attribute can be used for price rules or not. */
  is_used_for_price_rules?: Maybe<Scalars['Boolean']['output']>;
  /** Whether a product or category attribute is used for promo rules or not. */
  is_used_for_promo_rules?: Maybe<Scalars['Boolean']['output']>;
  /** Whether a product or category attribute is visible in advanced search or not. */
  is_visible_in_advanced_search?: Maybe<Scalars['Boolean']['output']>;
  /** Whether a product or category attribute is visible on front or not. */
  is_visible_on_front?: Maybe<Scalars['Boolean']['output']>;
  /** Whether a product or category attribute has WYSIWYG enabled or not. */
  is_wysiwyg_enabled?: Maybe<Scalars['Boolean']['output']>;
  /** The label assigned to the attribute. */
  label?: Maybe<Scalars['String']['output']>;
  /** Attribute options. */
  options: Array<Maybe<CustomAttributeOptionInterface>>;
  /** Input type of the swatch attribute option. */
  swatch_input_type?: Maybe<SwatchInputTypeEnum>;
  /** Whether update product preview image or not. */
  update_product_preview_image?: Maybe<Scalars['Boolean']['output']>;
  /** Whether use product image for swatch or not. */
  use_product_image_for_swatch?: Maybe<Scalars['Boolean']['output']>;
  /** Whether a product or category attribute is used in product listing or not. */
  used_in_product_listing?: Maybe<Scalars['Boolean']['output']>;
};

export type CategoryContent = {
  __typename?: 'CategoryContent';
  /** category cms html data */
  html?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Boolean']['output']>;
};

/** Defines the filters to be used in the search. A filter contains at least one attribute, a comparison operator, and the value that is being searched for. */
export type CategoryFilterInput = {
  /** Filter by the unique category ID for a `CategoryInterface` object. */
  category_uid?: InputMaybe<FilterEqualTypeInput>;
  /** Deprecated: use 'category_uid' to filter uniquely identifiers of categories. */
  ids?: InputMaybe<FilterEqualTypeInput>;
  /** Filter by the display name of the category. */
  name?: InputMaybe<FilterMatchTypeInput>;
  /** Filter by the unique parent category ID for a `CategoryInterface` object. */
  parent_category_uid?: InputMaybe<FilterEqualTypeInput>;
  /** Filter by the unique parent category ID for a `CategoryInterface` object. */
  parent_id?: InputMaybe<FilterEqualTypeInput>;
  /** Filter by the part of the URL that identifies the category. */
  url_key?: InputMaybe<FilterEqualTypeInput>;
  /** Filter by the URL path for the category. */
  url_path?: InputMaybe<FilterEqualTypeInput>;
};

/** Contains the full set of attributes that can be returned in a category search. */
export type CategoryInterface = {
  available_sort_by?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** An array of breadcrumb items. */
  breadcrumbs?: Maybe<Array<Maybe<Breadcrumb>>>;
  /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Categories' is enabled. */
  canonical_url?: Maybe<Scalars['String']['output']>;
  children_count?: Maybe<Scalars['String']['output']>;
  /** Contains a category CMS block. */
  cms_block?: Maybe<CmsBlock>;
  /**
   * The timestamp indicating when the category was created.
   * @deprecated The field should not be used on the storefront.
   */
  created_at?: Maybe<Scalars['String']['output']>;
  custom_layout_update_file?: Maybe<Scalars['String']['output']>;
  /** The attribute to use for sorting. */
  default_sort_by?: Maybe<Scalars['String']['output']>;
  /** An optional description of the category. */
  description?: Maybe<Scalars['String']['output']>;
  display_mode?: Maybe<Scalars['String']['output']>;
  filter_price_range?: Maybe<Scalars['Float']['output']>;
  /**
   * An ID that uniquely identifies the category.
   * @deprecated Use `uid` instead.
   */
  id?: Maybe<Scalars['Int']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  include_in_menu?: Maybe<Scalars['Int']['output']>;
  is_anchor?: Maybe<Scalars['Int']['output']>;
  landing_page?: Maybe<Scalars['Int']['output']>;
  /** The depth of the category within the tree. */
  level?: Maybe<Scalars['Int']['output']>;
  meta_description?: Maybe<Scalars['String']['output']>;
  meta_keywords?: Maybe<Scalars['String']['output']>;
  meta_title?: Maybe<Scalars['String']['output']>;
  /** The display name of the category. */
  name?: Maybe<Scalars['String']['output']>;
  /** The full category path. */
  path?: Maybe<Scalars['String']['output']>;
  /** The category path within the store. */
  path_in_store?: Maybe<Scalars['String']['output']>;
  /** The position of the category relative to other categories at the same level in tree. */
  position?: Maybe<Scalars['Int']['output']>;
  /** The number of products in the category that are marked as visible. By default, in complex products, parent products are visible, but their child products are not. */
  product_count?: Maybe<Scalars['Int']['output']>;
  /** The list of products assigned to the category. */
  products?: Maybe<CategoryProducts>;
  /** The unique ID for a `CategoryInterface` object. */
  uid: Scalars['ID']['output'];
  /**
   * The timestamp indicating when the category was updated.
   * @deprecated The field should not be used on the storefront.
   */
  updated_at?: Maybe<Scalars['String']['output']>;
  /** The URL key assigned to the category. */
  url_key?: Maybe<Scalars['String']['output']>;
  /** The URL path assigned to the category. */
  url_path?: Maybe<Scalars['String']['output']>;
  /** The part of the category URL that is appended after the url key */
  url_suffix?: Maybe<Scalars['String']['output']>;
};


/** Contains the full set of attributes that can be returned in a category search. */
export type CategoryInterfaceProductsArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<ProductAttributeSortInput>;
};

/** Contains details about the products assigned to a category. */
export type CategoryProducts = {
  __typename?: 'CategoryProducts';
  /** An array of products that are assigned to the category. */
  items?: Maybe<Array<Maybe<ProductInterface>>>;
  /** Pagination metadata. */
  page_info?: Maybe<SearchResultPageInfo>;
  /** The number of products in the category that are marked as visible. By default, in complex products, parent products are visible, but their child products are not. */
  total_count?: Maybe<Scalars['Int']['output']>;
};

/** Contains a collection of `CategoryTree` objects and pagination information. */
export type CategoryResult = {
  __typename?: 'CategoryResult';
  /** A list of categories that match the filter criteria. */
  items?: Maybe<Array<Maybe<CategoryTree>>>;
  /** An object that includes the `page_info` and `currentPage` values specified in the query. */
  page_info?: Maybe<SearchResultPageInfo>;
  /** The total number of categories that match the criteria. */
  total_count?: Maybe<Scalars['Int']['output']>;
};

/** Contains the hierarchy of categories. */
export type CategoryTree = CategoryInterface & RoutableInterface & {
  __typename?: 'CategoryTree';
  available_sort_by?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** An array of breadcrumb items. */
  breadcrumbs?: Maybe<Array<Maybe<Breadcrumb>>>;
  /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Categories' is enabled. */
  canonical_url?: Maybe<Scalars['String']['output']>;
  /** A tree of child categories. */
  children?: Maybe<Array<Maybe<CategoryTree>>>;
  children_count?: Maybe<Scalars['String']['output']>;
  /** Contains a category CMS block. */
  cms_block?: Maybe<CmsBlock>;
  content?: Maybe<CategoryContent>;
  /**
   * The timestamp indicating when the category was created.
   * @deprecated The field should not be used on the storefront.
   */
  created_at?: Maybe<Scalars['String']['output']>;
  custom_layout_update_file?: Maybe<Scalars['String']['output']>;
  /** The attribute to use for sorting. */
  default_sort_by?: Maybe<Scalars['String']['output']>;
  /** An optional description of the category. */
  description?: Maybe<Scalars['String']['output']>;
  display_mode?: Maybe<Scalars['String']['output']>;
  filter_price_range?: Maybe<Scalars['Float']['output']>;
  /**
   * An ID that uniquely identifies the category.
   * @deprecated Use `uid` instead.
   */
  id?: Maybe<Scalars['Int']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  include_in_menu?: Maybe<Scalars['Int']['output']>;
  is_anchor?: Maybe<Scalars['Int']['output']>;
  landing_page?: Maybe<Scalars['Int']['output']>;
  /** The depth of the category within the tree. */
  level?: Maybe<Scalars['Int']['output']>;
  meta_description?: Maybe<Scalars['String']['output']>;
  meta_keywords?: Maybe<Scalars['String']['output']>;
  meta_title?: Maybe<Scalars['String']['output']>;
  /** The display name of the category. */
  name?: Maybe<Scalars['String']['output']>;
  /** The full category path. */
  path?: Maybe<Scalars['String']['output']>;
  /** The category path within the store. */
  path_in_store?: Maybe<Scalars['String']['output']>;
  /** The position of the category relative to other categories at the same level in tree. */
  position?: Maybe<Scalars['Int']['output']>;
  /** The number of products in the category that are marked as visible. By default, in complex products, parent products are visible, but their child products are not. */
  product_count?: Maybe<Scalars['Int']['output']>;
  /** The list of products assigned to the category. */
  products?: Maybe<CategoryProducts>;
  /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
  redirect_code: Scalars['Int']['output'];
  /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
  relative_url?: Maybe<Scalars['String']['output']>;
  /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
  type?: Maybe<UrlRewriteEntityTypeEnum>;
  /** The unique ID for a `CategoryInterface` object. */
  uid: Scalars['ID']['output'];
  /**
   * The timestamp indicating when the category was updated.
   * @deprecated The field should not be used on the storefront.
   */
  updated_at?: Maybe<Scalars['String']['output']>;
  /** The URL key assigned to the category. */
  url_key?: Maybe<Scalars['String']['output']>;
  /** The URL path assigned to the category. */
  url_path?: Maybe<Scalars['String']['output']>;
  /** The part of the category URL that is appended after the url key */
  url_suffix?: Maybe<Scalars['String']['output']>;
};


/** Contains the hierarchy of categories. */
export type CategoryTreeProductsArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<ProductAttributeSortInput>;
};

/** Defines details about an individual checkout agreement. */
export type CheckoutAgreement = {
  __typename?: 'CheckoutAgreement';
  /** The ID for a checkout agreement. */
  agreement_id: Scalars['Int']['output'];
  /** The checkbox text for the checkout agreement. */
  checkbox_text: Scalars['String']['output'];
  /** Required. The text of the agreement. */
  content: Scalars['String']['output'];
  /** The height of the text box where the Terms and Conditions statement appears during checkout. */
  content_height?: Maybe<Scalars['String']['output']>;
  /** Indicates whether the `content` text is in HTML format. */
  is_html: Scalars['Boolean']['output'];
  /** Indicates whether agreements are accepted automatically or manually. */
  mode: CheckoutAgreementMode;
  /** The name given to the condition. */
  name: Scalars['String']['output'];
};

/** Indicates how agreements are accepted. */
export enum CheckoutAgreementMode {
  /** Conditions are automatically accepted upon checkout. */
  Auto = 'AUTO',
  /** Shoppers must manually accept the conditions to place an order. */
  Manual = 'MANUAL'
}

/** An error encountered while adding an item to the cart. */
export type CheckoutUserInputError = {
  __typename?: 'CheckoutUserInputError';
  /** An error code that is specific to Checkout. */
  code: CheckoutUserInputErrorCodes;
  /** A localized error message. */
  message: Scalars['String']['output'];
  /** The path to the input field that caused an error. See the GraphQL specification about path errors for details: http://spec.graphql.org/draft/#sec-Errors */
  path: Array<Maybe<Scalars['String']['output']>>;
};

export enum CheckoutUserInputErrorCodes {
  InsufficientStock = 'INSUFFICIENT_STOCK',
  NotSalable = 'NOT_SALABLE',
  ProductNotFound = 'PRODUCT_NOT_FOUND',
  ReorderNotAvailable = 'REORDER_NOT_AVAILABLE',
  Undefined = 'UNDEFINED'
}

/** Contains details about a specific CMS block. */
export type CmsBlock = {
  __typename?: 'CmsBlock';
  /** The content of the CMS block in raw HTML. */
  content?: Maybe<Scalars['String']['output']>;
  /** The CMS block identifier. */
  identifier?: Maybe<Scalars['String']['output']>;
  /** The title assigned to the CMS block. */
  title?: Maybe<Scalars['String']['output']>;
};

/** Contains an array CMS block items. */
export type CmsBlocks = {
  __typename?: 'CmsBlocks';
  /** An array of CMS blocks. */
  items?: Maybe<Array<Maybe<CmsBlock>>>;
};

/** Contains details about a CMS page. */
export type CmsPage = RoutableInterface & {
  __typename?: 'CmsPage';
  /** The content of the CMS page in raw HTML. */
  content?: Maybe<Scalars['String']['output']>;
  /** The heading that displays at the top of the CMS page. */
  content_heading?: Maybe<Scalars['String']['output']>;
  /** The ID of a CMS page. */
  identifier?: Maybe<Scalars['String']['output']>;
  /** A brief description of the page for search results listings. */
  meta_description?: Maybe<Scalars['String']['output']>;
  /** A brief description of the page for search results listings. */
  meta_keywords?: Maybe<Scalars['String']['output']>;
  /** A page title that is indexed by search engines and appears in search results listings. */
  meta_title?: Maybe<Scalars['String']['output']>;
  /** The design layout of the page, indicating the number of columns and navigation features used on the page. */
  page_layout?: Maybe<Scalars['String']['output']>;
  /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
  redirect_code: Scalars['Int']['output'];
  /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
  relative_url?: Maybe<Scalars['String']['output']>;
  /** The name that appears in the breadcrumb trail navigation and in the browser title bar and tab. */
  title?: Maybe<Scalars['String']['output']>;
  /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
  type?: Maybe<UrlRewriteEntityTypeEnum>;
  /** The URL key of the CMS page, which is often based on the `content_heading`. */
  url_key?: Maybe<Scalars['String']['output']>;
};

export type ColorSwatchData = SwatchDataInterface & {
  __typename?: 'ColorSwatchData';
  /** The value can be represented as color (HEX code), image link, or text. */
  value?: Maybe<Scalars['String']['output']>;
};

/** Contains an attribute code that is used for product comparisons. */
export type ComparableAttribute = {
  __typename?: 'ComparableAttribute';
  /** An attribute code that is enabled for product comparisons. */
  code: Scalars['String']['output'];
  /** The label of the attribute code. */
  label: Scalars['String']['output'];
};

/** Defines an object used to iterate through items for product comparisons. */
export type ComparableItem = {
  __typename?: 'ComparableItem';
  /** An array of product attributes that can be used to compare products. */
  attributes: Array<Maybe<ProductAttribute>>;
  /** Details about a product in a compare list. */
  product: ProductInterface;
  /** The unique ID of an item in a compare list. */
  uid: Scalars['ID']['output'];
};

/** Contains iterable information such as the array of items, the count, and attributes that represent the compare list. */
export type CompareList = {
  __typename?: 'CompareList';
  /** An array of attributes that can be used for comparing products. */
  attributes?: Maybe<Array<Maybe<ComparableAttribute>>>;
  /** The number of items in the compare list. */
  item_count: Scalars['Int']['output'];
  /** An array of products to compare. */
  items?: Maybe<Array<Maybe<ComparableItem>>>;
  /** The unique ID assigned to the compare list. */
  uid: Scalars['ID']['output'];
};

/** Update the quote and complete the order */
export type CompleteOrderInput = {
  /** The customer cart ID */
  cartId: Scalars['String']['input'];
  /** PayPal order ID */
  id: Scalars['String']['input'];
};

export type ComplexTextValue = {
  __typename?: 'ComplexTextValue';
  /** Text that can contain HTML tags. */
  html: Scalars['String']['output'];
};

export type ConfigAttribute = {
  /** Admin label for the configurable product attribute */
  admin: Scalars['String']['input'];
  /** Store label for the configurable product attribute */
  store: Scalars['String']['input'];
};

/** Contains details about a configurable product attribute option. */
export type ConfigurableAttributeOption = {
  __typename?: 'ConfigurableAttributeOption';
  /** The ID assigned to the attribute. */
  code?: Maybe<Scalars['String']['output']>;
  /** A string that describes the configurable attribute option. */
  label?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `ConfigurableAttributeOption` object. */
  uid: Scalars['ID']['output'];
  /** A unique index number assigned to the configurable product option. */
  value_index?: Maybe<Scalars['Int']['output']>;
};

/** An implementation for configurable product cart items. */
export type ConfigurableCartItem = CartItemInterface & {
  __typename?: 'ConfigurableCartItem';
  /** An array containing the configuranle options the shopper selected. */
  configurable_options: Array<Maybe<SelectedConfigurableOption>>;
  /** Product details of the cart item. */
  configured_variant: ProductInterface;
  /** An array containing the customizable options the shopper selected. */
  customizable_options: Array<Maybe<SelectedCustomizableOption>>;
  /** An array of errors encountered while loading the cart item */
  errors?: Maybe<Array<Maybe<CartItemError>>>;
  /** The entered gift message for the cart item */
  gift_message?: Maybe<GiftMessage>;
  /** @deprecated Use `uid` instead. */
  id: Scalars['String']['output'];
  /** True if requested quantity is less than available stock, false otherwise. */
  is_available: Scalars['Boolean']['output'];
  /** Message to display when the product is not available with this selected option. */
  not_available_message?: Maybe<Scalars['String']['output']>;
  /** Contains details about the price of the item, including taxes and discounts. */
  prices?: Maybe<CartItemPrices>;
  /** Details about an item in the cart. */
  product: ProductInterface;
  /** The quantity of this item in the cart. */
  quantity: Scalars['Float']['output'];
  /** The unique ID for a `CartItemInterface` object. */
  uid: Scalars['ID']['output'];
};

/** Describes configurable options that have been selected and can be selected as a result of the previous selections. */
export type ConfigurableOptionAvailableForSelection = {
  __typename?: 'ConfigurableOptionAvailableForSelection';
  /** An attribute code that uniquely identifies a configurable option. */
  attribute_code: Scalars['String']['output'];
  /** An array of selectable option value IDs. */
  option_value_uids: Array<Maybe<Scalars['ID']['output']>>;
};

export type ConfigurableOrderItem = OrderItemInterface & {
  __typename?: 'ConfigurableOrderItem';
  /** The final discount information for the product. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** The entered option for the base product, such as a logo or image. */
  entered_options?: Maybe<Array<Maybe<OrderItemOption>>>;
  /** The selected gift message for the order item */
  gift_message?: Maybe<GiftMessage>;
  /** The unique ID for an `OrderItemInterface` object. */
  id: Scalars['ID']['output'];
  /** The SKU of parent product. */
  parent_sku?: Maybe<Scalars['String']['output']>;
  /** Contains details about the price of the item, including taxes and discounts. */
  prices?: Maybe<OrderItemPrices>;
  /** The ProductInterface object, which contains details about the base product */
  product?: Maybe<ProductInterface>;
  /** The name of the base product. */
  product_name?: Maybe<Scalars['String']['output']>;
  /** The sale price of the base product, including selected options. */
  product_sale_price: Money;
  /** The SKU of the base product. */
  product_sku: Scalars['String']['output'];
  /** The type of product, such as simple, configurable, etc. */
  product_type?: Maybe<Scalars['String']['output']>;
  /** URL key of the base product. */
  product_url_key?: Maybe<Scalars['String']['output']>;
  /** The number of canceled items. */
  quantity_canceled?: Maybe<Scalars['Float']['output']>;
  /** The number of invoiced items. */
  quantity_invoiced?: Maybe<Scalars['Float']['output']>;
  /** The number of units ordered for this item. */
  quantity_ordered?: Maybe<Scalars['Float']['output']>;
  /** The number of refunded items. */
  quantity_refunded?: Maybe<Scalars['Float']['output']>;
  /** The number of returned items. */
  quantity_returned?: Maybe<Scalars['Float']['output']>;
  /** The number of shipped items. */
  quantity_shipped?: Maybe<Scalars['Float']['output']>;
  /** The selected options for the base product, such as color or size. */
  selected_options?: Maybe<Array<Maybe<OrderItemOption>>>;
  /** The status of the order item. */
  status?: Maybe<Scalars['String']['output']>;
};

/** Defines basic features of a configurable product and its simple product variants. */
export type ConfigurableProduct = CustomizableProductInterface & PhysicalProductInterface & ProductInterface & RoutableInterface & {
  __typename?: 'ConfigurableProduct';
  /** The productdata query returns the product attributes */
  attributeValues?: Maybe<Array<Maybe<ProductAttributes>>>;
  /**
   * The attribute set assigned to the product.
   * @deprecated The field should not be used on the storefront.
   */
  attribute_set_id?: Maybe<Scalars['Int']['output']>;
  /** Name of the product attribute set */
  attribute_set_name?: Maybe<Scalars['String']['output']>;
  /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled. */
  canonical_url?: Maybe<Scalars['String']['output']>;
  /** The categories assigned to a product. */
  categories?: Maybe<Array<Maybe<CategoryInterface>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  color?: Maybe<Scalars['Int']['output']>;
  /** An array of options for the configurable product. */
  configurable_options?: Maybe<Array<Maybe<ConfigurableProductOptions>>>;
  /** An array of media gallery items and other details about selected configurable product options as well as details about remaining selectable options. */
  configurable_product_options_selection?: Maybe<ConfigurableProductOptionsSelection>;
  /** The product's country of origin. */
  country_of_manufacture?: Maybe<Scalars['String']['output']>;
  /**
   * Timestamp indicating when the product was created.
   * @deprecated The field should not be used on the storefront.
   */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Crosssell Products */
  crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** Product custom attributes. */
  custom_attributesV2?: Maybe<ProductCustomAttributes>;
  /** Reason for denying the product listing */
  deny_reason?: Maybe<DenyReason>;
  /** Detailed information about the product. The value can include simple HTML tags. */
  description?: Maybe<ComplexTextValue>;
  /** Returns a value indicating gift message availability for the product. */
  gift_message_available: Scalars['Boolean']['output'];
  /**
   * The ID number assigned to the product.
   * @deprecated Use the `uid` field instead.
   */
  id?: Maybe<Scalars['Int']['output']>;
  /** The relative path to the main image on the product page. */
  image?: Maybe<ProductImage>;
  /**
   * A number representing the product's manufacturer.
   * @deprecated Use the `custom_attributes` field instead.
   */
  manufacturer?: Maybe<Scalars['Int']['output']>;
  /** Maximum Qty Allowed in Shopping Cart */
  max_sale_qty?: Maybe<Scalars['Float']['output']>;
  /** An array of media gallery objects. */
  media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
  /**
   * An array of MediaGalleryEntry objects.
   * @deprecated Use `media_gallery` instead.
   */
  media_gallery_entries?: Maybe<Array<Maybe<MediaGalleryEntry>>>;
  /** A brief overview of the product for search results listings, maximum 255 characters. */
  meta_description?: Maybe<Scalars['String']['output']>;
  /** A comma-separated list of keywords that are visible only to search engines. */
  meta_keyword?: Maybe<Scalars['String']['output']>;
  /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
  meta_title?: Maybe<Scalars['String']['output']>;
  /** Minimum Qty Allowed in Shopping Cart */
  min_sale_qty?: Maybe<Scalars['Float']['output']>;
  /** The product name. Customers use this name to identify the product. */
  name?: Maybe<Scalars['String']['output']>;
  /** The beginning date for new product listings, and determines if the product is featured as a new product. */
  new_from_date?: Maybe<Scalars['String']['output']>;
  /** The end date for new product listings. */
  new_to_date?: Maybe<Scalars['String']['output']>;
  /** Product stock only x left count */
  only_x_left_in_stock?: Maybe<Scalars['Float']['output']>;
  /** An array of options for a customizable product. */
  options?: Maybe<Array<Maybe<CustomizableOptionInterface>>>;
  /** If the product has multiple options, determines where they appear on the product page. */
  options_container?: Maybe<Scalars['String']['output']>;
  /**
   * Indicates the price of an item.
   * @deprecated Use `price_range` for product price information.
   */
  price?: Maybe<ProductPrices>;
  /** The range of prices for the product */
  price_range: PriceRange;
  /** An array of `TierPrice` objects. */
  price_tiers?: Maybe<Array<Maybe<TierPrice>>>;
  /** An array of `ProductLinks` objects. */
  product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>;
  /** Current status of the product */
  product_status?: Maybe<Scalars['String']['output']>;
  /** Quantity available for the product */
  qty?: Maybe<Scalars['Int']['output']>;
  /** Quantity of the product confirmed for sale */
  qty_confirmed?: Maybe<ProductQtyConfirmed>;
  /** Quantity of the product pending sale */
  qty_pending?: Maybe<ProductQtyPending>;
  /** Quantity of the product sold */
  qty_sold?: Maybe<ProductQtySold>;
  /** Amount of available stock */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** The average of all the ratings given to the product. */
  rating_summary: Scalars['Float']['output'];
  /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
  redirect_code: Scalars['Int']['output'];
  /** An array of products to be displayed in a Related Products block. */
  related_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
  relative_url?: Maybe<Scalars['String']['output']>;
  /** The total count of all the reviews given to the product. */
  review_count: Scalars['Int']['output'];
  /** The list of products reviews. */
  reviews: ProductReviews;
  /** @deprecated Use the `custom_attributes` field instead. */
  seller_id?: Maybe<Scalars['Int']['output']>;
  /** A short description of the product. Its use depends on the theme. */
  short_description?: Maybe<ComplexTextValue>;
  /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
  sku?: Maybe<Scalars['String']['output']>;
  /** The relative path to the small image, which is used on catalog pages. */
  small_image?: Maybe<ProductImage>;
  /**
   * The beginning date that a product has a special price.
   * @deprecated The field should not be used on the storefront.
   */
  special_from_date?: Maybe<Scalars['String']['output']>;
  /** The discounted price of the product. */
  special_price?: Maybe<Scalars['Float']['output']>;
  /** The end date for a product with a special price. */
  special_to_date?: Maybe<Scalars['String']['output']>;
  /** Stock status of the product */
  stock_status?: Maybe<ProductStockStatus>;
  /** The file name of a swatch image. */
  swatch_image?: Maybe<Scalars['String']['output']>;
  /** The relative path to the product's thumbnail image. */
  thumbnail?: Maybe<ProductImage>;
  /**
   * The price when tier pricing is in effect and the items purchased threshold has been reached.
   * @deprecated Use `price_tiers` for product tier price information.
   */
  tier_price?: Maybe<Scalars['Float']['output']>;
  /**
   * An array of ProductTierPrices objects.
   * @deprecated Use `price_tiers` for product tier price information.
   */
  tier_prices?: Maybe<Array<Maybe<ProductTierPrices>>>;
  /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
  type?: Maybe<UrlRewriteEntityTypeEnum>;
  /**
   * One of simple, virtual, bundle, downloadable, grouped, or configurable.
   * @deprecated Use `__typename` instead.
   */
  type_id?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `ProductInterface` object. */
  uid: Scalars['ID']['output'];
  /**
   * Timestamp indicating when the product was updated.
   * @deprecated The field should not be used on the storefront.
   */
  updated_at?: Maybe<Scalars['String']['output']>;
  /** Upsell Products */
  upsell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The part of the URL that identifies the product */
  url_key?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use product's `canonical_url` or url rewrites instead */
  url_path?: Maybe<Scalars['String']['output']>;
  /** URL rewrites list */
  url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>;
  /** The part of the product URL that is appended after the url key */
  url_suffix?: Maybe<Scalars['String']['output']>;
  /** An array of simple product variants. */
  variants?: Maybe<Array<Maybe<ConfigurableVariant>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  voguish_featured?: Maybe<Scalars['String']['output']>;
  /**
   * An array of websites in which the product is available.
   * @deprecated The field should not be used on the storefront.
   */
  websites?: Maybe<Array<Maybe<Website>>>;
  /** The weight of the item, in units defined by the store. */
  weight?: Maybe<Scalars['Float']['output']>;
};


/** Defines basic features of a configurable product and its simple product variants. */
export type ConfigurableProductAttributeValuesArgs = {
  attributeCode?: InputMaybe<Array<InputMaybe<AttributeCodeInput>>>;
};


/** Defines basic features of a configurable product and its simple product variants. */
export type ConfigurableProductConfigurable_Product_Options_SelectionArgs = {
  configurableOptionValueUids?: InputMaybe<Array<Scalars['ID']['input']>>;
};


/** Defines basic features of a configurable product and its simple product variants. */
export type ConfigurableProductCustom_AttributesV2Args = {
  filters?: InputMaybe<AttributeFilterInput>;
};


/** Defines basic features of a configurable product and its simple product variants. */
export type ConfigurableProductReviewsArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

export type ConfigurableProductCartItemInput = {
  /** The ID and value of the option. */
  customizable_options?: InputMaybe<Array<InputMaybe<CustomizableOptionInput>>>;
  /** The quantity and SKU of the configurable product. */
  data: CartItemInput;
  /** The SKU of the parent configurable product. */
  parent_sku?: InputMaybe<Scalars['String']['input']>;
  variant_sku?: InputMaybe<Scalars['String']['input']>;
};

/** Contains details about configurable product options. */
export type ConfigurableProductOption = {
  __typename?: 'ConfigurableProductOption';
  /** An attribute code that uniquely identifies a configurable option. */
  attribute_code: Scalars['String']['output'];
  /** The display name of the option. */
  label: Scalars['String']['output'];
  /** The unique ID of the configurable option. */
  uid: Scalars['ID']['output'];
  /** An array of values that are applicable for this option. */
  values?: Maybe<Array<Maybe<ConfigurableProductOptionValue>>>;
};

/** Defines a value for a configurable product option. */
export type ConfigurableProductOptionValue = {
  __typename?: 'ConfigurableProductOptionValue';
  /** Indicates whether the product is available with this selected option. */
  is_available: Scalars['Boolean']['output'];
  /** Indicates whether the value is the default. */
  is_use_default: Scalars['Boolean']['output'];
  /** The display name of the value. */
  label: Scalars['String']['output'];
  /** The URL assigned to the thumbnail of the swatch image. */
  swatch?: Maybe<SwatchDataInterface>;
  /** The unique ID of the value. */
  uid: Scalars['ID']['output'];
};

/** Defines configurable attributes for the specified product. */
export type ConfigurableProductOptions = {
  __typename?: 'ConfigurableProductOptions';
  /** A string that identifies the attribute. */
  attribute_code?: Maybe<Scalars['String']['output']>;
  /**
   * The ID assigned to the attribute.
   * @deprecated Use `attribute_uid` instead.
   */
  attribute_id?: Maybe<Scalars['String']['output']>;
  /**
   * The ID assigned to the attribute.
   * @deprecated Use `attribute_uid` instead.
   */
  attribute_id_v2?: Maybe<Scalars['Int']['output']>;
  /** The unique ID for an `Attribute` object. */
  attribute_uid: Scalars['ID']['output'];
  /**
   * The configurable option ID number assigned by the system.
   * @deprecated Use `uid` instead.
   */
  id?: Maybe<Scalars['Int']['output']>;
  /** A displayed string that describes the configurable product option. */
  label?: Maybe<Scalars['String']['output']>;
  /** A number that indicates the order in which the attribute is displayed. */
  position?: Maybe<Scalars['Int']['output']>;
  /**
   * This is the same as a product's `id` field.
   * @deprecated `product_id` is not needed and can be obtained from its parent.
   */
  product_id?: Maybe<Scalars['Int']['output']>;
  /** The unique ID for a `ConfigurableProductOptions` object. */
  uid: Scalars['ID']['output'];
  /** Indicates whether the option is the default. */
  use_default?: Maybe<Scalars['Boolean']['output']>;
  /** An array that defines the `value_index` codes assigned to the configurable product. */
  values?: Maybe<Array<Maybe<ConfigurableProductOptionsValues>>>;
};

/** Contains metadata corresponding to the selected configurable options. */
export type ConfigurableProductOptionsSelection = {
  __typename?: 'ConfigurableProductOptionsSelection';
  /** An array of all possible configurable options. */
  configurable_options?: Maybe<Array<Maybe<ConfigurableProductOption>>>;
  /** Product images and videos corresponding to the specified configurable options selection. */
  media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
  /** The configurable options available for further selection based on the current selection. */
  options_available_for_selection?: Maybe<Array<Maybe<ConfigurableOptionAvailableForSelection>>>;
  /** A variant represented by the specified configurable options selection. The value is expected to be null until selections are made for each configurable option. */
  variant?: Maybe<SimpleProduct>;
};

/** Contains the index number assigned to a configurable product option. */
export type ConfigurableProductOptionsValues = {
  __typename?: 'ConfigurableProductOptionsValues';
  /** The label of the product on the default store. */
  default_label?: Maybe<Scalars['String']['output']>;
  /** The label of the product. */
  label?: Maybe<Scalars['String']['output']>;
  /** The label of the product on the current store. */
  store_label?: Maybe<Scalars['String']['output']>;
  /** Swatch data for a configurable product option. */
  swatch_data?: Maybe<SwatchDataInterface>;
  /** The unique ID for a `ConfigurableProductOptionsValues` object. */
  uid?: Maybe<Scalars['ID']['output']>;
  /** Indicates whether to use the default_label. */
  use_default_value?: Maybe<Scalars['Boolean']['output']>;
  /**
   * A unique index number assigned to the configurable product option.
   * @deprecated Use `uid` instead.
   */
  value_index?: Maybe<Scalars['Int']['output']>;
};

/** Contains all the simple product variants of a configurable product. */
export type ConfigurableVariant = {
  __typename?: 'ConfigurableVariant';
  /** An array of configurable attribute options. */
  attributes?: Maybe<Array<Maybe<ConfigurableAttributeOption>>>;
  /** An array of linked simple products. */
  product?: Maybe<SimpleProduct>;
};

/** A configurable product wish list item. */
export type ConfigurableWishlistItem = WishlistItemInterface & {
  __typename?: 'ConfigurableWishlistItem';
  /** The date and time the item was added to the wish list. */
  added_at: Scalars['String']['output'];
  /**
   * The SKU of the simple product corresponding to a set of selected configurable options.
   * @deprecated Use `ConfigurableWishlistItem.configured_variant.sku` instead.
   */
  child_sku: Scalars['String']['output'];
  /** An array of selected configurable options. */
  configurable_options?: Maybe<Array<Maybe<SelectedConfigurableOption>>>;
  /** Product details of the selected variant. The value is null if some options are not configured. */
  configured_variant?: Maybe<ProductInterface>;
  /** Custom options selected for the wish list item. */
  customizable_options: Array<Maybe<SelectedCustomizableOption>>;
  /** The description of the item. */
  description?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `WishlistItemInterface` object. */
  id: Scalars['ID']['output'];
  /** Product details of the wish list item. */
  product?: Maybe<ProductInterface>;
  /** The quantity of this wish list item. */
  quantity: Scalars['Float']['output'];
};

export type ConfirmCancelOrderInput = {
  /** Confirmation Key to cancel the order. */
  confirmation_key: Scalars['String']['input'];
  /** The unique ID of an `Order` type. */
  order_id: Scalars['ID']['input'];
};

/** Contains details about a customer email address to confirm. */
export type ConfirmEmailInput = {
  /** The key to confirm the email address. */
  confirmation_key: Scalars['String']['input'];
  /** The email address to be confirmed. */
  email: Scalars['String']['input'];
};

/** List of account confirmation statuses. */
export enum ConfirmationStatusEnum {
  /** Account confirmation not required */
  AccountConfirmationNotRequired = 'ACCOUNT_CONFIRMATION_NOT_REQUIRED',
  /** Account confirmed */
  AccountConfirmed = 'ACCOUNT_CONFIRMED'
}

/** Contact SellerBySellerId */
export type ContactSellerBySellerId = {
  __typename?: 'ContactSellerBySellerId';
  /** Message */
  message?: Maybe<Scalars['String']['output']>;
};

export type ContactUsInput = {
  /** The shopper's comment to the merchant. */
  comment: Scalars['String']['input'];
  /** The email address of the shopper. */
  email: Scalars['String']['input'];
  /** The full name of the shopper. */
  name: Scalars['String']['input'];
  /** The shopper's telephone number. */
  telephone?: InputMaybe<Scalars['String']['input']>;
};

/** Contains the status of the request. */
export type ContactUsOutput = {
  __typename?: 'ContactUsOutput';
  /** Indicates whether the request was successful. */
  status: Scalars['Boolean']['output'];
};

export type CornerOffersItems = {
  __typename?: 'CornerOffersItems';
  /** Background Color */
  backgroundColor?: Maybe<Scalars['String']['output']>;
  /** Description */
  description?: Maybe<Scalars['String']['output']>;
  /** Id */
  id?: Maybe<Scalars['Int']['output']>;
  /** Layout */
  layout?: Maybe<Scalars['String']['output']>;
  /** SubTitle */
  subtitle?: Maybe<Scalars['String']['output']>;
  /** Text Color */
  textColor?: Maybe<Scalars['String']['output']>;
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
};

export type CornerOffersType = {
  __typename?: 'CornerOffersType';
  /** Description */
  description?: Maybe<Scalars['String']['output']>;
  /** Id */
  id?: Maybe<Scalars['Int']['output']>;
  /** Corner Offers Items List */
  items?: Maybe<Array<Maybe<CornerOffersItems>>>;
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
};

export type Country = {
  __typename?: 'Country';
  /** An array of regions within a particular country. */
  available_regions?: Maybe<Array<Maybe<Region>>>;
  /** The name of the country in English. */
  full_name_english?: Maybe<Scalars['String']['output']>;
  /** The name of the country in the current locale. */
  full_name_locale?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `Country` object. */
  id?: Maybe<Scalars['String']['output']>;
  /** The three-letter abbreviation of the country, such as USA. */
  three_letter_abbreviation?: Maybe<Scalars['String']['output']>;
  /** The two-letter abbreviation of the country, such as US. */
  two_letter_abbreviation?: Maybe<Scalars['String']['output']>;
};

/** The list of country codes. */
export enum CountryCodeEnum {
  /** Andorra */
  Ad = 'AD',
  /** United Arab Emirates */
  Ae = 'AE',
  /** Afghanistan */
  Af = 'AF',
  /** Antigua & Barbuda */
  Ag = 'AG',
  /** Anguilla */
  Ai = 'AI',
  /** Albania */
  Al = 'AL',
  /** Armenia */
  Am = 'AM',
  /** Netherlands Antilles */
  An = 'AN',
  /** Angola */
  Ao = 'AO',
  /** Antarctica */
  Aq = 'AQ',
  /** Argentina */
  Ar = 'AR',
  /** American Samoa */
  As = 'AS',
  /** Austria */
  At = 'AT',
  /** Australia */
  Au = 'AU',
  /** Aruba */
  Aw = 'AW',
  /** Åland Islands */
  Ax = 'AX',
  /** Azerbaijan */
  Az = 'AZ',
  /** Bosnia & Herzegovina */
  Ba = 'BA',
  /** Barbados */
  Bb = 'BB',
  /** Bangladesh */
  Bd = 'BD',
  /** Belgium */
  Be = 'BE',
  /** Burkina Faso */
  Bf = 'BF',
  /** Bulgaria */
  Bg = 'BG',
  /** Bahrain */
  Bh = 'BH',
  /** Burundi */
  Bi = 'BI',
  /** Benin */
  Bj = 'BJ',
  /** St. Barthélemy */
  Bl = 'BL',
  /** Bermuda */
  Bm = 'BM',
  /** Brunei */
  Bn = 'BN',
  /** Bolivia */
  Bo = 'BO',
  /** Brazil */
  Br = 'BR',
  /** Bahamas */
  Bs = 'BS',
  /** Bhutan */
  Bt = 'BT',
  /** Bouvet Island */
  Bv = 'BV',
  /** Botswana */
  Bw = 'BW',
  /** Belarus */
  By = 'BY',
  /** Belize */
  Bz = 'BZ',
  /** Canada */
  Ca = 'CA',
  /** Cocos (Keeling) Islands */
  Cc = 'CC',
  /** Congo-Kinshasa */
  Cd = 'CD',
  /** Central African Republic */
  Cf = 'CF',
  /** Congo-Brazzaville */
  Cg = 'CG',
  /** Switzerland */
  Ch = 'CH',
  /** Côte d’Ivoire */
  Ci = 'CI',
  /** Cook Islands */
  Ck = 'CK',
  /** Chile */
  Cl = 'CL',
  /** Cameroon */
  Cm = 'CM',
  /** China */
  Cn = 'CN',
  /** Colombia */
  Co = 'CO',
  /** Costa Rica */
  Cr = 'CR',
  /** Cuba */
  Cu = 'CU',
  /** Cape Verde */
  Cv = 'CV',
  /** Christmas Island */
  Cx = 'CX',
  /** Cyprus */
  Cy = 'CY',
  /** Czech Republic */
  Cz = 'CZ',
  /** Germany */
  De = 'DE',
  /** Djibouti */
  Dj = 'DJ',
  /** Denmark */
  Dk = 'DK',
  /** Dominica */
  Dm = 'DM',
  /** Dominican Republic */
  Do = 'DO',
  /** Algeria */
  Dz = 'DZ',
  /** Ecuador */
  Ec = 'EC',
  /** Estonia */
  Ee = 'EE',
  /** Egypt */
  Eg = 'EG',
  /** Western Sahara */
  Eh = 'EH',
  /** Eritrea */
  Er = 'ER',
  /** Spain */
  Es = 'ES',
  /** Ethiopia */
  Et = 'ET',
  /** Finland */
  Fi = 'FI',
  /** Fiji */
  Fj = 'FJ',
  /** Falkland Islands */
  Fk = 'FK',
  /** Micronesia */
  Fm = 'FM',
  /** Faroe Islands */
  Fo = 'FO',
  /** France */
  Fr = 'FR',
  /** Gabon */
  Ga = 'GA',
  /** United Kingdom */
  Gb = 'GB',
  /** Grenada */
  Gd = 'GD',
  /** Georgia */
  Ge = 'GE',
  /** French Guiana */
  Gf = 'GF',
  /** Guernsey */
  Gg = 'GG',
  /** Ghana */
  Gh = 'GH',
  /** Gibraltar */
  Gi = 'GI',
  /** Greenland */
  Gl = 'GL',
  /** Gambia */
  Gm = 'GM',
  /** Guinea */
  Gn = 'GN',
  /** Guadeloupe */
  Gp = 'GP',
  /** Equatorial Guinea */
  Gq = 'GQ',
  /** Greece */
  Gr = 'GR',
  /** South Georgia & South Sandwich Islands */
  Gs = 'GS',
  /** Guatemala */
  Gt = 'GT',
  /** Guam */
  Gu = 'GU',
  /** Guinea-Bissau */
  Gw = 'GW',
  /** Guyana */
  Gy = 'GY',
  /** Hong Kong SAR China */
  Hk = 'HK',
  /** Heard &amp; McDonald Islands */
  Hm = 'HM',
  /** Honduras */
  Hn = 'HN',
  /** Croatia */
  Hr = 'HR',
  /** Haiti */
  Ht = 'HT',
  /** Hungary */
  Hu = 'HU',
  /** Indonesia */
  Id = 'ID',
  /** Ireland */
  Ie = 'IE',
  /** Israel */
  Il = 'IL',
  /** Isle of Man */
  Im = 'IM',
  /** India */
  In = 'IN',
  /** British Indian Ocean Territory */
  Io = 'IO',
  /** Iraq */
  Iq = 'IQ',
  /** Iran */
  Ir = 'IR',
  /** Iceland */
  Is = 'IS',
  /** Italy */
  It = 'IT',
  /** Jersey */
  Je = 'JE',
  /** Jamaica */
  Jm = 'JM',
  /** Jordan */
  Jo = 'JO',
  /** Japan */
  Jp = 'JP',
  /** Kenya */
  Ke = 'KE',
  /** Kyrgyzstan */
  Kg = 'KG',
  /** Cambodia */
  Kh = 'KH',
  /** Kiribati */
  Ki = 'KI',
  /** Comoros */
  Km = 'KM',
  /** St. Kitts & Nevis */
  Kn = 'KN',
  /** North Korea */
  Kp = 'KP',
  /** South Korea */
  Kr = 'KR',
  /** Kuwait */
  Kw = 'KW',
  /** Cayman Islands */
  Ky = 'KY',
  /** Kazakhstan */
  Kz = 'KZ',
  /** Laos */
  La = 'LA',
  /** Lebanon */
  Lb = 'LB',
  /** St. Lucia */
  Lc = 'LC',
  /** Liechtenstein */
  Li = 'LI',
  /** Sri Lanka */
  Lk = 'LK',
  /** Liberia */
  Lr = 'LR',
  /** Lesotho */
  Ls = 'LS',
  /** Lithuania */
  Lt = 'LT',
  /** Luxembourg */
  Lu = 'LU',
  /** Latvia */
  Lv = 'LV',
  /** Libya */
  Ly = 'LY',
  /** Morocco */
  Ma = 'MA',
  /** Monaco */
  Mc = 'MC',
  /** Moldova */
  Md = 'MD',
  /** Montenegro */
  Me = 'ME',
  /** St. Martin */
  Mf = 'MF',
  /** Madagascar */
  Mg = 'MG',
  /** Marshall Islands */
  Mh = 'MH',
  /** Macedonia */
  Mk = 'MK',
  /** Mali */
  Ml = 'ML',
  /** Myanmar (Burma) */
  Mm = 'MM',
  /** Mongolia */
  Mn = 'MN',
  /** Macau SAR China */
  Mo = 'MO',
  /** Northern Mariana Islands */
  Mp = 'MP',
  /** Martinique */
  Mq = 'MQ',
  /** Mauritania */
  Mr = 'MR',
  /** Montserrat */
  Ms = 'MS',
  /** Malta */
  Mt = 'MT',
  /** Mauritius */
  Mu = 'MU',
  /** Maldives */
  Mv = 'MV',
  /** Malawi */
  Mw = 'MW',
  /** Mexico */
  Mx = 'MX',
  /** Malaysia */
  My = 'MY',
  /** Mozambique */
  Mz = 'MZ',
  /** Namibia */
  Na = 'NA',
  /** New Caledonia */
  Nc = 'NC',
  /** Niger */
  Ne = 'NE',
  /** Norfolk Island */
  Nf = 'NF',
  /** Nigeria */
  Ng = 'NG',
  /** Nicaragua */
  Ni = 'NI',
  /** Netherlands */
  Nl = 'NL',
  /** Norway */
  No = 'NO',
  /** Nepal */
  Np = 'NP',
  /** Nauru */
  Nr = 'NR',
  /** Niue */
  Nu = 'NU',
  /** New Zealand */
  Nz = 'NZ',
  /** Oman */
  Om = 'OM',
  /** Panama */
  Pa = 'PA',
  /** Peru */
  Pe = 'PE',
  /** French Polynesia */
  Pf = 'PF',
  /** Papua New Guinea */
  Pg = 'PG',
  /** Philippines */
  Ph = 'PH',
  /** Pakistan */
  Pk = 'PK',
  /** Poland */
  Pl = 'PL',
  /** St. Pierre & Miquelon */
  Pm = 'PM',
  /** Pitcairn Islands */
  Pn = 'PN',
  /** Palestinian Territories */
  Ps = 'PS',
  /** Portugal */
  Pt = 'PT',
  /** Palau */
  Pw = 'PW',
  /** Paraguay */
  Py = 'PY',
  /** Qatar */
  Qa = 'QA',
  /** Réunion */
  Re = 'RE',
  /** Romania */
  Ro = 'RO',
  /** Serbia */
  Rs = 'RS',
  /** Russia */
  Ru = 'RU',
  /** Rwanda */
  Rw = 'RW',
  /** Saudi Arabia */
  Sa = 'SA',
  /** Solomon Islands */
  Sb = 'SB',
  /** Seychelles */
  Sc = 'SC',
  /** Sudan */
  Sd = 'SD',
  /** Sweden */
  Se = 'SE',
  /** Singapore */
  Sg = 'SG',
  /** St. Helena */
  Sh = 'SH',
  /** Slovenia */
  Si = 'SI',
  /** Svalbard & Jan Mayen */
  Sj = 'SJ',
  /** Slovakia */
  Sk = 'SK',
  /** Sierra Leone */
  Sl = 'SL',
  /** San Marino */
  Sm = 'SM',
  /** Senegal */
  Sn = 'SN',
  /** Somalia */
  So = 'SO',
  /** Suriname */
  Sr = 'SR',
  /** São Tomé & Príncipe */
  St = 'ST',
  /** El Salvador */
  Sv = 'SV',
  /** Syria */
  Sy = 'SY',
  /** Eswatini */
  Sz = 'SZ',
  /** Turks & Caicos Islands */
  Tc = 'TC',
  /** Chad */
  Td = 'TD',
  /** French Southern Territories */
  Tf = 'TF',
  /** Togo */
  Tg = 'TG',
  /** Thailand */
  Th = 'TH',
  /** Tajikistan */
  Tj = 'TJ',
  /** Tokelau */
  Tk = 'TK',
  /** Timor-Leste */
  Tl = 'TL',
  /** Turkmenistan */
  Tm = 'TM',
  /** Tunisia */
  Tn = 'TN',
  /** Tonga */
  To = 'TO',
  /** Turkey */
  Tr = 'TR',
  /** Trinidad & Tobago */
  Tt = 'TT',
  /** Tuvalu */
  Tv = 'TV',
  /** Taiwan */
  Tw = 'TW',
  /** Tanzania */
  Tz = 'TZ',
  /** Ukraine */
  Ua = 'UA',
  /** Uganda */
  Ug = 'UG',
  /** U.S. Outlying Islands */
  Um = 'UM',
  /** United States */
  Us = 'US',
  /** Uruguay */
  Uy = 'UY',
  /** Uzbekistan */
  Uz = 'UZ',
  /** Vatican City */
  Va = 'VA',
  /** St. Vincent & Grenadines */
  Vc = 'VC',
  /** Venezuela */
  Ve = 'VE',
  /** British Virgin Islands */
  Vg = 'VG',
  /** U.S. Virgin Islands */
  Vi = 'VI',
  /** Vietnam */
  Vn = 'VN',
  /** Vanuatu */
  Vu = 'VU',
  /** Wallis & Futuna */
  Wf = 'WF',
  /** Samoa */
  Ws = 'WS',
  /** Yemen */
  Ye = 'YE',
  /** Mayotte */
  Yt = 'YT',
  /** South Africa */
  Za = 'ZA',
  /** Zambia */
  Zm = 'ZM',
  /** Zimbabwe */
  Zw = 'ZW'
}

/** Contains an array of product IDs to use for creating a compare list. */
export type CreateCompareListInput = {
  /** An array of product IDs to add to the compare list. */
  products?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type CreateGuestCartInput = {
  /** Optional client-generated ID */
  cart_uid?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateGuestCartOutput = {
  __typename?: 'CreateGuestCartOutput';
  /** The newly created cart. */
  cart?: Maybe<Cart>;
};

/** Contains the secure information used to authorize transaction. Applies to Payflow Pro and Payments Pro payment methods. */
export type CreatePayflowProTokenOutput = {
  __typename?: 'CreatePayflowProTokenOutput';
  /** The RESPMSG returned by PayPal. If the `result` is `0`, then `response_message` is `Approved`. */
  response_message: Scalars['String']['output'];
  /** A non-zero value if any errors occurred. */
  result: Scalars['Int']['output'];
  /** The RESULT returned by PayPal. A value of `0` indicates the transaction was approved. */
  result_code: Scalars['Int']['output'];
  /** A secure token generated by PayPal. */
  secure_token: Scalars['String']['output'];
  /** A secure token ID generated by PayPal. */
  secure_token_id: Scalars['String']['output'];
};

/** Contains payment order details that are used while processing the payment order */
export type CreatePaymentOrderInput = {
  /** The customer cart ID */
  cartId: Scalars['String']['input'];
  /** Defines the origin location for that payment request */
  location: PaymentLocation;
  /** The code for the payment method used in the order */
  methodCode: Scalars['String']['input'];
  /** The identifiable payment source for the payment method */
  paymentSource: Scalars['String']['input'];
  /** Indicates whether the payment information should be vaulted */
  vaultIntent?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Contains payment order details that are used while processing the payment order */
export type CreatePaymentOrderOutput = {
  __typename?: 'CreatePaymentOrderOutput';
  /** The amount of the payment order */
  amount?: Maybe<Scalars['Float']['output']>;
  /** The currency of the payment order */
  currency_code?: Maybe<Scalars['String']['output']>;
  /** PayPal order ID */
  id?: Maybe<Scalars['String']['output']>;
  /** The order ID generated by Payment Services */
  mp_order_id?: Maybe<Scalars['String']['output']>;
  /** The status of the payment order */
  status?: Maybe<Scalars['String']['output']>;
};

/** Defines a new product review. */
export type CreateProductReviewInput = {
  /** The customer's nickname. Defaults to the customer name, if logged in. */
  nickname: Scalars['String']['input'];
  /** The ratings details by category. For example, Price: 5 stars, Quality: 4 stars, etc. */
  ratings: Array<InputMaybe<ProductReviewRatingInput>>;
  /** The SKU of the reviewed product. */
  sku: Scalars['String']['input'];
  /** The summary (title) of the review. */
  summary: Scalars['String']['input'];
  /** The review text. */
  text: Scalars['String']['input'];
};

/** Contains the completed product review. */
export type CreateProductReviewOutput = {
  __typename?: 'CreateProductReviewOutput';
  /** Product review details. */
  review: ProductReview;
};

/** Create Seller Account */
export type CreateSellerAccount = {
  __typename?: 'CreateSellerAccount';
  /** Confirmation */
  confirmation?: Maybe<Scalars['String']['output']>;
  /** Created At */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Created In */
  created_in?: Maybe<Scalars['String']['output']>;
  /** Default Billing */
  default_billing?: Maybe<Scalars['String']['output']>;
  /** Default Shipping */
  default_shipping?: Maybe<Scalars['String']['output']>;
  /** Disable Auto Group Change */
  disable_auto_group_change?: Maybe<Scalars['String']['output']>;
  /** Dob */
  dob?: Maybe<Scalars['String']['output']>;
  /** Email */
  email?: Maybe<Scalars['String']['output']>;
  /** Firstname */
  firstname?: Maybe<Scalars['String']['output']>;
  /** Gender */
  gender?: Maybe<Scalars['String']['output']>;
  /** Group Id */
  group_id?: Maybe<Scalars['Int']['output']>;
  /** Id */
  id?: Maybe<Scalars['Int']['output']>;
  /** Is Seller */
  is_seller?: Maybe<Scalars['String']['output']>;
  /** Lastname */
  lastname?: Maybe<Scalars['String']['output']>;
  /** Message */
  message?: Maybe<Scalars['String']['output']>;
  /** Middlename */
  middlename?: Maybe<Scalars['String']['output']>;
  /** Prefix */
  prefix?: Maybe<Scalars['String']['output']>;
  /** Profile Url */
  profileurl?: Maybe<Scalars['String']['output']>;
  /** Status */
  status?: Maybe<Scalars['Int']['output']>;
  /** Store Id */
  store_id?: Maybe<Scalars['String']['output']>;
  /** Suffix */
  suffix?: Maybe<Scalars['String']['output']>;
  /** Taxvat */
  taxvat?: Maybe<Scalars['String']['output']>;
  /** Updated At */
  updated_at?: Maybe<Scalars['String']['output']>;
  /** Website Id */
  website_id?: Maybe<Scalars['String']['output']>;
};

/** Describe the variables needed to create a vault payment token */
export type CreateVaultCardPaymentTokenInput = {
  /** Description of the vaulted card */
  card_description?: InputMaybe<Scalars['String']['input']>;
  /** The setup token obtained by the createVaultCardSetupToken endpoint */
  setup_token_id: Scalars['String']['input'];
};

/** The vault token id and information about the payment source */
export type CreateVaultCardPaymentTokenOutput = {
  __typename?: 'CreateVaultCardPaymentTokenOutput';
  /** The payment source information */
  payment_source: PaymentSourceOutput;
  /** The vault payment token information */
  vault_token_id: Scalars['String']['output'];
};

/** Describe the variables needed to create a vault card setup token */
export type CreateVaultCardSetupTokenInput = {
  /** The setup token information */
  setup_token: VaultSetupTokenInput;
  /** The 3DS mode */
  three_ds_mode?: InputMaybe<ThreeDsMode>;
};

/** The setup token id information */
export type CreateVaultCardSetupTokenOutput = {
  __typename?: 'CreateVaultCardSetupTokenOutput';
  /** The setup token id */
  setup_token: Scalars['String']['output'];
};

/** Required fields for Payflow Pro and Payments Pro credit card payments. */
export type CreditCardDetailsInput = {
  /** The credit card expiration month. */
  cc_exp_month: Scalars['Int']['input'];
  /** The credit card expiration year. */
  cc_exp_year: Scalars['Int']['input'];
  /** The last 4 digits of the credit card. */
  cc_last_4: Scalars['Int']['input'];
  /** The credit card type. */
  cc_type: Scalars['String']['input'];
};

/** Contains credit memo details. */
export type CreditMemo = {
  __typename?: 'CreditMemo';
  /** Comments on the credit memo. */
  comments?: Maybe<Array<Maybe<SalesCommentItem>>>;
  /** The unique ID for a `CreditMemo` object. */
  id: Scalars['ID']['output'];
  /** An array containing details about refunded items. */
  items?: Maybe<Array<Maybe<CreditMemoItemInterface>>>;
  /** The sequential credit memo number. */
  number: Scalars['String']['output'];
  /** Details about the total refunded amount. */
  total?: Maybe<CreditMemoTotal>;
};

export type CreditMemoItem = CreditMemoItemInterface & {
  __typename?: 'CreditMemoItem';
  /** Details about the final discount amount for the base product, including discounts on options. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** The unique ID for a `CreditMemoItemInterface` object. */
  id: Scalars['ID']['output'];
  /** The order item the credit memo is applied to. */
  order_item?: Maybe<OrderItemInterface>;
  /** The name of the base product. */
  product_name?: Maybe<Scalars['String']['output']>;
  /** The sale price for the base product, including selected options. */
  product_sale_price: Money;
  /** The SKU of the base product. */
  product_sku: Scalars['String']['output'];
  /** The number of refunded items. */
  quantity_refunded?: Maybe<Scalars['Float']['output']>;
};

/** Credit memo item details. */
export type CreditMemoItemInterface = {
  /** Details about the final discount amount for the base product, including discounts on options. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** The unique ID for a `CreditMemoItemInterface` object. */
  id: Scalars['ID']['output'];
  /** The order item the credit memo is applied to. */
  order_item?: Maybe<OrderItemInterface>;
  /** The name of the base product. */
  product_name?: Maybe<Scalars['String']['output']>;
  /** The sale price for the base product, including selected options. */
  product_sale_price: Money;
  /** The SKU of the base product. */
  product_sku: Scalars['String']['output'];
  /** The number of refunded items. */
  quantity_refunded?: Maybe<Scalars['Float']['output']>;
};

/** Contains credit memo price details. */
export type CreditMemoTotal = {
  __typename?: 'CreditMemoTotal';
  /** An adjustment manually applied to the order. */
  adjustment: Money;
  /** The final base grand total amount in the base currency. */
  base_grand_total: Money;
  /** The applied discounts to the credit memo. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** The final total amount, including shipping, discounts, and taxes. */
  grand_total: Money;
  /** Details about the shipping and handling costs for the credit memo. */
  shipping_handling?: Maybe<ShippingHandling>;
  /** The subtotal of the invoice, excluding shipping, discounts, and taxes. */
  subtotal: Money;
  /** The credit memo tax details. */
  taxes?: Maybe<Array<Maybe<TaxItem>>>;
  /** The shipping amount for the credit memo. */
  total_shipping: Money;
  /** The amount of tax applied to the credit memo. */
  total_tax: Money;
};

/** Creditmemo Items */
export type CreditmemoItems = {
  /** Back To Stock */
  back_to_stock?: InputMaybe<Scalars['Boolean']['input']>;
  /** Item Id */
  item_id?: InputMaybe<Scalars['Int']['input']>;
  /** Qty */
  qty?: InputMaybe<Scalars['Int']['input']>;
};

export type CreditmemoListItem = {
  __typename?: 'CreditmemoListItem';
  /** The total amount of the credit memo. */
  amount?: Maybe<Scalars['String']['output']>;
  /** The formatted version of the credit memo amount. */
  amount_formatted?: Maybe<Scalars['String']['output']>;
  /** The name of the customer to whom the credit memo is issued. */
  bill_to_name?: Maybe<Scalars['String']['output']>;
  /** The creation date and time of the credit memo. */
  created_at?: Maybe<Scalars['String']['output']>;
  /** The unique identifier for the credit memo. */
  creditmemo_id?: Maybe<Scalars['String']['output']>;
  /** The associated entity ID for the credit memo. */
  entity_id?: Maybe<Scalars['Int']['output']>;
  /** The status of the credit memo (e.g., 'pending', 'completed'). */
  status?: Maybe<Scalars['String']['output']>;
};

/** Credit memo params */
export type CreditmemoParams = {
  /** Adjustment Negative */
  adjustment_negative?: InputMaybe<Scalars['Int']['input']>;
  /** Adjustment Positive */
  adjustment_positive?: InputMaybe<Scalars['Int']['input']>;
  /** Comment Customer Notify */
  comment_customer_notify?: InputMaybe<Scalars['Int']['input']>;
  /** Comment Text */
  comment_text?: InputMaybe<Scalars['String']['input']>;
  /** Do Offline */
  do_offline?: InputMaybe<Scalars['Boolean']['input']>;
  /** Is Visible On Front */
  is_visible_on_front?: InputMaybe<Scalars['Boolean']['input']>;
  /** Items */
  items?: InputMaybe<Array<InputMaybe<CreditmemoItems>>>;
  /** Send Email */
  send_email?: InputMaybe<Scalars['Boolean']['input']>;
  /** Shipping Amount */
  shipping_amount?: InputMaybe<Scalars['Int']['input']>;
};

export type Currency = {
  __typename?: 'Currency';
  /** An array of three-letter currency codes accepted by the store, such as USD and EUR. */
  available_currency_codes?: Maybe<Array<Maybe<AvailableCurrencyData>>>;
  /** The base currency set for the store, such as USD. */
  base_currency_code?: Maybe<Scalars['String']['output']>;
  /** The symbol for the specified base currency, such as $. */
  base_currency_symbol?: Maybe<Scalars['String']['output']>;
  /** @deprecated Symbol was missed. Use `default_display_currency_code`. */
  default_display_currecy_code?: Maybe<Scalars['String']['output']>;
  /** @deprecated Symbol was missed. Use `default_display_currency_code`. */
  default_display_currecy_symbol?: Maybe<Scalars['String']['output']>;
  /** The currency that is displayed by default, such as USD. */
  default_display_currency_code?: Maybe<Scalars['String']['output']>;
  /** The currency symbol that is displayed by default, such as $. */
  default_display_currency_symbol?: Maybe<Scalars['String']['output']>;
  /** An array of exchange rates for currencies defined in the store. */
  exchange_rates?: Maybe<Array<Maybe<ExchangeRate>>>;
};

/** The list of available currency codes. */
export enum CurrencyEnum {
  Aed = 'AED',
  Afn = 'AFN',
  All = 'ALL',
  Amd = 'AMD',
  Ang = 'ANG',
  Aoa = 'AOA',
  Ars = 'ARS',
  Aud = 'AUD',
  Awg = 'AWG',
  Azm = 'AZM',
  Azn = 'AZN',
  Bam = 'BAM',
  Bbd = 'BBD',
  Bdt = 'BDT',
  Bgn = 'BGN',
  Bhd = 'BHD',
  Bif = 'BIF',
  Bmd = 'BMD',
  Bnd = 'BND',
  Bob = 'BOB',
  Brl = 'BRL',
  Bsd = 'BSD',
  Btn = 'BTN',
  Buk = 'BUK',
  Bwp = 'BWP',
  Byn = 'BYN',
  Bzd = 'BZD',
  Cad = 'CAD',
  Cdf = 'CDF',
  Che = 'CHE',
  Chf = 'CHF',
  Chw = 'CHW',
  Clp = 'CLP',
  Cny = 'CNY',
  Cop = 'COP',
  Crc = 'CRC',
  Cup = 'CUP',
  Cve = 'CVE',
  Czk = 'CZK',
  Djf = 'DJF',
  Dkk = 'DKK',
  Dop = 'DOP',
  Dzd = 'DZD',
  Eek = 'EEK',
  Egp = 'EGP',
  Ern = 'ERN',
  Etb = 'ETB',
  Eur = 'EUR',
  Fjd = 'FJD',
  Fkp = 'FKP',
  Gbp = 'GBP',
  Gek = 'GEK',
  Gel = 'GEL',
  Ghs = 'GHS',
  Gip = 'GIP',
  Gmd = 'GMD',
  Gnf = 'GNF',
  Gqe = 'GQE',
  Gtq = 'GTQ',
  Gyd = 'GYD',
  Hkd = 'HKD',
  Hnl = 'HNL',
  Hrk = 'HRK',
  Htg = 'HTG',
  Huf = 'HUF',
  Idr = 'IDR',
  Ils = 'ILS',
  Inr = 'INR',
  Iqd = 'IQD',
  Irr = 'IRR',
  Isk = 'ISK',
  Jmd = 'JMD',
  Jod = 'JOD',
  Jpy = 'JPY',
  Kes = 'KES',
  Kgs = 'KGS',
  Khr = 'KHR',
  Kmf = 'KMF',
  Kpw = 'KPW',
  Krw = 'KRW',
  Kwd = 'KWD',
  Kyd = 'KYD',
  Kzt = 'KZT',
  Lak = 'LAK',
  Lbp = 'LBP',
  Lkr = 'LKR',
  Lrd = 'LRD',
  Lsl = 'LSL',
  Lsm = 'LSM',
  Ltl = 'LTL',
  Lvl = 'LVL',
  Lyd = 'LYD',
  Mad = 'MAD',
  Mdl = 'MDL',
  Mga = 'MGA',
  Mkd = 'MKD',
  Mmk = 'MMK',
  Mnt = 'MNT',
  Mop = 'MOP',
  Mro = 'MRO',
  Mur = 'MUR',
  Mvr = 'MVR',
  Mwk = 'MWK',
  Mxn = 'MXN',
  Myr = 'MYR',
  Mzn = 'MZN',
  Nad = 'NAD',
  Ngn = 'NGN',
  Nic = 'NIC',
  Nok = 'NOK',
  Npr = 'NPR',
  Nzd = 'NZD',
  Omr = 'OMR',
  Pab = 'PAB',
  Pen = 'PEN',
  Pgk = 'PGK',
  Php = 'PHP',
  Pkr = 'PKR',
  Pln = 'PLN',
  Pyg = 'PYG',
  Qar = 'QAR',
  Rhd = 'RHD',
  Rol = 'ROL',
  Ron = 'RON',
  Rsd = 'RSD',
  Rub = 'RUB',
  Rwf = 'RWF',
  Sar = 'SAR',
  Sbd = 'SBD',
  Scr = 'SCR',
  Sdg = 'SDG',
  Sek = 'SEK',
  Sgd = 'SGD',
  Shp = 'SHP',
  Skk = 'SKK',
  Sll = 'SLL',
  Sos = 'SOS',
  Srd = 'SRD',
  Std = 'STD',
  Svc = 'SVC',
  Syp = 'SYP',
  Szl = 'SZL',
  Thb = 'THB',
  Tjs = 'TJS',
  Tmm = 'TMM',
  Tnd = 'TND',
  Top = 'TOP',
  Trl = 'TRL',
  Try = 'TRY',
  Ttd = 'TTD',
  Twd = 'TWD',
  Tzs = 'TZS',
  Uah = 'UAH',
  Ugx = 'UGX',
  Usd = 'USD',
  Uyu = 'UYU',
  Uzs = 'UZS',
  Veb = 'VEB',
  Vef = 'VEF',
  Vnd = 'VND',
  Vuv = 'VUV',
  Wst = 'WST',
  Xcd = 'XCD',
  Xof = 'XOF',
  Xpf = 'XPF',
  Yer = 'YER',
  Ytl = 'YTL',
  Zar = 'ZAR',
  Zmk = 'ZMK',
  Zwd = 'ZWD'
}

export type CurrencyInfo = {
  __typename?: 'CurrencyInfo';
  /** The numerical value of the amount (e.g., 100.50). */
  amount?: Maybe<Scalars['Float']['output']>;
  /** The formatted version of the amount (e.g., '$100.50'). */
  amount_formatted?: Maybe<Scalars['String']['output']>;
};

/** Defines an array of custom attributes. */
export type CustomAttributeMetadata = {
  __typename?: 'CustomAttributeMetadata';
  /** An array of attributes. */
  items?: Maybe<Array<Maybe<Attribute>>>;
};

/** An interface containing fields that define the EAV attribute. */
export type CustomAttributeMetadataInterface = {
  /** The unique identifier for an attribute code. This value should be in lowercase letters without spaces. */
  code: Scalars['ID']['output'];
  /** Default attribute value. */
  default_value?: Maybe<Scalars['String']['output']>;
  /** The type of entity that defines the attribute. */
  entity_type: AttributeEntityTypeEnum;
  /** The frontend class of the attribute. */
  frontend_class?: Maybe<Scalars['String']['output']>;
  /** The frontend input type of the attribute. */
  frontend_input?: Maybe<AttributeFrontendInputEnum>;
  /** Whether the attribute value is required. */
  is_required: Scalars['Boolean']['output'];
  /** Whether the attribute value must be unique. */
  is_unique: Scalars['Boolean']['output'];
  /** The label assigned to the attribute. */
  label?: Maybe<Scalars['String']['output']>;
  /** Attribute options. */
  options: Array<Maybe<CustomAttributeOptionInterface>>;
};

export type CustomAttributeOptionInterface = {
  /** Is the option value default. */
  is_default: Scalars['Boolean']['output'];
  /** The label assigned to the attribute option. */
  label: Scalars['String']['output'];
  /** The attribute option value. */
  value: Scalars['String']['output'];
};

/** Defines the customer name, addresses, and other details. */
export type Customer = {
  __typename?: 'Customer';
  /** An array containing the customer's shipping and billing addresses. */
  addresses?: Maybe<Array<Maybe<CustomerAddress>>>;
  /** An array containing the customer's shipping and billing addresses. */
  addressesV2?: Maybe<CustomerAddresses>;
  /** Indicates whether the customer has enabled remote shopping assistance. */
  allow_remote_shopping_assistance: Scalars['Boolean']['output'];
  /** The contents of the customer's compare list. */
  compare_list?: Maybe<CompareList>;
  /** The customer's confirmation status. */
  confirmation_status: ConfirmationStatusEnum;
  /** Timestamp indicating when the account was created. */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Customer's custom attributes. */
  custom_attributes?: Maybe<Array<Maybe<AttributeValueInterface>>>;
  /** Customer Token Lifetime. */
  customer_token_lifetime?: Maybe<Scalars['String']['output']>;
  /** The customer's date of birth. */
  date_of_birth?: Maybe<Scalars['String']['output']>;
  /** The ID assigned to the billing address. */
  default_billing?: Maybe<Scalars['String']['output']>;
  /** The ID assigned to the shipping address. */
  default_shipping?: Maybe<Scalars['String']['output']>;
  /**
   * The customer's date of birth.
   * @deprecated Use `date_of_birth` instead.
   */
  dob?: Maybe<Scalars['String']['output']>;
  /** The customer's email address. Required. */
  email?: Maybe<Scalars['String']['output']>;
  /** The customer's first name. */
  firstname?: Maybe<Scalars['String']['output']>;
  /** The customer's gender (Male - 1, Female - 2). */
  gender?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Customer group should not be exposed in the storefront scenarios. */
  group_id?: Maybe<Scalars['Int']['output']>;
  /**
   * The ID assigned to the customer.
   * @deprecated `id` is not needed as part of `Customer`, because on the server side, it can be identified based on the customer token used for authentication. There is no need to know customer ID on the client side.
   */
  id?: Maybe<Scalars['Int']['output']>;
  /** Indicates whether the customer is subscribed to the company's newsletter. */
  is_subscribed?: Maybe<Scalars['Boolean']['output']>;
  /** The customer's family name. */
  lastname?: Maybe<Scalars['String']['output']>;
  /** The customer's middle name. */
  middlename?: Maybe<Scalars['String']['output']>;
  orders?: Maybe<CustomerOrders>;
  /** An honorific, such as Dr., Mr., or Mrs. */
  prefix?: Maybe<Scalars['String']['output']>;
  /** Contains the customer's product reviews. */
  reviews: ProductReviews;
  /** A value such as Sr., Jr., or III. */
  suffix?: Maybe<Scalars['String']['output']>;
  /** The customer's Value-added tax (VAT) number (for corporate customers). */
  taxvat?: Maybe<Scalars['String']['output']>;
  /**
   * Return a customer's wish lists.
   * @deprecated Use `Customer.wishlists` or `Customer.wishlist_v2` instead.
   */
  wishlist: Wishlist;
  /** Retrieve the wish list identified by the unique ID for a `Wishlist` object. */
  wishlist_v2?: Maybe<Wishlist>;
  /** An array of wishlists. In Magento Open Source, customers are limited to one wish list. The number of wish lists is configurable for Adobe Commerce. */
  wishlists: Array<Maybe<Wishlist>>;
};


/** Defines the customer name, addresses, and other details. */
export type CustomerAddressesV2Args = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


/** Defines the customer name, addresses, and other details. */
export type CustomerCustom_AttributesArgs = {
  attributeCodes?: InputMaybe<Array<Scalars['ID']['input']>>;
};


/** Defines the customer name, addresses, and other details. */
export type CustomerOrdersArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<CustomerOrdersFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  scope?: InputMaybe<ScopeTypeEnum>;
  sort?: InputMaybe<CustomerOrderSortInput>;
};


/** Defines the customer name, addresses, and other details. */
export type CustomerReviewsArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


/** Defines the customer name, addresses, and other details. */
export type CustomerWishlist_V2Args = {
  id: Scalars['ID']['input'];
};


/** Defines the customer name, addresses, and other details. */
export type CustomerWishlistsArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

/** Contains detailed information about a customer's billing or shipping address. */
export type CustomerAddress = {
  __typename?: 'CustomerAddress';
  /** The customer's city or town. */
  city?: Maybe<Scalars['String']['output']>;
  /** The customer's company. */
  company?: Maybe<Scalars['String']['output']>;
  /** The customer's country. */
  country_code?: Maybe<CountryCodeEnum>;
  /**
   * The customer's country.
   * @deprecated Use `country_code` instead.
   */
  country_id?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use custom_attributesV2 instead. */
  custom_attributes?: Maybe<Array<Maybe<CustomerAddressAttribute>>>;
  /** Custom attributes assigned to the customer address. */
  custom_attributesV2: Array<Maybe<AttributeValueInterface>>;
  /**
   * The customer ID
   * @deprecated `customer_id` is not needed as part of `CustomerAddress`. The `id` is a unique identifier for the addresses.
   */
  customer_id?: Maybe<Scalars['Int']['output']>;
  /** Indicates whether the address is the customer's default billing address. */
  default_billing?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the address is the customer's default shipping address. */
  default_shipping?: Maybe<Scalars['Boolean']['output']>;
  /** Contains any extension attributes for the address. */
  extension_attributes?: Maybe<Array<Maybe<CustomerAddressAttribute>>>;
  /** The customer's fax number. */
  fax?: Maybe<Scalars['String']['output']>;
  /** The first name of the person associated with the shipping/billing address. */
  firstname?: Maybe<Scalars['String']['output']>;
  /** The ID of a `CustomerAddress` object. */
  id?: Maybe<Scalars['Int']['output']>;
  /** The family name of the person associated with the shipping/billing address. */
  lastname?: Maybe<Scalars['String']['output']>;
  /** The middle name of the person associated with the shipping/billing address. */
  middlename?: Maybe<Scalars['String']['output']>;
  /** The customer's ZIP or postal code. */
  postcode?: Maybe<Scalars['String']['output']>;
  /** An honorific, such as Dr., Mr., or Mrs. */
  prefix?: Maybe<Scalars['String']['output']>;
  /** An object containing the region name, region code, and region ID. */
  region?: Maybe<CustomerAddressRegion>;
  /** The unique ID for a pre-defined region. */
  region_id?: Maybe<Scalars['Int']['output']>;
  /** An array of strings that define the street number and name. */
  street?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** A value such as Sr., Jr., or III. */
  suffix?: Maybe<Scalars['String']['output']>;
  /** The customer's telephone number. */
  telephone?: Maybe<Scalars['String']['output']>;
  /** The customer's Value-added tax (VAT) number (for corporate customers). */
  vat_id?: Maybe<Scalars['String']['output']>;
};


/** Contains detailed information about a customer's billing or shipping address. */
export type CustomerAddressCustom_AttributesV2Args = {
  attributeCodes?: InputMaybe<Array<Scalars['ID']['input']>>;
};

/** Specifies the attribute code and value of a customer address attribute. */
export type CustomerAddressAttribute = {
  __typename?: 'CustomerAddressAttribute';
  /** The name assigned to the customer address attribute. */
  attribute_code?: Maybe<Scalars['String']['output']>;
  /** The value assigned to the customer address attribute. */
  value?: Maybe<Scalars['String']['output']>;
};

/** Specifies the attribute code and value of a customer attribute. */
export type CustomerAddressAttributeInput = {
  /** The name assigned to the attribute. */
  attribute_code: Scalars['String']['input'];
  /** The value assigned to the attribute. */
  value: Scalars['String']['input'];
};

/** Contains details about a billing or shipping address. */
export type CustomerAddressInput = {
  /** The customer's city or town. */
  city?: InputMaybe<Scalars['String']['input']>;
  /** The customer's company. */
  company?: InputMaybe<Scalars['String']['input']>;
  /** The two-letter code representing the customer's country. */
  country_code?: InputMaybe<CountryCodeEnum>;
  country_id?: InputMaybe<CountryCodeEnum>;
  custom_attributes?: InputMaybe<Array<InputMaybe<CustomerAddressAttributeInput>>>;
  /** Custom attributes assigned to the customer address. */
  custom_attributesV2?: InputMaybe<Array<InputMaybe<AttributeValueInput>>>;
  /** Indicates whether the address is the default billing address. */
  default_billing?: InputMaybe<Scalars['Boolean']['input']>;
  /** Indicates whether the address is the default shipping address. */
  default_shipping?: InputMaybe<Scalars['Boolean']['input']>;
  /** The customer's fax number. */
  fax?: InputMaybe<Scalars['String']['input']>;
  /** The first name of the person associated with the billing/shipping address. */
  firstname?: InputMaybe<Scalars['String']['input']>;
  /** The family name of the person associated with the billing/shipping address. */
  lastname?: InputMaybe<Scalars['String']['input']>;
  /** The middle name of the person associated with the billing/shipping address. */
  middlename?: InputMaybe<Scalars['String']['input']>;
  /** The customer's ZIP or postal code. */
  postcode?: InputMaybe<Scalars['String']['input']>;
  /** An honorific, such as Dr., Mr., or Mrs. */
  prefix?: InputMaybe<Scalars['String']['input']>;
  /** An object containing the region name, region code, and region ID. */
  region?: InputMaybe<CustomerAddressRegionInput>;
  /** An array of strings that define the street number and name. */
  street?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** A value such as Sr., Jr., or III. */
  suffix?: InputMaybe<Scalars['String']['input']>;
  /** The customer's telephone number. */
  telephone?: InputMaybe<Scalars['String']['input']>;
  /** The customer's Tax/VAT number (for corporate customers). */
  vat_id?: InputMaybe<Scalars['String']['input']>;
};

/** Defines the customer's state or province. */
export type CustomerAddressRegion = {
  __typename?: 'CustomerAddressRegion';
  /** The state or province name. */
  region?: Maybe<Scalars['String']['output']>;
  /** The address region code. */
  region_code?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a pre-defined region. */
  region_id?: Maybe<Scalars['Int']['output']>;
};

/** Defines the customer's state or province. */
export type CustomerAddressRegionInput = {
  /** The state or province name. */
  region?: InputMaybe<Scalars['String']['input']>;
  /** The address region code. */
  region_code?: InputMaybe<Scalars['String']['input']>;
  /** The unique ID for a pre-defined region. */
  region_id?: InputMaybe<Scalars['Int']['input']>;
};

export type CustomerAddresses = {
  __typename?: 'CustomerAddresses';
  /** An array containing the customer's shipping and billing addresses. */
  items?: Maybe<Array<Maybe<CustomerAddress>>>;
  /** Contains pagination metadata. */
  page_info?: Maybe<SearchResultPageInfo>;
  /** The total count of customer addresses. */
  total_count?: Maybe<Scalars['Int']['output']>;
};

/** Customer attribute metadata. */
export type CustomerAttributeMetadata = CustomAttributeMetadataInterface & {
  __typename?: 'CustomerAttributeMetadata';
  /** The unique identifier for an attribute code. This value should be in lowercase letters without spaces. */
  code: Scalars['ID']['output'];
  /** Default attribute value. */
  default_value?: Maybe<Scalars['String']['output']>;
  /** The type of entity that defines the attribute. */
  entity_type: AttributeEntityTypeEnum;
  /** The frontend class of the attribute. */
  frontend_class?: Maybe<Scalars['String']['output']>;
  /** The frontend input type of the attribute. */
  frontend_input?: Maybe<AttributeFrontendInputEnum>;
  /** The template used for the input of the attribute (e.g., 'date'). */
  input_filter?: Maybe<InputFilterEnum>;
  /** Whether the attribute value is required. */
  is_required: Scalars['Boolean']['output'];
  /** Whether the attribute value must be unique. */
  is_unique: Scalars['Boolean']['output'];
  /** The label assigned to the attribute. */
  label?: Maybe<Scalars['String']['output']>;
  /** The number of lines of the attribute value. */
  multiline_count?: Maybe<Scalars['Int']['output']>;
  /** Attribute options. */
  options: Array<Maybe<CustomAttributeOptionInterface>>;
  /** The position of the attribute in the form. */
  sort_order?: Maybe<Scalars['Int']['output']>;
  /** The validation rules of the attribute value. */
  validate_rules?: Maybe<Array<Maybe<ValidationRule>>>;
};

/** An input object for creating a customer. */
export type CustomerCreateInput = {
  /** Indicates whether the customer has enabled remote shopping assistance. */
  allow_remote_shopping_assistance?: InputMaybe<Scalars['Boolean']['input']>;
  /** The customer's custom attributes. */
  custom_attributes?: InputMaybe<Array<InputMaybe<AttributeValueInput>>>;
  /** The customer's date of birth. */
  date_of_birth?: InputMaybe<Scalars['String']['input']>;
  dob?: InputMaybe<Scalars['String']['input']>;
  /** The customer's email address. */
  email: Scalars['String']['input'];
  /** The customer's first name. */
  firstname: Scalars['String']['input'];
  /** The customer's gender (Male - 1, Female - 2). */
  gender?: InputMaybe<Scalars['Int']['input']>;
  /** Indicates whether the customer is subscribed to the company's newsletter. */
  is_subscribed?: InputMaybe<Scalars['Boolean']['input']>;
  /** The customer's family name. */
  lastname: Scalars['String']['input'];
  /** The customer's middle name. */
  middlename?: InputMaybe<Scalars['String']['input']>;
  /** The customer's password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** An honorific, such as Dr., Mr., or Mrs. */
  prefix?: InputMaybe<Scalars['String']['input']>;
  /** A value such as Sr., Jr., or III. */
  suffix?: InputMaybe<Scalars['String']['input']>;
  /** The customer's Tax/VAT number (for corporate customers). */
  taxvat?: InputMaybe<Scalars['String']['input']>;
};

/** Contains details about a single downloadable product. */
export type CustomerDownloadableProduct = {
  __typename?: 'CustomerDownloadableProduct';
  /** The date and time the purchase was made. */
  date?: Maybe<Scalars['String']['output']>;
  /** The fully qualified URL to the download file. */
  download_url?: Maybe<Scalars['String']['output']>;
  /** The unique ID assigned to the item. */
  order_increment_id?: Maybe<Scalars['String']['output']>;
  /** The remaining number of times the customer can download the product. */
  remaining_downloads?: Maybe<Scalars['String']['output']>;
  /** Indicates when the product becomes available for download. Options are `Pending` and `Invoiced`. */
  status?: Maybe<Scalars['String']['output']>;
};

/** Contains a list of downloadable products. */
export type CustomerDownloadableProducts = {
  __typename?: 'CustomerDownloadableProducts';
  /** An array of purchased downloadable items. */
  items?: Maybe<Array<Maybe<CustomerDownloadableProduct>>>;
};

/** Input data for customer profile information */
export type CustomerInput = {
  /** The customer's date of birth. */
  date_of_birth?: InputMaybe<Scalars['String']['input']>;
  dob?: InputMaybe<Scalars['String']['input']>;
  /** The customer's email address. Required when creating a customer. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** The customer's first name. */
  firstname?: InputMaybe<Scalars['String']['input']>;
  /** The customer's gender (Male - 1, Female - 2). */
  gender?: InputMaybe<Scalars['Int']['input']>;
  /** Flag indicating if the customer is a seller or not */
  is_seller?: InputMaybe<Scalars['Boolean']['input']>;
  /** Indicates whether the customer is subscribed to the company's newsletter. */
  is_subscribed?: InputMaybe<Scalars['Boolean']['input']>;
  /** The customer's family name. */
  lastname?: InputMaybe<Scalars['String']['input']>;
  /** The customer's middle name. */
  middlename?: InputMaybe<Scalars['String']['input']>;
  /** The customer's password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** An honorific, such as Dr., Mr., or Mrs. */
  prefix?: InputMaybe<Scalars['String']['input']>;
  /** Marketplace seller profile URL */
  profileurl?: InputMaybe<Scalars['String']['input']>;
  /** A value such as Sr., Jr., or III. */
  suffix?: InputMaybe<Scalars['String']['input']>;
  /** The customer's Tax/VAT number (for corporate customers). */
  taxvat?: InputMaybe<Scalars['String']['input']>;
};

/** Contains details about each of the customer's orders. */
export type CustomerOrder = {
  __typename?: 'CustomerOrder';
  /** Coupons applied to the order. */
  applied_coupons: Array<Maybe<AppliedCoupon>>;
  /** List of available order actions. */
  available_actions: Array<Maybe<OrderActionType>>;
  /** The billing address for the order. */
  billing_address?: Maybe<OrderAddress>;
  /** The shipping carrier for the order delivery. */
  carrier?: Maybe<Scalars['String']['output']>;
  /** Comments about the order. */
  comments?: Maybe<Array<Maybe<SalesCommentItem>>>;
  /** @deprecated Use the `order_date` field instead. */
  created_at?: Maybe<Scalars['String']['output']>;
  /** A list of credit memos. */
  credit_memos?: Maybe<Array<Maybe<CreditMemo>>>;
  /** Returns customer information from order. */
  customer_info: OrderCustomerInfo;
  /** Order customer email. */
  email?: Maybe<Scalars['String']['output']>;
  /** The entered gift message for the order */
  gift_message?: Maybe<GiftMessage>;
  /** @deprecated Use the `totals.grand_total` field instead. */
  grand_total?: Maybe<Scalars['Float']['output']>;
  /** The unique ID for a `CustomerOrder` object. */
  id: Scalars['ID']['output'];
  /** @deprecated Use the `id` field instead. */
  increment_id?: Maybe<Scalars['String']['output']>;
  /** A list of invoices for the order. */
  invoices: Array<Maybe<Invoice>>;
  /** `TRUE` if the order is virtual */
  is_virtual: Scalars['Boolean']['output'];
  /** An array containing the items purchased in this order. */
  items?: Maybe<Array<Maybe<OrderItemInterface>>>;
  /** The order number. */
  number: Scalars['String']['output'];
  /** The date the order was placed. */
  order_date: Scalars['String']['output'];
  /** @deprecated Use the `number` field instead. */
  order_number: Scalars['String']['output'];
  /** The date the order status was last updated. */
  order_status_change_date: Scalars['String']['output'];
  /** Payment details for the order. */
  payment_methods?: Maybe<Array<Maybe<OrderPaymentMethod>>>;
  /** A list of shipments for the order. */
  shipments?: Maybe<Array<Maybe<OrderShipment>>>;
  /** The shipping address for the order. */
  shipping_address?: Maybe<OrderAddress>;
  /** The delivery method for the order. */
  shipping_method?: Maybe<Scalars['String']['output']>;
  /** The current status of the order. */
  status: Scalars['String']['output'];
  /** The token that can be used to retrieve the order using order query. */
  token: Scalars['String']['output'];
  /** Details about the calculated totals for this order. */
  total?: Maybe<OrderTotal>;
};

/** CustomerOrderSortInput specifies the field to use for sorting search results and indicates whether the results are sorted in ascending or descending order. */
export type CustomerOrderSortInput = {
  /** This enumeration indicates whether to return results in ascending or descending order */
  sort_direction: SortEnum;
  /** Specifies the field to use for sorting */
  sort_field: CustomerOrderSortableField;
};

/** Specifies the field to use for sorting */
export enum CustomerOrderSortableField {
  /** Sorts customer orders by created_at field */
  CreatedAt = 'CREATED_AT',
  /** Sorts customer orders by number */
  Number = 'NUMBER'
}

/** The collection of orders that match the conditions defined in the filter. */
export type CustomerOrders = {
  __typename?: 'CustomerOrders';
  /** Date of the first order placed in the store */
  date_of_first_order?: Maybe<Scalars['String']['output']>;
  /** An array of customer orders. */
  items: Array<Maybe<CustomerOrder>>;
  /** Contains pagination metadata. */
  page_info?: Maybe<SearchResultPageInfo>;
  /** The total count of customer orders. */
  total_count?: Maybe<Scalars['Int']['output']>;
};

/** Identifies the filter to use for filtering orders. */
export type CustomerOrdersFilterInput = {
  /** Filters by order base grand total value. */
  grand_total?: InputMaybe<FilterRangeTypeInput>;
  /** Filters by order number. */
  number?: InputMaybe<FilterStringTypeInput>;
  /** Filters by order created_at time. */
  order_date?: InputMaybe<FilterRangeTypeInput>;
  /** Filters by order status. */
  status?: InputMaybe<FilterEqualTypeInput>;
};

/** Contains details about a newly-created or updated customer. */
export type CustomerOutput = {
  __typename?: 'CustomerOutput';
  /** Customer details after creating or updating a customer. */
  customer: Customer;
};

/** Customer data for profile creation or updates */
export type CustomerParams = {
  /** Customer Email address */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Customer's first name */
  firstname?: InputMaybe<Scalars['String']['input']>;
  /** Customer's last name */
  lastname?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the store for customer registration */
  storeId?: InputMaybe<Scalars['Int']['input']>;
  /** The website ID where the customer is registered */
  websiteId?: InputMaybe<Scalars['Int']['input']>;
};

/** Contains payment tokens stored in the customer's vault. */
export type CustomerPaymentTokens = {
  __typename?: 'CustomerPaymentTokens';
  /** An array of payment tokens. */
  items: Array<Maybe<PaymentToken>>;
};

/** Contains a customer authorization token. */
export type CustomerToken = {
  __typename?: 'CustomerToken';
  /** The customer authorization token. */
  token?: Maybe<Scalars['String']['output']>;
};

/** An input object for updating a customer. */
export type CustomerUpdateInput = {
  /** Indicates whether the customer has enabled remote shopping assistance. */
  allow_remote_shopping_assistance?: InputMaybe<Scalars['Boolean']['input']>;
  /** The customer's custom attributes. */
  custom_attributes?: InputMaybe<Array<InputMaybe<AttributeValueInput>>>;
  /** The customer's date of birth. */
  date_of_birth?: InputMaybe<Scalars['String']['input']>;
  dob?: InputMaybe<Scalars['String']['input']>;
  /** The customer's first name. */
  firstname?: InputMaybe<Scalars['String']['input']>;
  /** The customer's gender (Male - 1, Female - 2). */
  gender?: InputMaybe<Scalars['Int']['input']>;
  /** Indicates whether the customer is subscribed to the company's newsletter. */
  is_subscribed?: InputMaybe<Scalars['Boolean']['input']>;
  /** The customer's family name. */
  lastname?: InputMaybe<Scalars['String']['input']>;
  /** The customer's middle name. */
  middlename?: InputMaybe<Scalars['String']['input']>;
  /** An honorific, such as Dr., Mr., or Mrs. */
  prefix?: InputMaybe<Scalars['String']['input']>;
  /** A value such as Sr., Jr., or III. */
  suffix?: InputMaybe<Scalars['String']['input']>;
  /** The customer's Tax/VAT number (for corporate customers). */
  taxvat?: InputMaybe<Scalars['String']['input']>;
};

/** Contains information about a text area that is defined as part of a customizable option. */
export type CustomizableAreaOption = CustomizableOptionInterface & {
  __typename?: 'CustomizableAreaOption';
  /**
   * Option ID.
   * @deprecated Use `uid` instead
   */
  option_id?: Maybe<Scalars['Int']['output']>;
  /** The Stock Keeping Unit of the base product. */
  product_sku?: Maybe<Scalars['String']['output']>;
  /** Indicates whether the option is required. */
  required?: Maybe<Scalars['Boolean']['output']>;
  /** The order in which the option is displayed. */
  sort_order?: Maybe<Scalars['Int']['output']>;
  /** The display name for this option. */
  title?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `CustomizableOptionInterface` object. */
  uid: Scalars['ID']['output'];
  /** An object that defines a text area. */
  value?: Maybe<CustomizableAreaValue>;
};

/** Defines the price and sku of a product whose page contains a customized text area. */
export type CustomizableAreaValue = {
  __typename?: 'CustomizableAreaValue';
  /** The maximum number of characters that can be entered for this customizable option. */
  max_characters?: Maybe<Scalars['Int']['output']>;
  /** The price assigned to this option. */
  price?: Maybe<Scalars['Float']['output']>;
  /** FIXED, PERCENT, or DYNAMIC. */
  price_type?: Maybe<PriceTypeEnum>;
  /** The Stock Keeping Unit for this option. */
  sku?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `CustomizableAreaValue` object. */
  uid: Scalars['ID']['output'];
};

/** Contains information about a set of checkbox values that are defined as part of a customizable option. */
export type CustomizableCheckboxOption = CustomizableOptionInterface & {
  __typename?: 'CustomizableCheckboxOption';
  /**
   * Option ID.
   * @deprecated Use `uid` instead
   */
  option_id?: Maybe<Scalars['Int']['output']>;
  /** Indicates whether the option is required. */
  required?: Maybe<Scalars['Boolean']['output']>;
  /** The order in which the option is displayed. */
  sort_order?: Maybe<Scalars['Int']['output']>;
  /** The display name for this option. */
  title?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `CustomizableOptionInterface` object. */
  uid: Scalars['ID']['output'];
  /** An array that defines a set of checkbox values. */
  value?: Maybe<Array<Maybe<CustomizableCheckboxValue>>>;
};

/** Defines the price and sku of a product whose page contains a customized set of checkbox values. */
export type CustomizableCheckboxValue = {
  __typename?: 'CustomizableCheckboxValue';
  /** The ID assigned to the value. */
  option_type_id?: Maybe<Scalars['Int']['output']>;
  /** The price assigned to this option. */
  price?: Maybe<Scalars['Float']['output']>;
  /** FIXED, PERCENT, or DYNAMIC. */
  price_type?: Maybe<PriceTypeEnum>;
  /** The Stock Keeping Unit for this option. */
  sku?: Maybe<Scalars['String']['output']>;
  /** The order in which the checkbox value is displayed. */
  sort_order?: Maybe<Scalars['Int']['output']>;
  /** The display name for this option. */
  title?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `CustomizableCheckboxValue` object. */
  uid: Scalars['ID']['output'];
};

/** Contains information about a date picker that is defined as part of a customizable option. */
export type CustomizableDateOption = CustomizableOptionInterface & {
  __typename?: 'CustomizableDateOption';
  /**
   * Option ID.
   * @deprecated Use `uid` instead
   */
  option_id?: Maybe<Scalars['Int']['output']>;
  /** The Stock Keeping Unit of the base product. */
  product_sku?: Maybe<Scalars['String']['output']>;
  /** Indicates whether the option is required. */
  required?: Maybe<Scalars['Boolean']['output']>;
  /** The order in which the option is displayed. */
  sort_order?: Maybe<Scalars['Int']['output']>;
  /** The display name for this option. */
  title?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `CustomizableOptionInterface` object. */
  uid: Scalars['ID']['output'];
  /** An object that defines a date field in a customizable option. */
  value?: Maybe<CustomizableDateValue>;
};

/** Defines the customizable date type. */
export enum CustomizableDateTypeEnum {
  Date = 'DATE',
  DateTime = 'DATE_TIME',
  Time = 'TIME'
}

/** Defines the price and sku of a product whose page contains a customized date picker. */
export type CustomizableDateValue = {
  __typename?: 'CustomizableDateValue';
  /** The price assigned to this option. */
  price?: Maybe<Scalars['Float']['output']>;
  /** FIXED, PERCENT, or DYNAMIC. */
  price_type?: Maybe<PriceTypeEnum>;
  /** The Stock Keeping Unit for this option. */
  sku?: Maybe<Scalars['String']['output']>;
  /** DATE, DATE_TIME or TIME */
  type?: Maybe<CustomizableDateTypeEnum>;
  /** The unique ID for a `CustomizableDateValue` object. */
  uid: Scalars['ID']['output'];
};

/** Contains information about a drop down menu that is defined as part of a customizable option. */
export type CustomizableDropDownOption = CustomizableOptionInterface & {
  __typename?: 'CustomizableDropDownOption';
  /**
   * Option ID.
   * @deprecated Use `uid` instead
   */
  option_id?: Maybe<Scalars['Int']['output']>;
  /** Indicates whether the option is required. */
  required?: Maybe<Scalars['Boolean']['output']>;
  /** The order in which the option is displayed. */
  sort_order?: Maybe<Scalars['Int']['output']>;
  /** The display name for this option. */
  title?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `CustomizableOptionInterface` object. */
  uid: Scalars['ID']['output'];
  /** An array that defines the set of options for a drop down menu. */
  value?: Maybe<Array<Maybe<CustomizableDropDownValue>>>;
};

/** Defines the price and sku of a product whose page contains a customized drop down menu. */
export type CustomizableDropDownValue = {
  __typename?: 'CustomizableDropDownValue';
  /** The ID assigned to the value. */
  option_type_id?: Maybe<Scalars['Int']['output']>;
  /** The price assigned to this option. */
  price?: Maybe<Scalars['Float']['output']>;
  /** FIXED, PERCENT, or DYNAMIC. */
  price_type?: Maybe<PriceTypeEnum>;
  /** The Stock Keeping Unit for this option. */
  sku?: Maybe<Scalars['String']['output']>;
  /** The order in which the option is displayed. */
  sort_order?: Maybe<Scalars['Int']['output']>;
  /** The display name for this option. */
  title?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `CustomizableDropDownValue` object. */
  uid: Scalars['ID']['output'];
};

/** Contains information about a text field that is defined as part of a customizable option. */
export type CustomizableFieldOption = CustomizableOptionInterface & {
  __typename?: 'CustomizableFieldOption';
  /**
   * Option ID.
   * @deprecated Use `uid` instead
   */
  option_id?: Maybe<Scalars['Int']['output']>;
  /** The Stock Keeping Unit of the base product. */
  product_sku?: Maybe<Scalars['String']['output']>;
  /** Indicates whether the option is required. */
  required?: Maybe<Scalars['Boolean']['output']>;
  /** The order in which the option is displayed. */
  sort_order?: Maybe<Scalars['Int']['output']>;
  /** The display name for this option. */
  title?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `CustomizableOptionInterface` object. */
  uid: Scalars['ID']['output'];
  /** An object that defines a text field. */
  value?: Maybe<CustomizableFieldValue>;
};

/** Defines the price and sku of a product whose page contains a customized text field. */
export type CustomizableFieldValue = {
  __typename?: 'CustomizableFieldValue';
  /** The maximum number of characters that can be entered for this customizable option. */
  max_characters?: Maybe<Scalars['Int']['output']>;
  /** The price of the custom value. */
  price?: Maybe<Scalars['Float']['output']>;
  /** FIXED, PERCENT, or DYNAMIC. */
  price_type?: Maybe<PriceTypeEnum>;
  /** The Stock Keeping Unit for this option. */
  sku?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `CustomizableFieldValue` object. */
  uid: Scalars['ID']['output'];
};

/** Contains information about a file picker that is defined as part of a customizable option. */
export type CustomizableFileOption = CustomizableOptionInterface & {
  __typename?: 'CustomizableFileOption';
  /**
   * Option ID.
   * @deprecated Use `uid` instead
   */
  option_id?: Maybe<Scalars['Int']['output']>;
  /** The Stock Keeping Unit of the base product. */
  product_sku?: Maybe<Scalars['String']['output']>;
  /** Indicates whether the option is required. */
  required?: Maybe<Scalars['Boolean']['output']>;
  /** The order in which the option is displayed. */
  sort_order?: Maybe<Scalars['Int']['output']>;
  /** The display name for this option. */
  title?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `CustomizableOptionInterface` object. */
  uid: Scalars['ID']['output'];
  /** An object that defines a file value. */
  value?: Maybe<CustomizableFileValue>;
};

/** Defines the price and sku of a product whose page contains a customized file picker. */
export type CustomizableFileValue = {
  __typename?: 'CustomizableFileValue';
  /** The file extension to accept. */
  file_extension?: Maybe<Scalars['String']['output']>;
  /** The maximum width of an image. */
  image_size_x?: Maybe<Scalars['Int']['output']>;
  /** The maximum height of an image. */
  image_size_y?: Maybe<Scalars['Int']['output']>;
  /** The price assigned to this option. */
  price?: Maybe<Scalars['Float']['output']>;
  /** FIXED, PERCENT, or DYNAMIC. */
  price_type?: Maybe<PriceTypeEnum>;
  /** The Stock Keeping Unit for this option. */
  sku?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `CustomizableFileValue` object. */
  uid: Scalars['ID']['output'];
};

/** Contains information about a multiselect that is defined as part of a customizable option. */
export type CustomizableMultipleOption = CustomizableOptionInterface & {
  __typename?: 'CustomizableMultipleOption';
  /**
   * Option ID.
   * @deprecated Use `uid` instead
   */
  option_id?: Maybe<Scalars['Int']['output']>;
  /** Indicates whether the option is required. */
  required?: Maybe<Scalars['Boolean']['output']>;
  /** The order in which the option is displayed. */
  sort_order?: Maybe<Scalars['Int']['output']>;
  /** The display name for this option. */
  title?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `CustomizableOptionInterface` object. */
  uid: Scalars['ID']['output'];
  /** An array that defines the set of options for a multiselect. */
  value?: Maybe<Array<Maybe<CustomizableMultipleValue>>>;
};

/** Defines the price and sku of a product whose page contains a customized multiselect. */
export type CustomizableMultipleValue = {
  __typename?: 'CustomizableMultipleValue';
  /** The ID assigned to the value. */
  option_type_id?: Maybe<Scalars['Int']['output']>;
  /** The price assigned to this option. */
  price?: Maybe<Scalars['Float']['output']>;
  /** FIXED, PERCENT, or DYNAMIC. */
  price_type?: Maybe<PriceTypeEnum>;
  /** The Stock Keeping Unit for this option. */
  sku?: Maybe<Scalars['String']['output']>;
  /** The order in which the option is displayed. */
  sort_order?: Maybe<Scalars['Int']['output']>;
  /** The display name for this option. */
  title?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `CustomizableMultipleValue` object. */
  uid: Scalars['ID']['output'];
};

/** Defines a customizable option. */
export type CustomizableOptionInput = {
  /** The customizable option ID of the product. */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** The unique ID for a `CartItemInterface` object. */
  uid?: InputMaybe<Scalars['ID']['input']>;
  /** The string value of the option. */
  value_string: Scalars['String']['input'];
};

/** Contains basic information about a customizable option. It can be implemented by several types of configurable options. */
export type CustomizableOptionInterface = {
  /**
   * Option ID.
   * @deprecated Use `uid` instead
   */
  option_id?: Maybe<Scalars['Int']['output']>;
  /** Indicates whether the option is required. */
  required?: Maybe<Scalars['Boolean']['output']>;
  /** The order in which the option is displayed. */
  sort_order?: Maybe<Scalars['Int']['output']>;
  /** The display name for this option. */
  title?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `CustomizableOptionInterface` object. */
  uid: Scalars['ID']['output'];
};

/** Contains information about customizable product options. */
export type CustomizableProductInterface = {
  /** An array of options for a customizable product. */
  options?: Maybe<Array<Maybe<CustomizableOptionInterface>>>;
};

/** Contains information about a set of radio buttons that are defined as part of a customizable option. */
export type CustomizableRadioOption = CustomizableOptionInterface & {
  __typename?: 'CustomizableRadioOption';
  /**
   * Option ID.
   * @deprecated Use `uid` instead
   */
  option_id?: Maybe<Scalars['Int']['output']>;
  /** Indicates whether the option is required. */
  required?: Maybe<Scalars['Boolean']['output']>;
  /** The order in which the option is displayed. */
  sort_order?: Maybe<Scalars['Int']['output']>;
  /** The display name for this option. */
  title?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `CustomizableOptionInterface` object. */
  uid: Scalars['ID']['output'];
  /** An array that defines a set of radio buttons. */
  value?: Maybe<Array<Maybe<CustomizableRadioValue>>>;
};

/** Defines the price and sku of a product whose page contains a customized set of radio buttons. */
export type CustomizableRadioValue = {
  __typename?: 'CustomizableRadioValue';
  /** The ID assigned to the value. */
  option_type_id?: Maybe<Scalars['Int']['output']>;
  /** The price assigned to this option. */
  price?: Maybe<Scalars['Float']['output']>;
  /** FIXED, PERCENT, or DYNAMIC. */
  price_type?: Maybe<PriceTypeEnum>;
  /** The Stock Keeping Unit for this option. */
  sku?: Maybe<Scalars['String']['output']>;
  /** The order in which the radio button is displayed. */
  sort_order?: Maybe<Scalars['Int']['output']>;
  /** The display name for this option. */
  title?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `CustomizableRadioValue` object. */
  uid: Scalars['ID']['output'];
};

/** Contains the results of the request to delete a compare list. */
export type DeleteCompareListOutput = {
  __typename?: 'DeleteCompareListOutput';
  /** Indicates whether the compare list was successfully deleted. */
  result: Scalars['Boolean']['output'];
};

export type DeleteDraftProduct = {
  __typename?: 'DeleteDraftProduct';
  /** Message indicating success or failure of the draft product deletion operation */
  message?: Maybe<Scalars['String']['output']>;
  /** Indicates whether the draft product was successfully deleted (true: success, false: failure) */
  status?: Maybe<Scalars['Boolean']['output']>;
};

/** Indicates whether the request succeeded and returns the remaining customer payment tokens. */
export type DeletePaymentTokenOutput = {
  __typename?: 'DeletePaymentTokenOutput';
  /** A container for the customer's remaining payment tokens. */
  customerPaymentTokens?: Maybe<CustomerPaymentTokens>;
  /** Indicates whether the request succeeded. */
  result: Scalars['Boolean']['output'];
};

/** Delete Seller Products */
export type DeleteProductOutput = {
  __typename?: 'DeleteProductOutput';
  /** Message */
  message?: Maybe<Scalars['String']['output']>;
  /** Status */
  status?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteSellerConfigAttribute = {
  __typename?: 'DeleteSellerConfigAttribute';
  /** Message indicating success or failure of the attribute deletion operation */
  message?: Maybe<Scalars['String']['output']>;
  /** Indicates whether the attribute was successfully deleted (true: success, false: failure) */
  status?: Maybe<Scalars['Boolean']['output']>;
};

export type DenyReason = {
  __typename?: 'DenyReason';
  /** Reason for denying the product listing */
  reason?: Maybe<Scalars['String']['output']>;
};

/** Defines an individual discount. A discount can be applied to the cart as a whole or to an item, shipping. */
export type Discount = {
  __typename?: 'Discount';
  /** The amount of the discount. */
  amount: Money;
  /** The type of the entity the discount is applied to. */
  applied_to: CartDiscountType;
  /** The coupon related to the discount. */
  coupon?: Maybe<AppliedCoupon>;
  /** A description of the discount. */
  label: Scalars['String']['output'];
};

/** An implementation for downloadable product cart items. */
export type DownloadableCartItem = CartItemInterface & {
  __typename?: 'DownloadableCartItem';
  /** An array containing the customizable options the shopper selected. */
  customizable_options: Array<Maybe<SelectedCustomizableOption>>;
  /** An array of errors encountered while loading the cart item */
  errors?: Maybe<Array<Maybe<CartItemError>>>;
  /** @deprecated Use `uid` instead. */
  id: Scalars['String']['output'];
  /** True if requested quantity is less than available stock, false otherwise. */
  is_available: Scalars['Boolean']['output'];
  /** An array containing information about the links for the downloadable product added to the cart. */
  links?: Maybe<Array<Maybe<DownloadableProductLinks>>>;
  /** Message to display when the product is not available with this selected option. */
  not_available_message?: Maybe<Scalars['String']['output']>;
  /** Contains details about the price of the item, including taxes and discounts. */
  prices?: Maybe<CartItemPrices>;
  /** Details about an item in the cart. */
  product: ProductInterface;
  /** The quantity of this item in the cart. */
  quantity: Scalars['Float']['output'];
  /** An array containing information about samples of the selected downloadable product. */
  samples?: Maybe<Array<Maybe<DownloadableProductSamples>>>;
  /** The unique ID for a `CartItemInterface` object. */
  uid: Scalars['ID']['output'];
};

/** Defines downloadable product options for `CreditMemoItemInterface`. */
export type DownloadableCreditMemoItem = CreditMemoItemInterface & {
  __typename?: 'DownloadableCreditMemoItem';
  /** Details about the final discount amount for the base product, including discounts on options. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** A list of downloadable links that are refunded from the downloadable product. */
  downloadable_links?: Maybe<Array<Maybe<DownloadableItemsLinks>>>;
  /** The unique ID for a `CreditMemoItemInterface` object. */
  id: Scalars['ID']['output'];
  /** The order item the credit memo is applied to. */
  order_item?: Maybe<OrderItemInterface>;
  /** The name of the base product. */
  product_name?: Maybe<Scalars['String']['output']>;
  /** The sale price for the base product, including selected options. */
  product_sale_price: Money;
  /** The SKU of the base product. */
  product_sku: Scalars['String']['output'];
  /** The number of refunded items. */
  quantity_refunded?: Maybe<Scalars['Float']['output']>;
};

export enum DownloadableFileTypeEnum {
  /** @deprecated `sample_url` serves to get the downloadable sample */
  File = 'FILE',
  /** @deprecated `sample_url` serves to get the downloadable sample */
  Url = 'URL'
}

/** Defines downloadable product options for `InvoiceItemInterface`. */
export type DownloadableInvoiceItem = InvoiceItemInterface & {
  __typename?: 'DownloadableInvoiceItem';
  /** Information about the final discount amount for the base product, including discounts on options. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** A list of downloadable links that are invoiced from the downloadable product. */
  downloadable_links?: Maybe<Array<Maybe<DownloadableItemsLinks>>>;
  /** The unique ID for an `InvoiceItemInterface` object. */
  id: Scalars['ID']['output'];
  /** Details about an individual order item. */
  order_item?: Maybe<OrderItemInterface>;
  /** The name of the base product. */
  product_name?: Maybe<Scalars['String']['output']>;
  /** The sale price for the base product including selected options. */
  product_sale_price: Money;
  /** The SKU of the base product. */
  product_sku: Scalars['String']['output'];
  /** The number of invoiced items. */
  quantity_invoiced?: Maybe<Scalars['Float']['output']>;
};

/** Defines characteristics of the links for downloadable product. */
export type DownloadableItemsLinks = {
  __typename?: 'DownloadableItemsLinks';
  /** A number indicating the sort order. */
  sort_order?: Maybe<Scalars['Int']['output']>;
  /** The display name of the link. */
  title?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `DownloadableItemsLinks` object. */
  uid: Scalars['ID']['output'];
};

export type DownloadableLinkInput = {
  /** List of downloadable links for the product */
  link?: InputMaybe<Array<InputMaybe<DownloadableLinksData>>>;
  /** List of downloadable samples for the product */
  sample?: InputMaybe<Array<InputMaybe<SampleLinks>>>;
};

export type DownloadableLinkTitle = {
  __typename?: 'DownloadableLinkTitle';
  /** The title of the downloadable link. */
  title?: Maybe<Scalars['String']['output']>;
};

export type DownloadableLinksData = {
  /** File path for the downloadable product */
  file: Scalars['String']['input'];
  /** Flag to indicate if the link is shareable (1: shareable, 0: not shareable) */
  is_shareable?: InputMaybe<Scalars['Int']['input']>;
  /** Flag to indicate if the download is unlimited (1: unlimited, 0: limited) */
  is_unlimited?: InputMaybe<Scalars['Int']['input']>;
  /** Unique identifier for the downloadable link */
  link_id: Scalars['Int']['input'];
  /** URL to download the file */
  link_url?: InputMaybe<Scalars['String']['input']>;
  /** Number of times the product can be downloaded */
  number_of_downloads?: InputMaybe<Scalars['Int']['input']>;
  /** Price of the downloadable product */
  price: Scalars['Float']['input'];
  /** Optional sample data for the downloadable product */
  sample?: InputMaybe<SampleDownloadData>;
  /** Title of the downloadable link */
  title: Scalars['String']['input'];
  /** Type of downloadable product (e.g., 'File', 'URL') */
  type: Scalars['String']['input'];
};

/** Defines downloadable product options for `OrderItemInterface`. */
export type DownloadableOrderItem = OrderItemInterface & {
  __typename?: 'DownloadableOrderItem';
  /** The final discount information for the product. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** A list of downloadable links that are ordered from the downloadable product. */
  downloadable_links?: Maybe<Array<Maybe<DownloadableItemsLinks>>>;
  /** The entered option for the base product, such as a logo or image. */
  entered_options?: Maybe<Array<Maybe<OrderItemOption>>>;
  /** The selected gift message for the order item */
  gift_message?: Maybe<GiftMessage>;
  /** The unique ID for an `OrderItemInterface` object. */
  id: Scalars['ID']['output'];
  /** Contains details about the price of the item, including taxes and discounts. */
  prices?: Maybe<OrderItemPrices>;
  /** The ProductInterface object, which contains details about the base product */
  product?: Maybe<ProductInterface>;
  /** The name of the base product. */
  product_name?: Maybe<Scalars['String']['output']>;
  /** The sale price of the base product, including selected options. */
  product_sale_price: Money;
  /** The SKU of the base product. */
  product_sku: Scalars['String']['output'];
  /** The type of product, such as simple, configurable, etc. */
  product_type?: Maybe<Scalars['String']['output']>;
  /** URL key of the base product. */
  product_url_key?: Maybe<Scalars['String']['output']>;
  /** The number of canceled items. */
  quantity_canceled?: Maybe<Scalars['Float']['output']>;
  /** The number of invoiced items. */
  quantity_invoiced?: Maybe<Scalars['Float']['output']>;
  /** The number of units ordered for this item. */
  quantity_ordered?: Maybe<Scalars['Float']['output']>;
  /** The number of refunded items. */
  quantity_refunded?: Maybe<Scalars['Float']['output']>;
  /** The number of returned items. */
  quantity_returned?: Maybe<Scalars['Float']['output']>;
  /** The number of shipped items. */
  quantity_shipped?: Maybe<Scalars['Float']['output']>;
  /** The selected options for the base product, such as color or size. */
  selected_options?: Maybe<Array<Maybe<OrderItemOption>>>;
  /** The status of the order item. */
  status?: Maybe<Scalars['String']['output']>;
};

/** Defines a product that the shopper downloads. */
export type DownloadableProduct = CustomizableProductInterface & ProductInterface & RoutableInterface & {
  __typename?: 'DownloadableProduct';
  /** The productdata query returns the product attributes */
  attributeValues?: Maybe<Array<Maybe<ProductAttributes>>>;
  /**
   * The attribute set assigned to the product.
   * @deprecated The field should not be used on the storefront.
   */
  attribute_set_id?: Maybe<Scalars['Int']['output']>;
  /** Name of the product attribute set */
  attribute_set_name?: Maybe<Scalars['String']['output']>;
  /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled. */
  canonical_url?: Maybe<Scalars['String']['output']>;
  /** The categories assigned to a product. */
  categories?: Maybe<Array<Maybe<CategoryInterface>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  color?: Maybe<Scalars['Int']['output']>;
  /** The product's country of origin. */
  country_of_manufacture?: Maybe<Scalars['String']['output']>;
  /**
   * Timestamp indicating when the product was created.
   * @deprecated The field should not be used on the storefront.
   */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Crosssell Products */
  crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** Product custom attributes. */
  custom_attributesV2?: Maybe<ProductCustomAttributes>;
  /** Reason for denying the product listing */
  deny_reason?: Maybe<DenyReason>;
  /** Detailed information about the product. The value can include simple HTML tags. */
  description?: Maybe<ComplexTextValue>;
  /** An array containing information about the links for this downloadable product. */
  downloadable_product_links?: Maybe<Array<Maybe<DownloadableProductLinks>>>;
  /** An array containing information about samples of this downloadable product. */
  downloadable_product_samples?: Maybe<Array<Maybe<DownloadableProductSamples>>>;
  /** Returns a value indicating gift message availability for the product. */
  gift_message_available: Scalars['Boolean']['output'];
  /**
   * The ID number assigned to the product.
   * @deprecated Use the `uid` field instead.
   */
  id?: Maybe<Scalars['Int']['output']>;
  /** The relative path to the main image on the product page. */
  image?: Maybe<ProductImage>;
  /** A value of 1 indicates that each link in the array must be purchased separately. */
  links_purchased_separately?: Maybe<Scalars['Int']['output']>;
  /** The heading above the list of downloadable products. */
  links_title?: Maybe<Scalars['String']['output']>;
  /**
   * A number representing the product's manufacturer.
   * @deprecated Use the `custom_attributes` field instead.
   */
  manufacturer?: Maybe<Scalars['Int']['output']>;
  /** Maximum Qty Allowed in Shopping Cart */
  max_sale_qty?: Maybe<Scalars['Float']['output']>;
  /** An array of media gallery objects. */
  media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
  /**
   * An array of MediaGalleryEntry objects.
   * @deprecated Use `media_gallery` instead.
   */
  media_gallery_entries?: Maybe<Array<Maybe<MediaGalleryEntry>>>;
  /** A brief overview of the product for search results listings, maximum 255 characters. */
  meta_description?: Maybe<Scalars['String']['output']>;
  /** A comma-separated list of keywords that are visible only to search engines. */
  meta_keyword?: Maybe<Scalars['String']['output']>;
  /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
  meta_title?: Maybe<Scalars['String']['output']>;
  /** Minimum Qty Allowed in Shopping Cart */
  min_sale_qty?: Maybe<Scalars['Float']['output']>;
  /** The product name. Customers use this name to identify the product. */
  name?: Maybe<Scalars['String']['output']>;
  /** The beginning date for new product listings, and determines if the product is featured as a new product. */
  new_from_date?: Maybe<Scalars['String']['output']>;
  /** The end date for new product listings. */
  new_to_date?: Maybe<Scalars['String']['output']>;
  /** Product stock only x left count */
  only_x_left_in_stock?: Maybe<Scalars['Float']['output']>;
  /** An array of options for a customizable product. */
  options?: Maybe<Array<Maybe<CustomizableOptionInterface>>>;
  /** If the product has multiple options, determines where they appear on the product page. */
  options_container?: Maybe<Scalars['String']['output']>;
  /**
   * Indicates the price of an item.
   * @deprecated Use `price_range` for product price information.
   */
  price?: Maybe<ProductPrices>;
  /** The range of prices for the product */
  price_range: PriceRange;
  /** An array of `TierPrice` objects. */
  price_tiers?: Maybe<Array<Maybe<TierPrice>>>;
  /** An array of `ProductLinks` objects. */
  product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>;
  /** Current status of the product */
  product_status?: Maybe<Scalars['String']['output']>;
  /** Quantity available for the product */
  qty?: Maybe<Scalars['Int']['output']>;
  /** Quantity of the product confirmed for sale */
  qty_confirmed?: Maybe<ProductQtyConfirmed>;
  /** Quantity of the product pending sale */
  qty_pending?: Maybe<ProductQtyPending>;
  /** Quantity of the product sold */
  qty_sold?: Maybe<ProductQtySold>;
  /** Amount of available stock */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** The average of all the ratings given to the product. */
  rating_summary: Scalars['Float']['output'];
  /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
  redirect_code: Scalars['Int']['output'];
  /** An array of products to be displayed in a Related Products block. */
  related_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
  relative_url?: Maybe<Scalars['String']['output']>;
  /** The total count of all the reviews given to the product. */
  review_count: Scalars['Int']['output'];
  /** The list of products reviews. */
  reviews: ProductReviews;
  /** @deprecated Use the `custom_attributes` field instead. */
  seller_id?: Maybe<Scalars['Int']['output']>;
  /** A short description of the product. Its use depends on the theme. */
  short_description?: Maybe<ComplexTextValue>;
  /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
  sku?: Maybe<Scalars['String']['output']>;
  /** The relative path to the small image, which is used on catalog pages. */
  small_image?: Maybe<ProductImage>;
  /**
   * The beginning date that a product has a special price.
   * @deprecated The field should not be used on the storefront.
   */
  special_from_date?: Maybe<Scalars['String']['output']>;
  /** The discounted price of the product. */
  special_price?: Maybe<Scalars['Float']['output']>;
  /** The end date for a product with a special price. */
  special_to_date?: Maybe<Scalars['String']['output']>;
  /** Stock status of the product */
  stock_status?: Maybe<ProductStockStatus>;
  /** The file name of a swatch image. */
  swatch_image?: Maybe<Scalars['String']['output']>;
  /** The relative path to the product's thumbnail image. */
  thumbnail?: Maybe<ProductImage>;
  /**
   * The price when tier pricing is in effect and the items purchased threshold has been reached.
   * @deprecated Use `price_tiers` for product tier price information.
   */
  tier_price?: Maybe<Scalars['Float']['output']>;
  /**
   * An array of ProductTierPrices objects.
   * @deprecated Use `price_tiers` for product tier price information.
   */
  tier_prices?: Maybe<Array<Maybe<ProductTierPrices>>>;
  /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
  type?: Maybe<UrlRewriteEntityTypeEnum>;
  /**
   * One of simple, virtual, bundle, downloadable, grouped, or configurable.
   * @deprecated Use `__typename` instead.
   */
  type_id?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `ProductInterface` object. */
  uid: Scalars['ID']['output'];
  /**
   * Timestamp indicating when the product was updated.
   * @deprecated The field should not be used on the storefront.
   */
  updated_at?: Maybe<Scalars['String']['output']>;
  /** Upsell Products */
  upsell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The part of the URL that identifies the product */
  url_key?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use product's `canonical_url` or url rewrites instead */
  url_path?: Maybe<Scalars['String']['output']>;
  /** URL rewrites list */
  url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>;
  /** The part of the product URL that is appended after the url key */
  url_suffix?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  voguish_featured?: Maybe<Scalars['String']['output']>;
  /**
   * An array of websites in which the product is available.
   * @deprecated The field should not be used on the storefront.
   */
  websites?: Maybe<Array<Maybe<Website>>>;
};


/** Defines a product that the shopper downloads. */
export type DownloadableProductAttributeValuesArgs = {
  attributeCode?: InputMaybe<Array<InputMaybe<AttributeCodeInput>>>;
};


/** Defines a product that the shopper downloads. */
export type DownloadableProductCustom_AttributesV2Args = {
  filters?: InputMaybe<AttributeFilterInput>;
};


/** Defines a product that the shopper downloads. */
export type DownloadableProductReviewsArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

/** Defines a single downloadable product. */
export type DownloadableProductCartItemInput = {
  /** The ID and value of the option. */
  customizable_options?: InputMaybe<Array<InputMaybe<CustomizableOptionInput>>>;
  /** The quantity and SKU of the downloadable product. */
  data: CartItemInput;
  /** An array of objects containing the link_id of the downloadable product link. */
  downloadable_product_links?: InputMaybe<Array<InputMaybe<DownloadableProductLinksInput>>>;
};

/** Defines characteristics of a downloadable product. */
export type DownloadableProductLinks = {
  __typename?: 'DownloadableProductLinks';
  /** @deprecated This information should not be exposed on frontend. */
  id?: Maybe<Scalars['Int']['output']>;
  /** @deprecated This information should not be exposed on frontend. */
  is_shareable?: Maybe<Scalars['Boolean']['output']>;
  /** @deprecated `sample_url` serves to get the downloadable sample */
  link_type?: Maybe<DownloadableFileTypeEnum>;
  /** @deprecated This information should not be exposed on frontend. */
  number_of_downloads?: Maybe<Scalars['Int']['output']>;
  /** The price of the downloadable product. */
  price?: Maybe<Scalars['Float']['output']>;
  /** @deprecated `sample_url` serves to get the downloadable sample */
  sample_file?: Maybe<Scalars['String']['output']>;
  /** @deprecated `sample_url` serves to get the downloadable sample */
  sample_type?: Maybe<DownloadableFileTypeEnum>;
  /** The full URL to the downloadable sample. */
  sample_url?: Maybe<Scalars['String']['output']>;
  /** A number indicating the sort order. */
  sort_order?: Maybe<Scalars['Int']['output']>;
  /** The display name of the link. */
  title?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `DownloadableProductLinks` object. */
  uid: Scalars['ID']['output'];
};

/** Contains the link ID for the downloadable product. */
export type DownloadableProductLinksInput = {
  /** The unique ID of the downloadable product link. */
  link_id: Scalars['Int']['input'];
};

/** Defines characteristics of a downloadable product. */
export type DownloadableProductSamples = {
  __typename?: 'DownloadableProductSamples';
  /** @deprecated This information should not be exposed on frontend. */
  id?: Maybe<Scalars['Int']['output']>;
  /** @deprecated `sample_url` serves to get the downloadable sample */
  sample_file?: Maybe<Scalars['String']['output']>;
  /** @deprecated `sample_url` serves to get the downloadable sample */
  sample_type?: Maybe<DownloadableFileTypeEnum>;
  /** The full URL to the downloadable sample. */
  sample_url?: Maybe<Scalars['String']['output']>;
  /** A number indicating the sort order. */
  sort_order?: Maybe<Scalars['Int']['output']>;
  /** The display name of the sample. */
  title?: Maybe<Scalars['String']['output']>;
};

/** A downloadable product wish list item. */
export type DownloadableWishlistItem = WishlistItemInterface & {
  __typename?: 'DownloadableWishlistItem';
  /** The date and time the item was added to the wish list. */
  added_at: Scalars['String']['output'];
  /** Custom options selected for the wish list item. */
  customizable_options: Array<Maybe<SelectedCustomizableOption>>;
  /** The description of the item. */
  description?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `WishlistItemInterface` object. */
  id: Scalars['ID']['output'];
  /** An array containing information about the selected links. */
  links_v2?: Maybe<Array<Maybe<DownloadableProductLinks>>>;
  /** Product details of the wish list item. */
  product?: Maybe<ProductInterface>;
  /** The quantity of this wish list item. */
  quantity: Scalars['Float']['output'];
  /** An array containing information about the selected samples. */
  samples?: Maybe<Array<Maybe<DownloadableProductSamples>>>;
};

export type DraftProductItems = {
  __typename?: 'DraftProductItems';
  /** The creation date of the draft product. */
  created_at?: Maybe<Scalars['String']['output']>;
  /** The formatted price of the draft product (e.g., with currency symbol). */
  formatted_price?: Maybe<Scalars['String']['output']>;
  /** The unique identifier of the draft product. */
  id?: Maybe<Scalars['Int']['output']>;
  /** The name of the draft product. */
  name?: Maybe<Scalars['String']['output']>;
  /** The price of the draft product. */
  price?: Maybe<Scalars['String']['output']>;
  /** The quantity of the draft product available. */
  qty?: Maybe<Scalars['Int']['output']>;
  /** The ID of the attribute set associated with the draft product. */
  set_id?: Maybe<Scalars['Int']['output']>;
  /** The SKU (Stock Keeping Unit) of the draft product. */
  sku?: Maybe<Scalars['String']['output']>;
  /** The type of the draft product (e.g., 'simple', 'configurable'). */
  type_id?: Maybe<Scalars['String']['output']>;
};

export type EarningItemList = {
  __typename?: 'EarningItemList';
  /** The commission deducted by the admin from the seller's earnings. */
  admin_commision?: Maybe<Scalars['String']['output']>;
  /** The formatted version of the admin's commission. */
  admin_commision_formatted?: Maybe<Scalars['String']['output']>;
  /** The time interval for this earnings data (e.g., daily, weekly). */
  interval?: Maybe<Scalars['String']['output']>;
  /** The number of orders processed within this interval. */
  orders?: Maybe<Scalars['Int']['output']>;
  /** The total amount of sales in this interval. */
  total_amount?: Maybe<Scalars['String']['output']>;
  /** The formatted version of the total amount, suitable for display. */
  total_amount_formatted?: Maybe<Scalars['String']['output']>;
  /** The total discount amount applied in this interval. */
  total_discount_amount?: Maybe<Scalars['String']['output']>;
  /** The formatted version of the total discount amount. */
  total_discount_amount_formatted?: Maybe<Scalars['String']['output']>;
  /** The total earnings from sales, after deductions, in this interval. */
  total_earnings?: Maybe<Scalars['String']['output']>;
  /** The formatted version of the total earnings, suitable for display. */
  total_earnings_formatted?: Maybe<Scalars['String']['output']>;
};

/** Defines a customer-entered option. */
export type EnteredOptionInput = {
  /** The unique ID for a `CustomizableOptionInterface` object, such as a `CustomizableFieldOption`, `CustomizableFileOption`, or `CustomizableAreaOption` object. */
  uid: Scalars['ID']['input'];
  /** Text the customer entered. */
  value: Scalars['String']['input'];
};

/** Contains the `uid`, `relative_url`, and `type` attributes. */
export type EntityUrl = {
  __typename?: 'EntityUrl';
  /** @deprecated Use `relative_url` instead. */
  canonical_url?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `ProductInterface`, `CategoryInterface`, `CmsPage`, or similar object associated with the specified URL. This could be a product, category, or CMS page UID. */
  entity_uid?: Maybe<Scalars['ID']['output']>;
  /**
   * The ID assigned to the object associated with the specified url. This could be a product ID, category ID, or page ID.
   * @deprecated Use `entity_uid` instead.
   */
  id?: Maybe<Scalars['Int']['output']>;
  /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
  redirectCode?: Maybe<Scalars['Int']['output']>;
  /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
  relative_url?: Maybe<Scalars['String']['output']>;
  /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
  type?: Maybe<UrlRewriteEntityTypeEnum>;
};

/** An error encountered while adding an item to the the cart. */
export type Error = {
  /** A cart-specific error code. */
  code: CartUserInputErrorType;
  /** A localized error message. */
  message: Scalars['String']['output'];
};

export type ErrorInterface = {
  /** The returned error message. */
  message: Scalars['String']['output'];
};

/** Contains details about an address. */
export type EstimateAddressInput = {
  /** The two-letter code representing the customer's country. */
  country_code: CountryCodeEnum;
  /** The customer's ZIP or postal code. */
  postcode?: InputMaybe<Scalars['String']['input']>;
  /** An object containing the region name, region code, and region ID. */
  region?: InputMaybe<CustomerAddressRegionInput>;
};

export type EstimateTotalsInput = {
  /** Customer's address to estimate totals. */
  address: EstimateAddressInput;
  /** The unique ID of the cart to query. */
  cart_id: Scalars['String']['input'];
  /** Selected shipping method to estimate totals. */
  shipping_method?: InputMaybe<ShippingMethodInput>;
};

/** Estimate totals output. */
export type EstimateTotalsOutput = {
  __typename?: 'EstimateTotalsOutput';
  /** Cart after totals estimation */
  cart?: Maybe<Cart>;
};

/** Lists the exchange rate. */
export type ExchangeRate = {
  __typename?: 'ExchangeRate';
  /** Specifies the store’s default currency to exchange to. */
  currency_to?: Maybe<Scalars['String']['output']>;
  /** The exchange rate for the store’s default currency. */
  rate?: Maybe<Scalars['Float']['output']>;
};

export type ExploreProductType = {
  __typename?: 'ExploreProductType';
  /** Description */
  description?: Maybe<Scalars['String']['output']>;
  /** Top Hot Deals Products */
  hotDealsProductList?: Maybe<Array<Maybe<ProductItem>>>;
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
  /** Top Rated Products */
  topRatedProductList?: Maybe<Array<Maybe<ProductItem>>>;
  /** Top Selling Products */
  topSellingProductList?: Maybe<Array<Maybe<ProductItem>>>;
};

export type FastlaneConfig = PaymentConfigItem & {
  __typename?: 'FastlaneConfig';
  /** The payment method code as defined in the payment gateway */
  code?: Maybe<Scalars['String']['output']>;
  /** Indicates whether the payment method is displayed */
  is_visible?: Maybe<Scalars['Boolean']['output']>;
  /** Defines the payment intent (Authorize or Capture */
  payment_intent?: Maybe<Scalars['String']['output']>;
  /** The payment source for the payment method */
  payment_source?: Maybe<Scalars['String']['output']>;
  /** The PayPal parameters required to load the JS SDK */
  sdk_params?: Maybe<Array<Maybe<SdkParams>>>;
  /** The relative order the payment method is displayed on the checkout page */
  sort_order?: Maybe<Scalars['String']['output']>;
  /** 3DS mode */
  three_ds_mode?: Maybe<ThreeDsMode>;
  /** The name displayed for the payment method */
  title?: Maybe<Scalars['String']['output']>;
};

/** Fastlane Payment inputs */
export type FastlaneMethodInput = {
  /** The payment source for the payment method */
  payment_source?: InputMaybe<Scalars['String']['input']>;
  /** The single use token from Fastlane */
  paypal_fastlane_token?: InputMaybe<Scalars['String']['input']>;
};

/** Contains the results of a `products` query. */
export type FeaturedProductType = {
  __typename?: 'FeaturedProductType';
  /** Description */
  description?: Maybe<Scalars['String']['output']>;
  /** Id */
  id?: Maybe<Scalars['Int']['output']>;
  /** Voguish Featured Product List */
  productList?: Maybe<Array<Maybe<ProductItem>>>;
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
};

/** Feedback Params */
export type FeedbackParams = {
  /** Buyer Email */
  buyer_email: Scalars['String']['input'];
  /** Feed Nickname */
  feed_nickname?: InputMaybe<Scalars['String']['input']>;
  /** Feed Price */
  feed_price?: InputMaybe<Scalars['Int']['input']>;
  /** Feed Quality */
  feed_quality?: InputMaybe<Scalars['Int']['input']>;
  /** Feed Review */
  feed_review?: InputMaybe<Scalars['String']['input']>;
  /** Feed Summary */
  feed_summary?: InputMaybe<Scalars['String']['input']>;
  /** Feed Value */
  feed_value?: InputMaybe<Scalars['Int']['input']>;
};

/** Defines a filter that matches the input exactly. */
export type FilterEqualTypeInput = {
  /** Use this attribute to exactly match the specified string. For example, to filter on a specific category ID, specify a value such as `5`. */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Use this attribute to filter on an array of values. For example, to filter on category IDs 4, 5, and 6, specify a value of `["4", "5", "6"]`. */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export enum FilterMatchTypeEnum {
  Full = 'FULL',
  Partial = 'PARTIAL'
}

/** Defines a filter that performs a fuzzy search. */
export type FilterMatchTypeInput = {
  /** Use this attribute to fuzzy match the specified string. For example, to filter on a specific SKU, specify a value such as `24-MB01`. */
  match?: InputMaybe<Scalars['String']['input']>;
  /** Filter match type for fine-tuned results. Possible values FULL or PARTIAL. If match_type is not provided, returned results will default to FULL match. */
  match_type?: InputMaybe<FilterMatchTypeEnum>;
};

export type FilterOptions = {
  __typename?: 'FilterOptions';
  /** Matching value */
  label?: Maybe<Scalars['String']['output']>;
  /** Filter input */
  value?: Maybe<Scalars['String']['output']>;
};

/** Defines a filter that matches a range of values, such as prices or dates. */
export type FilterRangeTypeInput = {
  /** Use this attribute to specify the lowest possible value in the range. */
  from?: InputMaybe<Scalars['String']['input']>;
  /** Use this attribute to specify the highest possible value in the range. */
  to?: InputMaybe<Scalars['String']['input']>;
};

/** Defines a filter for an input string. */
export type FilterStringTypeInput = {
  /** Filters items that are exactly the same as the specified string. */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Filters items that are exactly the same as entries specified in an array of strings. */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Defines a filter that performs a fuzzy search using the specified string. */
  match?: InputMaybe<Scalars['String']['input']>;
};

/** Defines the comparison operators that can be used in a filter. */
export type FilterTypeInput = {
  /** Equals. */
  eq?: InputMaybe<Scalars['String']['input']>;
  finset?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** From. Must be used with the `to` field. */
  from?: InputMaybe<Scalars['String']['input']>;
  /** Greater than. */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Greater than or equal to. */
  gteq?: InputMaybe<Scalars['String']['input']>;
  /** In. The value can contain a set of comma-separated values. */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Like. The specified value can contain % (percent signs) to allow matching of 0 or more characters. */
  like?: InputMaybe<Scalars['String']['input']>;
  /** Less than. */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Less than or equal to. */
  lteq?: InputMaybe<Scalars['String']['input']>;
  /** More than or equal to. */
  moreq?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to. */
  neq?: InputMaybe<Scalars['String']['input']>;
  /** Not in. The value can contain a set of comma-separated values. */
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Not null. */
  notnull?: InputMaybe<Scalars['String']['input']>;
  /** Is null. */
  null?: InputMaybe<Scalars['String']['input']>;
  /** To. Must be used with the `from` field. */
  to?: InputMaybe<Scalars['String']['input']>;
};

/** A single FPT that can be applied to a product price. */
export type FixedProductTax = {
  __typename?: 'FixedProductTax';
  /** The amount of the Fixed Product Tax. */
  amount?: Maybe<Money>;
  /** The display label assigned to the Fixed Product Tax. */
  label?: Maybe<Scalars['String']['output']>;
};

/** Lists display settings for the Fixed Product Tax. */
export enum FixedProductTaxDisplaySettings {
  /** The displayed price does not include the FPT amount. The values of `ProductPrice.fixed_product_taxes` and the price including the FPT are displayed separately. This value corresponds to 'Excluding FPT, Including FPT description and final price.' */
  ExcludeFptAndIncludeWithDetails = 'EXCLUDE_FPT_AND_INCLUDE_WITH_DETAILS',
  /** The displayed price does not include the FPT amount. The values from `ProductPrice.fixed_product_taxes` are not displayed. This value corresponds to 'Excluding FPT'. */
  ExcludeFptWithoutDetails = 'EXCLUDE_FPT_WITHOUT_DETAILS',
  /** The FPT feature is not enabled. You can omit `ProductPrice.fixed_product_taxes` from your query. */
  FptDisabled = 'FPT_DISABLED',
  /** The displayed price includes the FPT amount without displaying the `ProductPrice.fixed_product_taxes` values. This value corresponds to 'Including FPT only'. */
  IncludeFptWithoutDetails = 'INCLUDE_FPT_WITHOUT_DETAILS',
  /** The displayed price includes the FPT amount while displaying the values of `ProductPrice.fixed_product_taxes` separately. This value corresponds to 'Including FPT and FPT description'. */
  IncludeFptWithDetails = 'INCLUDE_FPT_WITH_DETAILS'
}

/** Footer Links */
export type FooterLinks = {
  __typename?: 'FooterLinks';
  /** Footer Sort Order */
  sort_order?: Maybe<Scalars['Int']['output']>;
  /** Footer SubLinks */
  subLinks?: Maybe<Array<Maybe<SubLink>>>;
  /** Footer Title */
  title?: Maybe<Scalars['String']['output']>;
  /** Footer Uid */
  uid: Scalars['ID']['output'];
};

/** Identifies which customer requires remote shopping assistance. */
export type GenerateCustomerTokenAsAdminInput = {
  /** The email address of the customer requesting remote shopping assistance. */
  customer_email: Scalars['String']['input'];
};

/** Contains the generated customer token. */
export type GenerateCustomerTokenAsAdminOutput = {
  __typename?: 'GenerateCustomerTokenAsAdminOutput';
  /** The generated customer token. */
  customer_token: Scalars['String']['output'];
};

/** Latest review comments and ratings for a seller */
export type GetLatestCommentReview = {
  __typename?: 'GetLatestCommentReview';
  /** Review comment by a customer */
  comment?: Maybe<Scalars['String']['output']>;
  /** Date and time when the review was created */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Name of the reviewer */
  name?: Maybe<Scalars['String']['output']>;
  /** Rating for the product price */
  price?: Maybe<Scalars['Float']['output']>;
  /** Rating for the product quality */
  quality?: Maybe<Scalars['Float']['output']>;
  /** Rating for the product value */
  value?: Maybe<Scalars['Float']['output']>;
};

/** Gets the payment SDK URLs and values */
export type GetPaymentSdkOutput = {
  __typename?: 'GetPaymentSDKOutput';
  /** The payment SDK parameters */
  sdkParams?: Maybe<Array<Maybe<PaymentSdkParamsItem>>>;
};

/** Activity notifications for the seller */
export type GetSellerActivity = {
  __typename?: 'GetSellerActivity';
  /** Date of the activity */
  date?: Maybe<Scalars['String']['output']>;
  /** Message describing the seller activity */
  message?: Maybe<Scalars['String']['output']>;
};

/** Seller's rating details, including price, value, and quality */
export type GetSellerRating = {
  __typename?: 'GetSellerRating';
  /** Seller's rating for pricing */
  price_percent?: Maybe<Rating>;
  /** Seller's rating for product quality */
  quality_percent?: Maybe<Rating>;
  /** Seller's rating for value */
  value_percent?: Maybe<Rating>;
};

/** Contains the text of a gift message, its sender, and recipient */
export type GiftMessage = {
  __typename?: 'GiftMessage';
  /** Sender name */
  from: Scalars['String']['output'];
  /** Gift message text */
  message: Scalars['String']['output'];
  /** Recipient name */
  to: Scalars['String']['output'];
};

/** Contains the text of a gift message, its sender, and recipient */
export type GiftMessageInput = {
  /** Sender name */
  from: Scalars['String']['input'];
  /** Gift message text */
  message: Scalars['String']['input'];
  /** Recipient name */
  to: Scalars['String']['input'];
};

export type GooglePayButtonStyles = {
  __typename?: 'GooglePayButtonStyles';
  /** The button color */
  color?: Maybe<Scalars['String']['output']>;
  /** The button height in pixels */
  height?: Maybe<Scalars['Int']['output']>;
  /** The button type */
  type?: Maybe<Scalars['String']['output']>;
};

export type GooglePayConfig = PaymentConfigItem & {
  __typename?: 'GooglePayConfig';
  /** The styles for the GooglePay Button configuration */
  button_styles?: Maybe<GooglePayButtonStyles>;
  /** The payment method code as defined in the payment gateway */
  code?: Maybe<Scalars['String']['output']>;
  /** Indicates whether the payment method is displayed */
  is_visible?: Maybe<Scalars['Boolean']['output']>;
  /** Defines the payment intent (Authorize or Capture */
  payment_intent?: Maybe<Scalars['String']['output']>;
  /** The payment source for the payment method */
  payment_source?: Maybe<Scalars['String']['output']>;
  /** The PayPal parameters required to load the JS SDK */
  sdk_params?: Maybe<Array<Maybe<SdkParams>>>;
  /** The relative order the payment method is displayed on the checkout page */
  sort_order?: Maybe<Scalars['String']['output']>;
  /** 3DS mode */
  three_ds_mode?: Maybe<ThreeDsMode>;
  /** The name displayed for the payment method */
  title?: Maybe<Scalars['String']['output']>;
};

/** Google Pay inputs */
export type GooglePayMethodInput = {
  /** The payment source for the payment method */
  payment_source?: InputMaybe<Scalars['String']['input']>;
  /** The payment services order ID */
  payments_order_id?: InputMaybe<Scalars['String']['input']>;
  /** PayPal order ID */
  paypal_order_id?: InputMaybe<Scalars['String']['input']>;
};

/** Defines a grouped product, which consists of simple standalone products that are presented as a group. */
export type GroupedProduct = PhysicalProductInterface & ProductInterface & RoutableInterface & {
  __typename?: 'GroupedProduct';
  /** The productdata query returns the product attributes */
  attributeValues?: Maybe<Array<Maybe<ProductAttributes>>>;
  /**
   * The attribute set assigned to the product.
   * @deprecated The field should not be used on the storefront.
   */
  attribute_set_id?: Maybe<Scalars['Int']['output']>;
  /** Name of the product attribute set */
  attribute_set_name?: Maybe<Scalars['String']['output']>;
  /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled. */
  canonical_url?: Maybe<Scalars['String']['output']>;
  /** The categories assigned to a product. */
  categories?: Maybe<Array<Maybe<CategoryInterface>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  color?: Maybe<Scalars['Int']['output']>;
  /** The product's country of origin. */
  country_of_manufacture?: Maybe<Scalars['String']['output']>;
  /**
   * Timestamp indicating when the product was created.
   * @deprecated The field should not be used on the storefront.
   */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Crosssell Products */
  crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** Product custom attributes. */
  custom_attributesV2?: Maybe<ProductCustomAttributes>;
  /** Reason for denying the product listing */
  deny_reason?: Maybe<DenyReason>;
  /** Detailed information about the product. The value can include simple HTML tags. */
  description?: Maybe<ComplexTextValue>;
  /** Returns a value indicating gift message availability for the product. */
  gift_message_available: Scalars['Boolean']['output'];
  /**
   * The ID number assigned to the product.
   * @deprecated Use the `uid` field instead.
   */
  id?: Maybe<Scalars['Int']['output']>;
  /** The relative path to the main image on the product page. */
  image?: Maybe<ProductImage>;
  /** An array containing grouped product items. */
  items?: Maybe<Array<Maybe<GroupedProductItem>>>;
  /**
   * A number representing the product's manufacturer.
   * @deprecated Use the `custom_attributes` field instead.
   */
  manufacturer?: Maybe<Scalars['Int']['output']>;
  /** Maximum Qty Allowed in Shopping Cart */
  max_sale_qty?: Maybe<Scalars['Float']['output']>;
  /** An array of media gallery objects. */
  media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
  /**
   * An array of MediaGalleryEntry objects.
   * @deprecated Use `media_gallery` instead.
   */
  media_gallery_entries?: Maybe<Array<Maybe<MediaGalleryEntry>>>;
  /** A brief overview of the product for search results listings, maximum 255 characters. */
  meta_description?: Maybe<Scalars['String']['output']>;
  /** A comma-separated list of keywords that are visible only to search engines. */
  meta_keyword?: Maybe<Scalars['String']['output']>;
  /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
  meta_title?: Maybe<Scalars['String']['output']>;
  /** Minimum Qty Allowed in Shopping Cart */
  min_sale_qty?: Maybe<Scalars['Float']['output']>;
  /** The product name. Customers use this name to identify the product. */
  name?: Maybe<Scalars['String']['output']>;
  /** The beginning date for new product listings, and determines if the product is featured as a new product. */
  new_from_date?: Maybe<Scalars['String']['output']>;
  /** The end date for new product listings. */
  new_to_date?: Maybe<Scalars['String']['output']>;
  /** Product stock only x left count */
  only_x_left_in_stock?: Maybe<Scalars['Float']['output']>;
  /** If the product has multiple options, determines where they appear on the product page. */
  options_container?: Maybe<Scalars['String']['output']>;
  /**
   * Indicates the price of an item.
   * @deprecated Use `price_range` for product price information.
   */
  price?: Maybe<ProductPrices>;
  /** The range of prices for the product */
  price_range: PriceRange;
  /** An array of `TierPrice` objects. */
  price_tiers?: Maybe<Array<Maybe<TierPrice>>>;
  /** An array of `ProductLinks` objects. */
  product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>;
  /** Current status of the product */
  product_status?: Maybe<Scalars['String']['output']>;
  /** Quantity available for the product */
  qty?: Maybe<Scalars['Int']['output']>;
  /** Quantity of the product confirmed for sale */
  qty_confirmed?: Maybe<ProductQtyConfirmed>;
  /** Quantity of the product pending sale */
  qty_pending?: Maybe<ProductQtyPending>;
  /** Quantity of the product sold */
  qty_sold?: Maybe<ProductQtySold>;
  /** Amount of available stock */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** The average of all the ratings given to the product. */
  rating_summary: Scalars['Float']['output'];
  /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
  redirect_code: Scalars['Int']['output'];
  /** An array of products to be displayed in a Related Products block. */
  related_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
  relative_url?: Maybe<Scalars['String']['output']>;
  /** The total count of all the reviews given to the product. */
  review_count: Scalars['Int']['output'];
  /** The list of products reviews. */
  reviews: ProductReviews;
  /** @deprecated Use the `custom_attributes` field instead. */
  seller_id?: Maybe<Scalars['Int']['output']>;
  /** A short description of the product. Its use depends on the theme. */
  short_description?: Maybe<ComplexTextValue>;
  /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
  sku?: Maybe<Scalars['String']['output']>;
  /** The relative path to the small image, which is used on catalog pages. */
  small_image?: Maybe<ProductImage>;
  /**
   * The beginning date that a product has a special price.
   * @deprecated The field should not be used on the storefront.
   */
  special_from_date?: Maybe<Scalars['String']['output']>;
  /** The discounted price of the product. */
  special_price?: Maybe<Scalars['Float']['output']>;
  /** The end date for a product with a special price. */
  special_to_date?: Maybe<Scalars['String']['output']>;
  /** Stock status of the product */
  stock_status?: Maybe<ProductStockStatus>;
  /** The file name of a swatch image. */
  swatch_image?: Maybe<Scalars['String']['output']>;
  /** The relative path to the product's thumbnail image. */
  thumbnail?: Maybe<ProductImage>;
  /**
   * The price when tier pricing is in effect and the items purchased threshold has been reached.
   * @deprecated Use `price_tiers` for product tier price information.
   */
  tier_price?: Maybe<Scalars['Float']['output']>;
  /**
   * An array of ProductTierPrices objects.
   * @deprecated Use `price_tiers` for product tier price information.
   */
  tier_prices?: Maybe<Array<Maybe<ProductTierPrices>>>;
  /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
  type?: Maybe<UrlRewriteEntityTypeEnum>;
  /**
   * One of simple, virtual, bundle, downloadable, grouped, or configurable.
   * @deprecated Use `__typename` instead.
   */
  type_id?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `ProductInterface` object. */
  uid: Scalars['ID']['output'];
  /**
   * Timestamp indicating when the product was updated.
   * @deprecated The field should not be used on the storefront.
   */
  updated_at?: Maybe<Scalars['String']['output']>;
  /** Upsell Products */
  upsell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The part of the URL that identifies the product */
  url_key?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use product's `canonical_url` or url rewrites instead */
  url_path?: Maybe<Scalars['String']['output']>;
  /** URL rewrites list */
  url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>;
  /** The part of the product URL that is appended after the url key */
  url_suffix?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  voguish_featured?: Maybe<Scalars['String']['output']>;
  /**
   * An array of websites in which the product is available.
   * @deprecated The field should not be used on the storefront.
   */
  websites?: Maybe<Array<Maybe<Website>>>;
  /** The weight of the item, in units defined by the store. */
  weight?: Maybe<Scalars['Float']['output']>;
};


/** Defines a grouped product, which consists of simple standalone products that are presented as a group. */
export type GroupedProductAttributeValuesArgs = {
  attributeCode?: InputMaybe<Array<InputMaybe<AttributeCodeInput>>>;
};


/** Defines a grouped product, which consists of simple standalone products that are presented as a group. */
export type GroupedProductCustom_AttributesV2Args = {
  filters?: InputMaybe<AttributeFilterInput>;
};


/** Defines a grouped product, which consists of simple standalone products that are presented as a group. */
export type GroupedProductReviewsArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

/** Contains information about an individual grouped product item. */
export type GroupedProductItem = {
  __typename?: 'GroupedProductItem';
  /** The relative position of this item compared to the other group items. */
  position?: Maybe<Scalars['Int']['output']>;
  /** Details about this product option. */
  product?: Maybe<ProductInterface>;
  /** The quantity of this grouped product item. */
  qty?: Maybe<Scalars['Float']['output']>;
};

/** A grouped product wish list item. */
export type GroupedProductWishlistItem = WishlistItemInterface & {
  __typename?: 'GroupedProductWishlistItem';
  /** The date and time the item was added to the wish list. */
  added_at: Scalars['String']['output'];
  /** Custom options selected for the wish list item. */
  customizable_options: Array<Maybe<SelectedCustomizableOption>>;
  /** The description of the item. */
  description?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `WishlistItemInterface` object. */
  id: Scalars['ID']['output'];
  /** Product details of the wish list item. */
  product?: Maybe<ProductInterface>;
  /** The quantity of this wish list item. */
  quantity: Scalars['Float']['output'];
};

/** Input to retrieve a guest order based on token. */
export type GuestOrderCancelInput = {
  /** Cancellation reason. */
  reason: Scalars['String']['input'];
  /** Order token. */
  token: Scalars['String']['input'];
};

export type HomePageData = {
  __typename?: 'HomePageData';
  /** Benefits Data */
  benefits?: Maybe<Array<Maybe<BenefitsData>>>;
  /** Brand Collection Banner Data */
  brandCollectionBanner?: Maybe<BrandType>;
  /** Corner Offers */
  cornerOffers?: Maybe<CornerOffersType>;
  /** Explore Products Data */
  exploreProductCarousel?: Maybe<ExploreProductType>;
  /** Featured Products Data */
  featuredProductCarousel?: Maybe<FeaturedProductType>;
  /** Main Banner Data */
  mainBanner?: Maybe<Array<Maybe<Banner>>>;
  /** New Collection Banner Data */
  newCollectionBanner?: Maybe<Array<Maybe<Banner>>>;
  /** New Collection Banner Data */
  productCollectionBanner?: Maybe<Array<Maybe<Banner>>>;
  /** Promotion Banner Data */
  promotionBanner?: Maybe<Array<Maybe<Banner>>>;
  /** Recently Viewed Products */
  recentlyViewedProduct?: Maybe<RecentlyViewedProducts>;
  /** Shopping Collection Banner Data */
  shoppingCollectionBanner?: Maybe<ShopType>;
  /** Sort Order Data */
  sortOrder?: Maybe<Array<Maybe<SortOrderData>>>;
  /** Testimonial Data */
  testimonial?: Maybe<Testimonial>;
};

export type HostedFieldsConfig = PaymentConfigItem & {
  __typename?: 'HostedFieldsConfig';
  /** Vault payment method code */
  cc_vault_code?: Maybe<Scalars['String']['output']>;
  /** The payment method code as defined in the payment gateway */
  code?: Maybe<Scalars['String']['output']>;
  /** Card vault enabled */
  is_vault_enabled?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the payment method is displayed */
  is_visible?: Maybe<Scalars['Boolean']['output']>;
  /** Defines the payment intent (Authorize or Capture */
  payment_intent?: Maybe<Scalars['String']['output']>;
  /** The payment source for the payment method */
  payment_source?: Maybe<Scalars['String']['output']>;
  /** Card and bin details required */
  requires_card_details?: Maybe<Scalars['Boolean']['output']>;
  /** The PayPal parameters required to load the JS SDK */
  sdk_params?: Maybe<Array<Maybe<SdkParams>>>;
  /** The relative order the payment method is displayed on the checkout page */
  sort_order?: Maybe<Scalars['String']['output']>;
  /**
   * Whether 3DS is activated; true if 3DS mode is not OFF.
   * @deprecated Use 'three_ds_mode' instead.
   */
  three_ds?: Maybe<Scalars['Boolean']['output']>;
  /** 3DS mode */
  three_ds_mode?: Maybe<ThreeDsMode>;
  /** The name displayed for the payment method */
  title?: Maybe<Scalars['String']['output']>;
};

/** Hosted Fields payment inputs */
export type HostedFieldsInput = {
  /** Card bin number */
  cardBin?: InputMaybe<Scalars['String']['input']>;
  /** Expiration month of the card */
  cardExpiryMonth?: InputMaybe<Scalars['String']['input']>;
  /** Expiration year of the card */
  cardExpiryYear?: InputMaybe<Scalars['String']['input']>;
  /** Last four digits of the card */
  cardLast4?: InputMaybe<Scalars['String']['input']>;
  /** Name on the card */
  holderName?: InputMaybe<Scalars['String']['input']>;
  /** Indicates whether details about the shopper's credit/debit card should be tokenized for later usage. Required only if Vault is enabled for the Payment Services payment integration. */
  is_active_payment_token_enabler?: InputMaybe<Scalars['Boolean']['input']>;
  /** The payment source for the payment method */
  payment_source?: InputMaybe<Scalars['String']['input']>;
  /** The payment services order ID */
  payments_order_id?: InputMaybe<Scalars['String']['input']>;
  /** PayPal order ID */
  paypal_order_id?: InputMaybe<Scalars['String']['input']>;
};

/** Contains a set of relative URLs that PayPal uses in response to various actions during the authorization process. Magento prepends the base URL to this value to create a full URL. For example, if the full URL is https://www.example.com/path/to/page.html, the relative URL is path/to/page.html. Use this input for Payments Pro Hosted Solution payment method. */
export type HostedProInput = {
  /** The relative URL of the page that PayPal redirects to when the buyer cancels the transaction in order to choose a different payment method. For example, if the full URL to this page is https://www.example.com/paypal/action/cancel.html, the relative URL is paypal/action/cancel.html. */
  cancel_url: Scalars['String']['input'];
  /** The relative URL of the final confirmation page that PayPal redirects to upon payment success. For example, if the full URL to this page is https://www.example.com/paypal/action/return.html, the relative URL is paypal/action/return.html. */
  return_url: Scalars['String']['input'];
};

/** Contains the secure URL used for the Payments Pro Hosted Solution payment method. */
export type HostedProUrl = {
  __typename?: 'HostedProUrl';
  /** The secure URL generated by PayPal. */
  secure_form_url?: Maybe<Scalars['String']['output']>;
};

/** Contains the required input to request the secure URL for Payments Pro Hosted Solution payment. */
export type HostedProUrlInput = {
  /** The unique ID that identifies the shopper's cart. */
  cart_id: Scalars['String']['input'];
};

/** Contains target path parameters. */
export type HttpQueryParameter = {
  __typename?: 'HttpQueryParameter';
  /** A parameter name. */
  name?: Maybe<Scalars['String']['output']>;
  /** A parameter value. */
  value?: Maybe<Scalars['String']['output']>;
};

/** Icons List for displaying on the marketplace */
export type Icons = {
  __typename?: 'Icons';
  /** URL of the icon image */
  image?: Maybe<Scalars['String']['output']>;
  /** Label associated with the icon image */
  label?: Maybe<Scalars['String']['output']>;
};

export type ImageSwatchData = SwatchDataInterface & {
  __typename?: 'ImageSwatchData';
  /** The URL assigned to the thumbnail of the swatch image. */
  thumbnail?: Maybe<Scalars['String']['output']>;
  /** The value can be represented as color (HEX code), image link, or text. */
  value?: Maybe<Scalars['String']['output']>;
};

/** Image Upload */
export type ImageUpload = {
  /** Name of the uploaded image file */
  file_name?: InputMaybe<Scalars['String']['input']>;
};

/** List of templates/filters applied to customer attribute input. */
export enum InputFilterEnum {
  /** Forces attribute input to follow the date format. */
  Date = 'DATE',
  /** Escape HTML Entities. */
  Escapehtml = 'ESCAPEHTML',
  /** There are no templates or filters to be applied. */
  None = 'NONE',
  /** Strip HTML Tags. */
  Striptags = 'STRIPTAGS',
  /** Strip whitespace (or other characters) from the beginning and end of the input. */
  Trim = 'TRIM'
}

export type InsufficientStockError = Error & {
  __typename?: 'InsufficientStockError';
  /** A cart-specific error code. */
  code: CartUserInputErrorType;
  /** A localized error message. */
  message: Scalars['String']['output'];
  /** Amount of available stock */
  quantity?: Maybe<Scalars['Float']['output']>;
};

/** Contains an error message when an internal error occurred. */
export type InternalError = ErrorInterface & {
  __typename?: 'InternalError';
  /** The returned error message. */
  message: Scalars['String']['output'];
};

/** Contains invoice details. */
export type Invoice = {
  __typename?: 'Invoice';
  /** Comments on the invoice. */
  comments?: Maybe<Array<Maybe<SalesCommentItem>>>;
  /** The unique ID for a `Invoice` object. */
  id: Scalars['ID']['output'];
  /** Invoiced product details. */
  items?: Maybe<Array<Maybe<InvoiceItemInterface>>>;
  /** Sequential invoice number. */
  number: Scalars['String']['output'];
  /** Invoice total amount details. */
  total?: Maybe<InvoiceTotal>;
};

export type InvoiceItem = InvoiceItemInterface & {
  __typename?: 'InvoiceItem';
  /** Information about the final discount amount for the base product, including discounts on options. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** The unique ID for an `InvoiceItemInterface` object. */
  id: Scalars['ID']['output'];
  /** Details about an individual order item. */
  order_item?: Maybe<OrderItemInterface>;
  /** The name of the base product. */
  product_name?: Maybe<Scalars['String']['output']>;
  /** The sale price for the base product including selected options. */
  product_sale_price: Money;
  /** The SKU of the base product. */
  product_sku: Scalars['String']['output'];
  /** The number of invoiced items. */
  quantity_invoiced?: Maybe<Scalars['Float']['output']>;
};

/** Contains detailes about invoiced items. */
export type InvoiceItemInterface = {
  /** Information about the final discount amount for the base product, including discounts on options. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** The unique ID for an `InvoiceItemInterface` object. */
  id: Scalars['ID']['output'];
  /** Details about an individual order item. */
  order_item?: Maybe<OrderItemInterface>;
  /** The name of the base product. */
  product_name?: Maybe<Scalars['String']['output']>;
  /** The sale price for the base product including selected options. */
  product_sale_price: Money;
  /** The SKU of the base product. */
  product_sku: Scalars['String']['output'];
  /** The number of invoiced items. */
  quantity_invoiced?: Maybe<Scalars['Float']['output']>;
};

export type InvoiceItems = {
  /** Unique identifier for the invoice item */
  item_id?: InputMaybe<Scalars['Int']['input']>;
  /** Quantity of the item being invoiced or shipped */
  qty?: InputMaybe<Scalars['Int']['input']>;
};

export type InvoiceListingItem = {
  __typename?: 'InvoiceListingItem';
  /** The total amount of the invoice. */
  amount?: Maybe<Scalars['String']['output']>;
  /** The formatted version of the invoice amount. */
  amount_formatted?: Maybe<Scalars['String']['output']>;
  /** The name of the customer to whom the invoice is issued. */
  bill_to_name?: Maybe<Scalars['String']['output']>;
  /** The creation date and time of the invoice. */
  created_at?: Maybe<Scalars['String']['output']>;
  /** The associated entity ID for the invoice. */
  entity_id?: Maybe<Scalars['Int']['output']>;
  /** The unique identifier for the invoice. */
  invoice_id?: Maybe<Scalars['String']['output']>;
  /** The status of the invoice (e.g., 'paid', 'unpaid'). */
  status?: Maybe<Scalars['String']['output']>;
};

export type InvoiceParams = {
  /** Flag to notify the customer about a comment on the invoice */
  comment_customer_notify: Scalars['Boolean']['input'];
  /** The comment text to be added to the invoice */
  comment_text: Scalars['String']['input'];
  /** Flag to control the visibility of the invoice on the front-end */
  is_visible_on_front: Scalars['Boolean']['input'];
  /** List of items to be included in the invoice */
  items?: InputMaybe<Array<InputMaybe<InvoiceItems>>>;
  /** Flag to send an email to the customer about the invoice */
  send_email: Scalars['Boolean']['input'];
};

/** Contains price details from an invoice. */
export type InvoiceTotal = {
  __typename?: 'InvoiceTotal';
  /** The final base grand total amount in the base currency. */
  base_grand_total: Money;
  /** The applied discounts to the invoice. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** The final total amount, including shipping, discounts, and taxes. */
  grand_total: Money;
  /** Details about the shipping and handling costs for the invoice. */
  shipping_handling?: Maybe<ShippingHandling>;
  /** The subtotal of the invoice, excluding shipping, discounts, and taxes. */
  subtotal: Money;
  /** The invoice tax details. */
  taxes?: Maybe<Array<Maybe<TaxItem>>>;
  /** The shipping amount for the invoice. */
  total_shipping: Money;
  /** The amount of tax applied to the invoice. */
  total_tax: Money;
};

/** Contains the result of the `isEmailAvailable` query. */
export type IsEmailAvailableOutput = {
  __typename?: 'IsEmailAvailableOutput';
  /** Indicates whether the specified email address can be used to create a customer. */
  is_email_available?: Maybe<Scalars['Boolean']['output']>;
};

/** Items Data */
export type ItemData = {
  __typename?: 'ItemData';
  /** Admin Commission */
  adminComission?: Maybe<Scalars['String']['output']>;
  /** Admin Commission Formatted */
  adminComissionFormatted?: Maybe<Scalars['String']['output']>;
  /** Price */
  price?: Maybe<Scalars['String']['output']>;
  /** Price Formatted */
  priceFormatted?: Maybe<Scalars['String']['output']>;
  /** Product Name */
  productName?: Maybe<Scalars['String']['output']>;
  /** Quantity Data */
  qty?: Maybe<QuantityData>;
  /** Subtotal */
  subTotal?: Maybe<Scalars['String']['output']>;
  /** Subtotal Formatted */
  subTotalFormatted?: Maybe<Scalars['String']['output']>;
  /** Vendor Total */
  vendorTotal?: Maybe<Scalars['String']['output']>;
  /** Vendor Total Formatted */
  vendorTotalFormatted?: Maybe<Scalars['String']['output']>;
};

/** A list of options of the selected bundle product. */
export type ItemSelectedBundleOption = {
  __typename?: 'ItemSelectedBundleOption';
  /**
   * The unique ID for a `ItemSelectedBundleOption` object.
   * @deprecated Use `uid` instead.
   */
  id: Scalars['ID']['output'];
  /** The label of the option. */
  label: Scalars['String']['output'];
  /** The unique ID for a `ItemSelectedBundleOption` object. */
  uid: Scalars['ID']['output'];
  /** A list of products that represent the values of the parent option. */
  values?: Maybe<Array<Maybe<ItemSelectedBundleOptionValue>>>;
};

/** A list of values for the selected bundle product. */
export type ItemSelectedBundleOptionValue = {
  __typename?: 'ItemSelectedBundleOptionValue';
  /**
   * The unique ID for a `ItemSelectedBundleOptionValue` object.
   * @deprecated Use `uid` instead.
   */
  id: Scalars['ID']['output'];
  /** The price of the child bundle product. */
  price: Money;
  /** The name of the child bundle product. */
  product_name: Scalars['String']['output'];
  /** The SKU of the child bundle product. */
  product_sku: Scalars['String']['output'];
  /** The number of this bundle product that were ordered. */
  quantity: Scalars['Float']['output'];
  /** The unique ID for a `ItemSelectedBundleOptionValue` object. */
  uid: Scalars['ID']['output'];
};

/** Seller information, including their product and activity details */
export type Items = {
  __typename?: 'Items';
  /** Notifications sent to the admin regarding this seller */
  admin_notification?: Maybe<Scalars['String']['output']>;
  /** List of categories allowed for the seller's products */
  allowed_categories?: Maybe<Scalars['String']['output']>;
  /** Width of the background image for the seller's page */
  background_width?: Maybe<Scalars['String']['output']>;
  /** URL for the seller's banner picture */
  banner_pic?: Maybe<Scalars['String']['output']>;
  /** Description of the seller's company */
  company_description?: Maybe<Scalars['String']['output']>;
  /** Locality or location of the seller's company */
  company_locality?: Maybe<Scalars['String']['output']>;
  /** Contact number of the seller */
  contact_number?: Maybe<Scalars['String']['output']>;
  /** Country of the seller's company represented by an image */
  country_pic?: Maybe<Scalars['String']['output']>;
  /** Date and time when the seller profile was created */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Email address of the seller */
  email?: Maybe<Scalars['String']['output']>;
  /** Unique identifier for the seller entity */
  entity_id?: Maybe<Scalars['String']['output']>;
  /** Facebook ID of the seller */
  facebook_id?: Maybe<Scalars['String']['output']>;
  /** Indicates if Facebook is active for the seller (true/false) */
  fb_active?: Maybe<Scalars['String']['output']>;
  /** Indicates if Google+ is active for the seller (true/false) */
  gplus_active?: Maybe<Scalars['String']['output']>;
  /** Google+ ID of the seller */
  gplus_id?: Maybe<Scalars['String']['output']>;
  /** Indicates if Instagram is active for the seller (true/false) */
  instagram_active?: Maybe<Scalars['String']['output']>;
  /** Instagram handle of the seller */
  instagram_id?: Maybe<Scalars['String']['output']>;
  /** Indicator whether the user is a seller (true/false) */
  is_seller?: Maybe<Scalars['String']['output']>;
  /** URL for the seller's logo picture */
  logo_pic?: Maybe<Scalars['String']['output']>;
  /** Meta description for SEO purposes */
  meta_description?: Maybe<Scalars['String']['output']>;
  /** Meta keywords for SEO purposes */
  meta_keyword?: Maybe<Scalars['String']['output']>;
  /** Indicates if Moleskine is active for the seller (true/false) */
  moleskine_active?: Maybe<Scalars['String']['output']>;
  /** Moleskine ID of the seller */
  moleskine_id?: Maybe<Scalars['String']['output']>;
  /** Total number of orders associated with the seller */
  order_count?: Maybe<Scalars['String']['output']>;
  /** Other information related to the seller */
  others_info?: Maybe<Scalars['String']['output']>;
  /** Payment method used by the seller */
  payment_source?: Maybe<Scalars['String']['output']>;
  /** Indicates if Pinterest is active for the seller (true/false) */
  pinterest_active?: Maybe<Scalars['String']['output']>;
  /** Pinterest ID of the seller */
  pinterest_id?: Maybe<Scalars['String']['output']>;
  /** Privacy policy of the seller */
  privacy_policy?: Maybe<Scalars['String']['output']>;
  /** Total number of products listed by the seller */
  product_count?: Maybe<Scalars['String']['output']>;
  /** Return policy of the seller */
  return_policy?: Maybe<Scalars['String']['output']>;
  /** Unique identifier for the seller */
  seller_id?: Maybe<Scalars['String']['output']>;
  /** Seller rating based on customer feedback */
  seller_rating?: Maybe<Scalars['String']['output']>;
  /** Shipping policy of the seller */
  shipping_policy?: Maybe<Scalars['String']['output']>;
  /** Title of the seller's shop */
  shop_title?: Maybe<Scalars['String']['output']>;
  /** URL for the seller's shop page */
  shop_url?: Maybe<Scalars['String']['output']>;
  /** Unique identifier for the store */
  store_id?: Maybe<Scalars['String']['output']>;
  /** Indicates if Twitter is active for the seller (true/false) */
  tw_active?: Maybe<Scalars['String']['output']>;
  /** Twitter handle of the seller */
  twitter_id?: Maybe<Scalars['String']['output']>;
  /** Date and time when the seller profile was last updated */
  updated_at?: Maybe<Scalars['String']['output']>;
  /** Indicates if Vimeo is active for the seller (true/false) */
  vimeo_active?: Maybe<Scalars['String']['output']>;
  /** Vimeo channel ID of the seller */
  vimeo_id?: Maybe<Scalars['String']['output']>;
  /** Indicates if YouTube is active for the seller (true/false) */
  youtube_active?: Maybe<Scalars['String']['output']>;
  /** YouTube channel ID of the seller */
  youtube_id?: Maybe<Scalars['String']['output']>;
};

/** Contains a key-value pair. */
export type KeyValue = {
  __typename?: 'KeyValue';
  /** The name part of the key/value pair. */
  name?: Maybe<Scalars['String']['output']>;
  /** The value part of the key/value pair. */
  value?: Maybe<Scalars['String']['output']>;
};

/** Label for Landing Page sections */
export type Label = {
  __typename?: 'Label';
  /** Label text for the landing page section */
  label?: Maybe<Scalars['String']['output']>;
};

/** Contains information for rendering layered navigation. */
export type LayerFilter = {
  __typename?: 'LayerFilter';
  /**
   * An array of filter items.
   * @deprecated Use `Aggregation.options` instead.
   */
  filter_items?: Maybe<Array<Maybe<LayerFilterItemInterface>>>;
  /**
   * The count of filter items in filter group.
   * @deprecated Use `Aggregation.count` instead.
   */
  filter_items_count?: Maybe<Scalars['Int']['output']>;
  /**
   * The name of a layered navigation filter.
   * @deprecated Use `Aggregation.label` instead.
   */
  name?: Maybe<Scalars['String']['output']>;
  /**
   * The request variable name for a filter query.
   * @deprecated Use `Aggregation.attribute_code` instead.
   */
  request_var?: Maybe<Scalars['String']['output']>;
};

export type LayerFilterItem = LayerFilterItemInterface & {
  __typename?: 'LayerFilterItem';
  /**
   * The count of items per filter.
   * @deprecated Use `AggregationOption.count` instead.
   */
  items_count?: Maybe<Scalars['Int']['output']>;
  /**
   * The label for a filter.
   * @deprecated Use `AggregationOption.label` instead.
   */
  label?: Maybe<Scalars['String']['output']>;
  /**
   * The value of a filter request variable to be used in query.
   * @deprecated Use `AggregationOption.value` instead.
   */
  value_string?: Maybe<Scalars['String']['output']>;
};

export type LayerFilterItemInterface = {
  /**
   * The count of items per filter.
   * @deprecated Use `AggregationOption.count` instead.
   */
  items_count?: Maybe<Scalars['Int']['output']>;
  /**
   * The label for a filter.
   * @deprecated Use `AggregationOption.label` instead.
   */
  label?: Maybe<Scalars['String']['output']>;
  /**
   * The value of a filter request variable to be used in query.
   * @deprecated Use `AggregationOption.value` instead.
   */
  value_string?: Maybe<Scalars['String']['output']>;
};

/** Layout One data for the Marketplace landing page */
export type LayoutOne = {
  __typename?: 'LayoutOne';
  /** Content for the banner */
  bannerContent?: Maybe<Scalars['String']['output']>;
  /** Option to display banner or not */
  bannerDisplay?: Maybe<Scalars['String']['output']>;
  /** Banner image URL */
  bannerImage?: Maybe<Scalars['String']['output']>;
  /** Array of icons for visual representation on the layout */
  icons?: Maybe<Array<Maybe<Icons>>>;
  /** Option to display icons on the layout */
  iconsDisplay?: Maybe<Scalars['String']['output']>;
  /** Marketplace Label 1 displayed on the layout */
  marketplacelabel1?: Maybe<Scalars['String']['output']>;
  /** Marketplace Label 2 displayed on the layout */
  marketplacelabel2?: Maybe<Scalars['String']['output']>;
  /** Marketplace Label 3 displayed on the layout */
  marketplacelabel3?: Maybe<Scalars['String']['output']>;
  /** Marketplace Label 4 displayed on the layout */
  marketplacelabel4?: Maybe<Scalars['String']['output']>;
};

/** Layout Three data for the Marketplace landing page */
export type LayoutThree = {
  __typename?: 'LayoutThree';
  /** Content for the banner */
  bannerContent?: Maybe<Scalars['String']['output']>;
  /** Option to display banner or not */
  bannerDisplay?: Maybe<Scalars['String']['output']>;
  /** Banner image URL */
  bannerImage?: Maybe<Scalars['String']['output']>;
  /** Array of icons for visual representation on the layout */
  icons?: Maybe<Array<Maybe<Icons>>>;
  /** Option to display icons on the layout */
  iconsDisplay?: Maybe<Scalars['String']['output']>;
  /** Button for marketplace action */
  marketplacebutton?: Maybe<Scalars['String']['output']>;
  /** Marketplace Label 1 displayed on the layout */
  marketplacelabel1?: Maybe<Scalars['String']['output']>;
  /** Marketplace Label 2 displayed on the layout */
  marketplacelabel2?: Maybe<Scalars['String']['output']>;
  /** Marketplace Label 3 displayed on the layout */
  marketplacelabel3?: Maybe<Scalars['String']['output']>;
};

/** Layout Two data for the Marketplace landing page */
export type LayoutTwo = {
  __typename?: 'LayoutTwo';
  /** Content for the banner */
  bannerContent?: Maybe<Scalars['String']['output']>;
  /** Option to display banner or not */
  bannerDisplay?: Maybe<Scalars['String']['output']>;
  /** Banner image URL */
  bannerImage?: Maybe<Scalars['String']['output']>;
  /** Button for marketplace action */
  marketplacebutton?: Maybe<Scalars['String']['output']>;
};

export type LinkInput = {
  /** List of cross-sell products associated with the product */
  crosssell?: InputMaybe<Array<InputMaybe<RelatedCrossUpsellInput>>>;
  /** List of related products associated with the product */
  related?: InputMaybe<Array<InputMaybe<RelatedCrossUpsellInput>>>;
  /** List of upsell products associated with the product */
  upsell?: InputMaybe<Array<InputMaybe<RelatedCrossUpsellInput>>>;
};

/** Make SellerReview */
export type MakeSellerReview = {
  __typename?: 'MakeSellerReview';
  /** Message */
  message?: Maybe<Scalars['String']['output']>;
  /** Review Id */
  review_id?: Maybe<Scalars['Int']['output']>;
  /** Status */
  status?: Maybe<Scalars['Int']['output']>;
};

export type MarkNewsRead = {
  __typename?: 'MarkNewsRead';
  /** Message indicating success or failure of the news read operation */
  message?: Maybe<Scalars['String']['output']>;
  /** Indicates whether the news item was successfully marked as read (true: success, false: failure) */
  status?: Maybe<Scalars['Boolean']['output']>;
};

/** Marketplace landing page data */
export type MarketplaceLandingPage = {
  __typename?: 'MarketplaceLandingPage';
  /** About Banner Image displayed on the landing page */
  aboutImage?: Maybe<Scalars['String']['output']>;
  /** Marketplace Banners for promotions */
  banner?: Maybe<Array<Maybe<Banners>>>;
  /** Marketplace Landing Page head title */
  headTitle?: Maybe<Scalars['String']['output']>;
  /** Layout 1 data for marketplace presentation */
  layoutOne?: Maybe<LayoutOne>;
  /** Layout 3 data for marketplace presentation */
  layoutThree?: Maybe<LayoutThree>;
  /** Layout 2 data for marketplace presentation */
  layoutTwo?: Maybe<LayoutTwo>;
  /** Seller Page Layout, defines layout structure */
  pageLayout?: Maybe<Scalars['Int']['output']>;
  /** Top 3 Marketplace Sellers featured on the landing page */
  sellers?: Maybe<Array<Maybe<Sellers>>>;
};

/** Defines characteristics about images and videos associated with a specific product. */
export type MediaGalleryEntry = {
  __typename?: 'MediaGalleryEntry';
  /** Details about the content of the media gallery item. */
  content?: Maybe<ProductMediaGalleryEntriesContent>;
  /** Indicates whether the image is hidden from view. */
  disabled?: Maybe<Scalars['Boolean']['output']>;
  /** The path of the image on the server. */
  file?: Maybe<Scalars['String']['output']>;
  /**
   * The identifier assigned to the object.
   * @deprecated Use `uid` instead.
   */
  id?: Maybe<Scalars['Int']['output']>;
  /** The alt text displayed on the storefront when the user points to the image. */
  label?: Maybe<Scalars['String']['output']>;
  /** Either `image` or `video`. */
  media_type?: Maybe<Scalars['String']['output']>;
  /** The media item's position after it has been sorted. */
  position?: Maybe<Scalars['Int']['output']>;
  /** Array of image types. It can have the following values: image, small_image, thumbnail. */
  types?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** The unique ID for a `MediaGalleryEntry` object. */
  uid: Scalars['ID']['output'];
  /** Details about the content of a video item. */
  video_content?: Maybe<ProductMediaGalleryEntriesVideoContent>;
};

/** Media gallery input data for products */
export type MediaGalleryInput = {
  /** Attribute set ID for the product */
  attribute_set_id?: InputMaybe<Scalars['Int']['input']>;
  /** List of product images */
  images?: InputMaybe<Array<InputMaybe<ProductImageInput>>>;
  /** Title for product links */
  links_title?: InputMaybe<Scalars['String']['input']>;
  /** Title for product samples */
  samples_title?: InputMaybe<Scalars['String']['input']>;
  /** Height dimension of the product */
  ts_dimensions_height?: InputMaybe<Scalars['String']['input']>;
  /** Length dimension of the product */
  ts_dimensions_length?: InputMaybe<Scalars['String']['input']>;
  /** Width dimension of the product */
  ts_dimensions_width?: InputMaybe<Scalars['String']['input']>;
};

/** Provides basic information about a product's media, including images and videos. */
export type MediaGalleryInterface = {
  /** Indicates whether the image is hidden from view. */
  disabled?: Maybe<Scalars['Boolean']['output']>;
  /** The file path of the media item. */
  file?: Maybe<Scalars['String']['output']>;
  /** The unique identifier of the media item. */
  id?: Maybe<Scalars['String']['output']>;
  /** The label of the product image or video. */
  label?: Maybe<Scalars['String']['output']>;
  /** The media item's position after it has been sorted. */
  position?: Maybe<Scalars['Int']['output']>;
  /** The URL of the product image or video. */
  url?: Maybe<Scalars['String']['output']>;
};

export type MenuItem = {
  __typename?: 'MenuItem';
  /** Category Id */
  category_id?: Maybe<Scalars['Int']['output']>;
  /** Category display mode */
  display_mode?: Maybe<Scalars['String']['output']>;
  /** Category Image URL */
  image_url?: Maybe<Scalars['String']['output']>;
  /** Category item Id */
  item_id?: Maybe<Scalars['Int']['output']>;
  /** Category parent Id */
  parent_id?: Maybe<Scalars['Int']['output']>;
  /** Category Path */
  path?: Maybe<Scalars['String']['output']>;
  /** Category position */
  position?: Maybe<Scalars['Int']['output']>;
  /** Category title */
  title?: Maybe<Scalars['String']['output']>;
  /** Category URL Key */
  url_key?: Maybe<Scalars['String']['output']>;
};

export type MessageStyleLogo = {
  __typename?: 'MessageStyleLogo';
  /** The type of logo for the PayPal Pay Later messaging */
  type?: Maybe<Scalars['String']['output']>;
};

export type MessageStyles = {
  __typename?: 'MessageStyles';
  /** The message layout */
  layout?: Maybe<Scalars['String']['output']>;
  /** The message logo */
  logo?: Maybe<MessageStyleLogo>;
};

/** Defines a monetary value, including a numeric value and a currency code. */
export type Money = {
  __typename?: 'Money';
  /** A three-letter currency code, such as USD or EUR. */
  currency?: Maybe<CurrencyEnum>;
  /** A number expressing a monetary value. */
  value?: Maybe<Scalars['Float']['output']>;
};

/** Product attribute value data params */
export type MpAttributeValueInput = {
  /** Indicates whether the attribute value is included (1 = included, 0 = excluded) */
  include?: InputMaybe<Scalars['Int']['input']>;
  /** Value index for the configurable product attribute */
  value_index?: InputMaybe<Scalars['Int']['input']>;
};

/** Marketplace store configurations related to reporting */
export type MpConfig = {
  __typename?: 'MpConfig';
  /** Enable/disable product reporting */
  reportProduct?: Maybe<Scalars['String']['output']>;
  /** Allow guests to report products */
  reportProductGuestStatus?: Maybe<Scalars['String']['output']>;
  /** Label for the report product button */
  reportProductLabel?: Maybe<Scalars['String']['output']>;
  /** Possible reasons for reporting a product */
  reportProductReasons?: Maybe<Array<Maybe<ReportFlags>>>;
  /** Enable/disable seller reporting */
  reportSeller?: Maybe<Scalars['String']['output']>;
  /** Allow guests to report sellers */
  reportSellerGuestStatus?: Maybe<Scalars['String']['output']>;
  /** Label for the report seller button */
  reportSellerLabel?: Maybe<Scalars['String']['output']>;
  /** Possible reasons for reporting a seller */
  reportSellerReasons?: Maybe<Array<Maybe<ReportFlags>>>;
};

/** Provides information about the shipping costs for an order. */
export type MpOrderShippingInfo = {
  __typename?: 'MpOrderShippingInfo';
  /** The total shipping amount for the order. */
  shipping_amount?: Maybe<Scalars['String']['output']>;
  /** The formatted representation of the shipping amount. */
  shipping_amount_formatted?: Maybe<Scalars['String']['output']>;
  /** The title of the shipping. */
  title?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Add one or more bundle products to the specified cart. We recommend using `addProductsToCart` instead. */
  addBundleProductsToCart?: Maybe<AddBundleProductsToCartOutput>;
  /** Creates a new configurable product attribute (e.g., color, size). Requires authentication. */
  addConfigAttribute?: Maybe<AddConfigAttribute>;
  /** Add one or more configurable products to the specified cart. We recommend using `addProductsToCart` instead. */
  addConfigurableProductsToCart?: Maybe<AddConfigurableProductsToCartOutput>;
  /** Add one or more downloadable products to the specified cart. We recommend using `addProductsToCart` instead. */
  addDownloadableProductsToCart?: Maybe<AddDownloadableProductsToCartOutput>;
  /** Add any type of product to the cart. */
  addProductsToCart?: Maybe<AddProductsToCartOutput>;
  /** Add products to the specified compare list. */
  addProductsToCompareList?: Maybe<CompareList>;
  /** Creates a new cart and add any type of product to it */
  addProductsToNewCart?: Maybe<AddProductsToNewCartOutput>;
  /** Add one or more products to the specified wish list. This mutation supports all product types. */
  addProductsToWishlist?: Maybe<AddProductsToWishlistOutput>;
  /** Add one or more simple products to the specified cart. We recommend using `addProductsToCart` instead. */
  addSimpleProductsToCart?: Maybe<AddSimpleProductsToCartOutput>;
  /** Add one or more virtual products to the specified cart. We recommend using `addProductsToCart` instead. */
  addVirtualProductsToCart?: Maybe<AddVirtualProductsToCartOutput>;
  /** Add items in the specified wishlist to the customer's cart. */
  addWishlistItemsToCart?: Maybe<AddWishlistItemsToCartOutput>;
  /** Apply a pre-defined coupon code to the specified cart. */
  applyCouponToCart?: Maybe<ApplyCouponToCartOutput>;
  /** Assign the specified compare list to the logged in customer. */
  assignCompareListToCustomer?: Maybe<AssignCompareListToCustomerOutput>;
  /** Assign a logged-in customer to the specified guest shopping cart. */
  assignCustomerToGuestCart: Cart;
  /** Cancel the specified customer order. */
  cancelOrder?: Maybe<CancelOrderOutput>;
  /** Change the password for the logged-in customer. */
  changeCustomerPassword?: Maybe<Customer>;
  /** Synchronizes order details and place the order */
  completeOrder?: Maybe<PlaceOrderOutput>;
  /** Cancel the specified guest customer order. */
  confirmCancelOrder?: Maybe<CancelOrderOutput>;
  /** Confirms the email address for a customer. */
  confirmEmail?: Maybe<CustomerOutput>;
  /** Sends an email query to the seller based on seller ID (requires authentication). */
  contactSellerBySellerId?: Maybe<ContactSellerBySellerId>;
  /** Send a 'Contact Us' email to the merchant. */
  contactUs?: Maybe<ContactUsOutput>;
  /** Creates Client Token for Braintree Javascript SDK initialization. */
  createBraintreeClientToken: Scalars['String']['output'];
  /** Creates Client Token for Braintree PayPal Javascript SDK initialization. */
  createBraintreePayPalClientToken: Scalars['String']['output'];
  /** Creates Client Token for Braintree PayPal Vault Javascript SDK initialization. */
  createBraintreePayPalVaultClientToken: Scalars['String']['output'];
  /** Create a new compare list. The compare list is saved for logged in customers. */
  createCompareList?: Maybe<CompareList>;
  /** @deprecated Use `createCustomerV2` instead. */
  createCustomer?: Maybe<CustomerOutput>;
  /** Create a billing or shipping address for a customer or guest. */
  createCustomerAddress?: Maybe<CustomerAddress>;
  /** Create a customer account. */
  createCustomerV2?: Maybe<CustomerOutput>;
  /**
   * Create an empty shopping cart for a guest or logged in user
   * @deprecated Use `Mutation.createGuestCart` or `Query.customerCart` for logged in customer
   */
  createEmptyCart?: Maybe<Scalars['String']['output']>;
  /** Create a new shopping cart */
  createGuestCart?: Maybe<CreateGuestCartOutput>;
  /** Initiate a transaction and receive a token. Use this mutation for Payflow Pro and Payments Pro payment methods */
  createPayflowProToken?: Maybe<CreatePayflowProTokenOutput>;
  /** Creates a payment order for further payment processing */
  createPaymentOrder?: Maybe<CreatePaymentOrderOutput>;
  /** Initiate an Express Checkout transaction and receive a token. Use this mutation for Express Checkout and Payments Standard payment methods. */
  createPaypalExpressToken?: Maybe<PaypalExpressTokenOutput>;
  /** Create a product review for the specified product. */
  createProductReview: CreateProductReviewOutput;
  /** Creates a new seller account. */
  createSellerAccount?: Maybe<CustomerOutput>;
  /** Creates a vault payment token */
  createVaultCardPaymentToken?: Maybe<CreateVaultCardPaymentTokenOutput>;
  /** Creates a vault card setup token */
  createVaultCardSetupToken?: Maybe<CreateVaultCardSetupTokenOutput>;
  /** Delete the specified compare list. */
  deleteCompareList?: Maybe<DeleteCompareListOutput>;
  /** Delete customer account */
  deleteCustomer?: Maybe<Scalars['Boolean']['output']>;
  /** Delete the billing or shipping address of a customer. */
  deleteCustomerAddress?: Maybe<Scalars['Boolean']['output']>;
  /** Deletes a draft product that has not been published. Requires authentication. */
  deleteDraftProduct?: Maybe<DeleteDraftProduct>;
  /** Delete a customer's payment token. */
  deletePaymentToken?: Maybe<DeletePaymentTokenOutput>;
  /** Deletes a configurable product attribute. Requires authentication. */
  deleteSellerConfigAttribute?: Maybe<DeleteSellerConfigAttribute>;
  /** Deletes products from the seller's catalog (requires authentication). */
  deleteSellerProducts?: Maybe<DeleteProductOutput>;
  /** Estimate shipping method(s) for cart based on address */
  estimateShippingMethods?: Maybe<Array<Maybe<AvailableShippingMethod>>>;
  /** Estimate totals for cart based on the address */
  estimateTotals: EstimateTotalsOutput;
  /** Generate a token for specified customer. */
  generateCustomerToken?: Maybe<CustomerToken>;
  /** Request a customer token so that an administrator can perform remote shopping assistance. */
  generateCustomerTokenAsAdmin?: Maybe<GenerateCustomerTokenAsAdminOutput>;
  /** Handle a payment response and save the payment in Quote. Use this mutation for Payflow Pro and Payments Pro payment methods. */
  handlePayflowProResponse?: Maybe<PayflowProResponseOutput>;
  /** Adds a review for a seller. */
  makeSellerReview?: Maybe<MakeSellerReview>;
  /** Marks a specific news item as read in the seller's news feed. */
  markNewsRead?: Maybe<MarkNewsRead>;
  /** Transfer the contents of a guest cart into the cart of a logged-in customer. */
  mergeCarts: Cart;
  /** Convert the quote into an order. */
  placeOrder?: Maybe<PlaceOrderOutput>;
  /** Remove a previously-applied coupon from the cart. The cart must contain at least one item in order to remove the coupon. */
  removeCouponFromCart?: Maybe<RemoveCouponFromCartOutput>;
  /** Delete the entire quantity of a specified item from the cart. If you remove all items from the cart, the cart continues to exist. */
  removeItemFromCart?: Maybe<RemoveItemFromCartOutput>;
  /** Remove products from the specified compare list. */
  removeProductsFromCompareList?: Maybe<CompareList>;
  /** Remove one or more products from the specified wish list. */
  removeProductsFromWishlist?: Maybe<RemoveProductsFromWishlistOutput>;
  /** Add all products from a customer's previous order to the cart. */
  reorderItems?: Maybe<ReorderItemsOutput>;
  /** Reports a product for a given reason (requires authentication). */
  reportProduct?: Maybe<ReportProduct>;
  /** Reports a seller based on the provided reason (requires authentication). */
  reportSeller?: Maybe<ReportSeller>;
  /** Request to cancel specified guest order. */
  requestGuestOrderCancel?: Maybe<CancelOrderOutput>;
  /** Request an email with a reset password token for the registered customer identified by the specified email. */
  requestPasswordResetEmail?: Maybe<Scalars['Boolean']['output']>;
  /** Resends the confirmation email to a customer. */
  resendConfirmationEmail?: Maybe<Scalars['Boolean']['output']>;
  /** Reset a customer's password using the reset password token that the customer received in an email after requesting it using `requestPasswordResetEmail`. */
  resetPassword?: Maybe<Scalars['Boolean']['output']>;
  /** Revoke the customer token. */
  revokeCustomerToken?: Maybe<RevokeCustomerTokenOutput>;
  /** Saves a draft product. */
  saveDraftProduct?: Maybe<SaveDraftProduct>;
  /** Saves header information for PDF documents like invoices. Requires authentication. */
  savePdfHeaderInfo?: Maybe<SavePdfHeaderInfo>;
  /** Saves seller profile information (requires authentication). */
  saveSellerProfile?: Maybe<SaveSellerProfile>;
  /** Adds a new draft product to the seller's catalog. Requires authentication. */
  sellerAddDraftProduct?: Maybe<SellerAddProduct>;
  /** Adds a new product for the seller (requires authentication). */
  sellerAddProduct?: Maybe<SellerAddProduct>;
  /** Request to become a seller partner (requires authentication). */
  sellerBecomePartner?: Maybe<SellerBecomePartner>;
  /** Cancels a seller's order (requires authentication). */
  sellerCancelOrder?: Maybe<SellerCancelOrder>;
  /** Creates a credit memo for a seller's order (requires authentication). */
  sellerCreateCreditmemo?: Maybe<SellerCreateCreditmemo>;
  /** Creates an invoice for the seller's order (requires authentication). */
  sellerCreateInvoice?: Maybe<SellerCreateInvoice>;
  /** Creates a shipment for the order (requires authentication). */
  sellerCreateShipment?: Maybe<SellerCreateShipment>;
  /** Sends a query email to the admin (requires authentication). */
  sellerMailToAdmin?: Maybe<SellerMailToAdmin>;
  /** Sends a query email to the seller (requires authentication). */
  sellerMailToSeller?: Maybe<SellerMailToSeller>;
  /** Saves the seller's shop URL data. Requires authentication. */
  sellerSaveShopUrl?: Maybe<SellerSaveShopUrl>;
  /** Seller requests a withdrawal from their account. Requires authentication. */
  sellerWithdrawalRequest?: Maybe<SellerWithdrawalRequest>;
  /** Send a message on behalf of a customer to the specified email addresses. */
  sendEmailToFriend?: Maybe<SendEmailToFriendOutput>;
  /** Send an email to the customer about their order. This is typically used in the seller's order view page. Requires authentication. */
  sendOrderMailToCustomer?: Maybe<SendOrderMailToCustomer>;
  /** Set the billing address on a specific cart. */
  setBillingAddressOnCart?: Maybe<SetBillingAddressOnCartOutput>;
  /** Sets the cart as inactive */
  setCartAsInactive?: Maybe<SetCartAsInactiveOutput>;
  /** Assign the email address of a guest to the cart. */
  setGuestEmailOnCart?: Maybe<SetGuestEmailOnCartOutput>;
  /**
   * Set the cart payment method and convert the cart into an order.
   * @deprecated Should use setPaymentMethodOnCart and placeOrder mutations in single request.
   */
  setPaymentMethodAndPlaceOrder?: Maybe<PlaceOrderOutput>;
  /** Apply a payment method to the cart. */
  setPaymentMethodOnCart?: Maybe<SetPaymentMethodOnCartOutput>;
  /** Set one or more shipping addresses on a specific cart. */
  setShippingAddressesOnCart?: Maybe<SetShippingAddressesOnCartOutput>;
  /** Set one or more delivery methods on a cart. */
  setShippingMethodsOnCart?: Maybe<SetShippingMethodsOnCartOutput>;
  /** Subscribe the specified email to the store's newsletter. */
  subscribeEmailToNewsletter?: Maybe<SubscribeEmailToNewsletterOutput>;
  /** Synchronizes the payment order details for further payment processing */
  syncPaymentOrder?: Maybe<Scalars['Boolean']['output']>;
  /** Modify items in the cart. */
  updateCartItems?: Maybe<UpdateCartItemsOutput>;
  /** @deprecated Use `updateCustomerV2` instead. */
  updateCustomer?: Maybe<CustomerOutput>;
  /** Update the billing or shipping address of a customer or guest. */
  updateCustomerAddress?: Maybe<CustomerAddress>;
  /** Change the email address for the logged-in customer. */
  updateCustomerEmail?: Maybe<CustomerOutput>;
  /** Update the customer's personal information. */
  updateCustomerV2?: Maybe<CustomerOutput>;
  /** Update one or more products in the specified wish list. */
  updateProductsInWishlist?: Maybe<UpdateProductsInWishlistOutput>;
  /** Uploads an Image for a downloadable product. */
  uploadDownloadableImage?: Maybe<UploadImage>;
  /** Uploads an image (e.g., for a banner). */
  uploadImage?: Maybe<UploadImage>;
};


export type MutationAddBundleProductsToCartArgs = {
  input?: InputMaybe<AddBundleProductsToCartInput>;
};


export type MutationAddConfigAttributeArgs = {
  attributeCode: Scalars['String']['input'];
  attributeId?: InputMaybe<Scalars['Int']['input']>;
  attributeLabel: Scalars['String']['input'];
  attroptions: Array<InputMaybe<ConfigAttribute>>;
  default?: InputMaybe<Scalars['Int']['input']>;
  valRequired?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationAddConfigurableProductsToCartArgs = {
  input?: InputMaybe<AddConfigurableProductsToCartInput>;
};


export type MutationAddDownloadableProductsToCartArgs = {
  input?: InputMaybe<AddDownloadableProductsToCartInput>;
};


export type MutationAddProductsToCartArgs = {
  cartId: Scalars['String']['input'];
  cartItems: Array<CartItemInput>;
};


export type MutationAddProductsToCompareListArgs = {
  input?: InputMaybe<AddProductsToCompareListInput>;
};


export type MutationAddProductsToNewCartArgs = {
  cartItems: Array<CartItemInput>;
};


export type MutationAddProductsToWishlistArgs = {
  wishlistId: Scalars['ID']['input'];
  wishlistItems: Array<WishlistItemInput>;
};


export type MutationAddSimpleProductsToCartArgs = {
  input?: InputMaybe<AddSimpleProductsToCartInput>;
};


export type MutationAddVirtualProductsToCartArgs = {
  input?: InputMaybe<AddVirtualProductsToCartInput>;
};


export type MutationAddWishlistItemsToCartArgs = {
  wishlistId: Scalars['ID']['input'];
  wishlistItemIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationApplyCouponToCartArgs = {
  input?: InputMaybe<ApplyCouponToCartInput>;
};


export type MutationAssignCompareListToCustomerArgs = {
  uid: Scalars['ID']['input'];
};


export type MutationAssignCustomerToGuestCartArgs = {
  cart_id: Scalars['String']['input'];
};


export type MutationCancelOrderArgs = {
  input: CancelOrderInput;
};


export type MutationChangeCustomerPasswordArgs = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};


export type MutationCompleteOrderArgs = {
  input?: InputMaybe<CompleteOrderInput>;
};


export type MutationConfirmCancelOrderArgs = {
  input: ConfirmCancelOrderInput;
};


export type MutationConfirmEmailArgs = {
  input: ConfirmEmailInput;
};


export type MutationContactSellerBySellerIdArgs = {
  query: Scalars['String']['input'];
  sellerId: Scalars['Int']['input'];
  subject: Scalars['String']['input'];
};


export type MutationContactUsArgs = {
  input: ContactUsInput;
};


export type MutationCreateBraintreePayPalVaultClientTokenArgs = {
  input?: InputMaybe<BraintreeVaultInput>;
};


export type MutationCreateCompareListArgs = {
  input?: InputMaybe<CreateCompareListInput>;
};


export type MutationCreateCustomerArgs = {
  input: CustomerInput;
};


export type MutationCreateCustomerAddressArgs = {
  input: CustomerAddressInput;
};


export type MutationCreateCustomerV2Args = {
  input: CustomerCreateInput;
};


export type MutationCreateEmptyCartArgs = {
  input?: InputMaybe<CreateEmptyCartInput>;
};


export type MutationCreateGuestCartArgs = {
  input?: InputMaybe<CreateGuestCartInput>;
};


export type MutationCreatePayflowProTokenArgs = {
  input: PayflowProTokenInput;
};


export type MutationCreatePaymentOrderArgs = {
  input: CreatePaymentOrderInput;
};


export type MutationCreatePaypalExpressTokenArgs = {
  input: PaypalExpressTokenInput;
};


export type MutationCreateProductReviewArgs = {
  input: CreateProductReviewInput;
};


export type MutationCreateSellerAccountArgs = {
  customer?: InputMaybe<CustomerInput>;
};


export type MutationCreateVaultCardPaymentTokenArgs = {
  input: CreateVaultCardPaymentTokenInput;
};


export type MutationCreateVaultCardSetupTokenArgs = {
  input: CreateVaultCardSetupTokenInput;
};


export type MutationDeleteCompareListArgs = {
  uid: Scalars['ID']['input'];
};


export type MutationDeleteCustomerAddressArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteDraftProductArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeletePaymentTokenArgs = {
  public_hash: Scalars['String']['input'];
};


export type MutationDeleteSellerConfigAttributeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteSellerProductsArgs = {
  productIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type MutationEstimateShippingMethodsArgs = {
  input: EstimateTotalsInput;
};


export type MutationEstimateTotalsArgs = {
  input: EstimateTotalsInput;
};


export type MutationGenerateCustomerTokenArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationGenerateCustomerTokenAsAdminArgs = {
  input: GenerateCustomerTokenAsAdminInput;
};


export type MutationHandlePayflowProResponseArgs = {
  input: PayflowProResponseInput;
};


export type MutationMakeSellerReviewArgs = {
  feedback: FeedbackParams;
  sellerId: Scalars['Int']['input'];
};


export type MutationMarkNewsReadArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationMergeCartsArgs = {
  destination_cart_id?: InputMaybe<Scalars['String']['input']>;
  source_cart_id: Scalars['String']['input'];
};


export type MutationPlaceOrderArgs = {
  input?: InputMaybe<PlaceOrderInput>;
};


export type MutationRemoveCouponFromCartArgs = {
  input?: InputMaybe<RemoveCouponFromCartInput>;
};


export type MutationRemoveItemFromCartArgs = {
  input?: InputMaybe<RemoveItemFromCartInput>;
};


export type MutationRemoveProductsFromCompareListArgs = {
  input?: InputMaybe<RemoveProductsFromCompareListInput>;
};


export type MutationRemoveProductsFromWishlistArgs = {
  wishlistId: Scalars['ID']['input'];
  wishlistItemsIds: Array<Scalars['ID']['input']>;
};


export type MutationReorderItemsArgs = {
  orderNumber: Scalars['String']['input'];
};


export type MutationReportProductArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['Int']['input'];
  reason: Scalars['String']['input'];
};


export type MutationReportSellerArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  reason: Scalars['String']['input'];
  sellerId: Scalars['Int']['input'];
};


export type MutationRequestGuestOrderCancelArgs = {
  input: GuestOrderCancelInput;
};


export type MutationRequestPasswordResetEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationResendConfirmationEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  email: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  resetPasswordToken: Scalars['String']['input'];
};


export type MutationSaveDraftProductArgs = {
  draftId: Scalars['Int']['input'];
};


export type MutationSavePdfHeaderInfoArgs = {
  othersInfo: Scalars['String']['input'];
};


export type MutationSaveSellerProfileArgs = {
  input: SellerProfileInput;
};


export type MutationSellerAddDraftProductArgs = {
  attributes?: InputMaybe<Scalars['Int']['input']>;
  draftProductId?: InputMaybe<Scalars['Int']['input']>;
  product: ProductInput;
  set: Scalars['Int']['input'];
  type: Scalars['String']['input'];
  variationsMatrix?: InputMaybe<Array<InputMaybe<VariationsInput>>>;
};


export type MutationSellerAddProductArgs = {
  affectConfigurableProductAttributes?: InputMaybe<Scalars['Int']['input']>;
  associatedProductIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  attributes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  back?: InputMaybe<Scalars['String']['input']>;
  downloadable?: InputMaybe<DownloadableLinkInput>;
  isDownloadable?: InputMaybe<Scalars['Boolean']['input']>;
  links?: InputMaybe<LinkInput>;
  product: ProductInput;
  set: Scalars['Int']['input'];
  type: Scalars['String']['input'];
  variationsMatrix?: InputMaybe<Array<InputMaybe<VariationsInput>>>;
};


export type MutationSellerBecomePartnerArgs = {
  isSeller: Scalars['Int']['input'];
  shopUrl: Scalars['String']['input'];
};


export type MutationSellerCancelOrderArgs = {
  orderId: Scalars['Int']['input'];
};


export type MutationSellerCreateCreditmemoArgs = {
  creditMemo: CreditmemoParams;
  invoiceId: Scalars['Int']['input'];
  orderId: Scalars['Int']['input'];
};


export type MutationSellerCreateInvoiceArgs = {
  invoice?: InputMaybe<InvoiceParams>;
  orderId: Scalars['Int']['input'];
};


export type MutationSellerCreateShipmentArgs = {
  carrier?: InputMaybe<Scalars['String']['input']>;
  orderId: Scalars['Int']['input'];
  shipment?: InputMaybe<ShipmentParams>;
  trackingId: Scalars['String']['input'];
};


export type MutationSellerMailToAdminArgs = {
  query: Scalars['String']['input'];
  subject: Scalars['String']['input'];
};


export type MutationSellerMailToSellerArgs = {
  productId: Scalars['Int']['input'];
  query: Scalars['String']['input'];
  subject: Scalars['String']['input'];
};


export type MutationSellerSaveShopUrlArgs = {
  input: SellerShopUrlInput;
};


export type MutationSendEmailToFriendArgs = {
  input?: InputMaybe<SendEmailToFriendInput>;
};


export type MutationSendOrderMailToCustomerArgs = {
  orderId: Scalars['Int']['input'];
};


export type MutationSetBillingAddressOnCartArgs = {
  input?: InputMaybe<SetBillingAddressOnCartInput>;
};


export type MutationSetCartAsInactiveArgs = {
  cartId: Scalars['String']['input'];
};


export type MutationSetGuestEmailOnCartArgs = {
  input?: InputMaybe<SetGuestEmailOnCartInput>;
};


export type MutationSetPaymentMethodAndPlaceOrderArgs = {
  input?: InputMaybe<SetPaymentMethodAndPlaceOrderInput>;
};


export type MutationSetPaymentMethodOnCartArgs = {
  input?: InputMaybe<SetPaymentMethodOnCartInput>;
};


export type MutationSetShippingAddressesOnCartArgs = {
  input?: InputMaybe<SetShippingAddressesOnCartInput>;
};


export type MutationSetShippingMethodsOnCartArgs = {
  input?: InputMaybe<SetShippingMethodsOnCartInput>;
};


export type MutationSubscribeEmailToNewsletterArgs = {
  email: Scalars['String']['input'];
};


export type MutationSyncPaymentOrderArgs = {
  input?: InputMaybe<SyncPaymentOrderInput>;
};


export type MutationUpdateCartItemsArgs = {
  input?: InputMaybe<UpdateCartItemsInput>;
};


export type MutationUpdateCustomerArgs = {
  input: CustomerInput;
};


export type MutationUpdateCustomerAddressArgs = {
  id: Scalars['Int']['input'];
  input?: InputMaybe<CustomerAddressInput>;
};


export type MutationUpdateCustomerEmailArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateCustomerV2Args = {
  input: CustomerUpdateInput;
};


export type MutationUpdateProductsInWishlistArgs = {
  wishlistId: Scalars['ID']['input'];
  wishlistItems: Array<WishlistItemUpdateInput>;
};


export type MutationUploadDownloadableImageArgs = {
  imageEncoded: Scalars['String']['input'];
  imageName: Scalars['String']['input'];
  type: Scalars['String']['input'];
};


export type MutationUploadImageArgs = {
  imageEncoded: Scalars['String']['input'];
  imageName: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

/** Contains an error message when an invalid UID was specified. */
export type NoSuchEntityUidError = ErrorInterface & {
  __typename?: 'NoSuchEntityUidError';
  /** The returned error message. */
  message: Scalars['String']['output'];
  /** The specified invalid unique ID of an object. */
  uid: Scalars['ID']['output'];
};

/** Contains the order ID. */
export type Order = {
  __typename?: 'Order';
  /** @deprecated Use `order_number` instead. */
  order_id?: Maybe<Scalars['String']['output']>;
  /** The unique ID for an `Order` object. */
  order_number: Scalars['String']['output'];
};

/** The list of available order actions. */
export enum OrderActionType {
  Cancel = 'CANCEL',
  Reorder = 'REORDER'
}

/** Contains detailed information about an order's billing and shipping addresses. */
export type OrderAddress = {
  __typename?: 'OrderAddress';
  /** The city or town. */
  city: Scalars['String']['output'];
  /** The customer's company. */
  company?: Maybe<Scalars['String']['output']>;
  /** The customer's country. */
  country_code?: Maybe<CountryCodeEnum>;
  /** The fax number. */
  fax?: Maybe<Scalars['String']['output']>;
  /** The first name of the person associated with the shipping/billing address. */
  firstname: Scalars['String']['output'];
  /** The family name of the person associated with the shipping/billing address. */
  lastname: Scalars['String']['output'];
  /** The middle name of the person associated with the shipping/billing address. */
  middlename?: Maybe<Scalars['String']['output']>;
  /** The customer's ZIP or postal code. */
  postcode?: Maybe<Scalars['String']['output']>;
  /** An honorific, such as Dr., Mr., or Mrs. */
  prefix?: Maybe<Scalars['String']['output']>;
  /** The state or province name. */
  region?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `Region` object of a pre-defined region. */
  region_id?: Maybe<Scalars['ID']['output']>;
  /** An array of strings that define the street number and name. */
  street: Array<Maybe<Scalars['String']['output']>>;
  /** A value such as Sr., Jr., or III. */
  suffix?: Maybe<Scalars['String']['output']>;
  /** The telephone number. */
  telephone?: Maybe<Scalars['String']['output']>;
  /** The customer's Value-added tax (VAT) number (for corporate customers). */
  vat_id?: Maybe<Scalars['String']['output']>;
};

export type OrderAddressInfo = {
  __typename?: 'OrderAddressInfo';
  /** The address details. */
  address?: Maybe<OrderAddress>;
  /** The title of the address (e.g., 'Billing Address', 'Shipping Address'). */
  title?: Maybe<Scalars['String']['output']>;
};

export type OrderBuyerInfo = {
  __typename?: 'OrderBuyerInfo';
  /** The label for the buyer's email. */
  email_label?: Maybe<Scalars['String']['output']>;
  /** The value of the buyer's email. */
  email_value?: Maybe<Scalars['String']['output']>;
  /** The label for the buyer's name. */
  name_label?: Maybe<Scalars['String']['output']>;
  /** The value of the buyer's name. */
  name_value?: Maybe<Scalars['String']['output']>;
  /** The title for buyer information. */
  title?: Maybe<Scalars['String']['output']>;
};

export type OrderCustomerInfo = {
  __typename?: 'OrderCustomerInfo';
  /** First name of the customer */
  firstname: Scalars['String']['output'];
  /** Last name of the customer */
  lastname?: Maybe<Scalars['String']['output']>;
  /** Middle name of the customer */
  middlename?: Maybe<Scalars['String']['output']>;
  /** Prefix of the customer */
  prefix?: Maybe<Scalars['String']['output']>;
  /** Suffix of the customer */
  suffix?: Maybe<Scalars['String']['output']>;
};

/** Order Data */
export type OrderData = {
  __typename?: 'OrderData';
  /** Date Label */
  dateLabel?: Maybe<Scalars['String']['output']>;
  /** Date Value */
  dateValue?: Maybe<Scalars['String']['output']>;
  /** Label */
  label?: Maybe<Scalars['String']['output']>;
  /** Status Label */
  statusLabel?: Maybe<Scalars['String']['output']>;
  /** Status Value */
  statusValue?: Maybe<Scalars['String']['output']>;
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
};

/** Images related to an order for the seller */
export type OrderImages = {
  __typename?: 'OrderImages';
  /** URL of the image */
  image?: Maybe<Scalars['String']['output']>;
  /** Name of the image */
  name?: Maybe<Scalars['String']['output']>;
  /** Quantity of the product shown in the image */
  qty?: Maybe<Scalars['Int']['output']>;
};

/** Input to retrieve an order based on details. */
export type OrderInformationInput = {
  /** Order billing address email. */
  email: Scalars['String']['input'];
  /** Order billing address lastname. */
  lastname: Scalars['String']['input'];
  /** Order number. */
  number: Scalars['String']['input'];
};

export type OrderInput = {
  /** The current page of results. */
  curPage?: InputMaybe<Scalars['Int']['input']>;
  /** Filter orders by customer name. */
  customer_name?: InputMaybe<Scalars['String']['input']>;
  /** Filter orders by order ID. */
  order_id?: InputMaybe<Scalars['String']['input']>;
  /** The number of items to return per page. */
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  /** Filter orders by purchase date to. */
  puchase_to?: InputMaybe<Scalars['String']['input']>;
  /** Filter orders by purchase date from. */
  purchase_from?: InputMaybe<Scalars['String']['input']>;
  /** Filter orders by status. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** The type of order to filter by. */
  type: Scalars['String']['input'];
};

export type OrderItem = OrderItemInterface & {
  __typename?: 'OrderItem';
  /** The final discount information for the product. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** The entered option for the base product, such as a logo or image. */
  entered_options?: Maybe<Array<Maybe<OrderItemOption>>>;
  /** The selected gift message for the order item */
  gift_message?: Maybe<GiftMessage>;
  /** The unique ID for an `OrderItemInterface` object. */
  id: Scalars['ID']['output'];
  /** Contains details about the price of the item, including taxes and discounts. */
  prices?: Maybe<OrderItemPrices>;
  /** The ProductInterface object, which contains details about the base product */
  product?: Maybe<ProductInterface>;
  /** The name of the base product. */
  product_name?: Maybe<Scalars['String']['output']>;
  /** The sale price of the base product, including selected options. */
  product_sale_price: Money;
  /** The SKU of the base product. */
  product_sku: Scalars['String']['output'];
  /** The type of product, such as simple, configurable, etc. */
  product_type?: Maybe<Scalars['String']['output']>;
  /** URL key of the base product. */
  product_url_key?: Maybe<Scalars['String']['output']>;
  /** The number of canceled items. */
  quantity_canceled?: Maybe<Scalars['Float']['output']>;
  /** The number of invoiced items. */
  quantity_invoiced?: Maybe<Scalars['Float']['output']>;
  /** The number of units ordered for this item. */
  quantity_ordered?: Maybe<Scalars['Float']['output']>;
  /** The number of refunded items. */
  quantity_refunded?: Maybe<Scalars['Float']['output']>;
  /** The number of returned items. */
  quantity_returned?: Maybe<Scalars['Float']['output']>;
  /** The number of shipped items. */
  quantity_shipped?: Maybe<Scalars['Float']['output']>;
  /** The selected options for the base product, such as color or size. */
  selected_options?: Maybe<Array<Maybe<OrderItemOption>>>;
  /** The status of the order item. */
  status?: Maybe<Scalars['String']['output']>;
};

/** Order item details. */
export type OrderItemInterface = {
  /** The final discount information for the product. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** The entered option for the base product, such as a logo or image. */
  entered_options?: Maybe<Array<Maybe<OrderItemOption>>>;
  /** The selected gift message for the order item */
  gift_message?: Maybe<GiftMessage>;
  /** The unique ID for an `OrderItemInterface` object. */
  id: Scalars['ID']['output'];
  /** Contains details about the price of the item, including taxes and discounts. */
  prices?: Maybe<OrderItemPrices>;
  /** The ProductInterface object, which contains details about the base product */
  product?: Maybe<ProductInterface>;
  /** The name of the base product. */
  product_name?: Maybe<Scalars['String']['output']>;
  /** The sale price of the base product, including selected options. */
  product_sale_price: Money;
  /** The SKU of the base product. */
  product_sku: Scalars['String']['output'];
  /** The type of product, such as simple, configurable, etc. */
  product_type?: Maybe<Scalars['String']['output']>;
  /** URL key of the base product. */
  product_url_key?: Maybe<Scalars['String']['output']>;
  /** The number of canceled items. */
  quantity_canceled?: Maybe<Scalars['Float']['output']>;
  /** The number of invoiced items. */
  quantity_invoiced?: Maybe<Scalars['Float']['output']>;
  /** The number of units ordered for this item. */
  quantity_ordered?: Maybe<Scalars['Float']['output']>;
  /** The number of refunded items. */
  quantity_refunded?: Maybe<Scalars['Float']['output']>;
  /** The number of returned items. */
  quantity_returned?: Maybe<Scalars['Float']['output']>;
  /** The number of shipped items. */
  quantity_shipped?: Maybe<Scalars['Float']['output']>;
  /** The selected options for the base product, such as color or size. */
  selected_options?: Maybe<Array<Maybe<OrderItemOption>>>;
  /** The status of the order item. */
  status?: Maybe<Scalars['String']['output']>;
};

/** Represents order item options like selected or entered. */
export type OrderItemOption = {
  __typename?: 'OrderItemOption';
  /** The name of the option. */
  label: Scalars['String']['output'];
  /** The value of the option. */
  value: Scalars['String']['output'];
};

export type OrderItemPrices = {
  __typename?: 'OrderItemPrices';
  /** An array of discounts to be applied to the cart item. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  fixed_product_taxes: Array<Maybe<FixedProductTax>>;
  /** The original price of the item. */
  original_price?: Maybe<Money>;
  /** The original price of the item including tax. */
  original_price_including_tax?: Maybe<Money>;
  /** The value of the original price multiplied by the quantity of the item. */
  original_row_total: Money;
  /** The value of the original price multiplied by the quantity of the item including tax. */
  original_row_total_including_tax: Money;
  /** The price of the item before any discounts were applied. The price that might include tax, depending on the configured display settings for cart. */
  price: Money;
  /** The price of the item before any discounts were applied. The price that might include tax, depending on the configured display settings for cart. */
  price_including_tax: Money;
  /** The value of the price multiplied by the quantity of the item. */
  row_total: Money;
  /** The value of `row_total` plus the tax applied to the item. */
  row_total_including_tax: Money;
  /** The total of all discounts applied to the item. */
  total_item_discount: Money;
};

/** Contains details about the payment method used to pay for the order. */
export type OrderPaymentMethod = {
  __typename?: 'OrderPaymentMethod';
  /** Additional data per payment method type. */
  additional_data?: Maybe<Array<Maybe<KeyValue>>>;
  /** The method of payment (e.g., 'Credit Card', 'PayPal'). */
  method?: Maybe<Scalars['String']['output']>;
  /** The label that describes the payment method. */
  name: Scalars['String']['output'];
  /** The title of the payment method used. */
  title?: Maybe<Scalars['String']['output']>;
  /** The payment method code that indicates how the order was paid for. */
  type: Scalars['String']['output'];
};

/** Contains order shipment details. */
export type OrderShipment = {
  __typename?: 'OrderShipment';
  /** Comments added to the shipment. */
  comments?: Maybe<Array<Maybe<SalesCommentItem>>>;
  /** The unique ID for a `OrderShipment` object. */
  id: Scalars['ID']['output'];
  /** An array of items included in the shipment. */
  items?: Maybe<Array<Maybe<ShipmentItemInterface>>>;
  /** The sequential credit shipment number. */
  number: Scalars['String']['output'];
  /** An array of shipment tracking details. */
  tracking?: Maybe<Array<Maybe<ShipmentTracking>>>;
};

export type OrderShippingMethod = {
  __typename?: 'OrderShippingMethod';
  /** The method of shipping used for the order. */
  method?: Maybe<Scalars['String']['output']>;
  /** The title of the shipping method. */
  title?: Maybe<Scalars['String']['output']>;
};

/** Input to retrieve an order based on token. */
export type OrderTokenInput = {
  /** Order token. */
  token: Scalars['String']['input'];
};

/** Contains details about the sales total amounts used to calculate the final price. */
export type OrderTotal = {
  __typename?: 'OrderTotal';
  /** The final base grand total amount in the base currency. */
  base_grand_total: Money;
  /** The applied discounts to the order. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** The final total amount, including shipping, discounts, and taxes. */
  grand_total: Money;
  /** Details about the shipping and handling costs for the order. */
  shipping_handling?: Maybe<ShippingHandling>;
  /**
   * The subtotal of the order, excluding shipping, discounts, and taxes.
   * @deprecated Use subtotal_excl_tax field instead
   */
  subtotal: Money;
  /** The subtotal of the order, excluding taxes. */
  subtotal_excl_tax: Money;
  /** The subtotal of the order, including taxes. */
  subtotal_incl_tax: Money;
  /** The order tax details. */
  taxes?: Maybe<Array<Maybe<TaxItem>>>;
  /** The shipping amount for the order. */
  total_shipping: Money;
  /** The amount of tax applied to the order. */
  total_tax: Money;
};

export type OrderViewData = {
  __typename?: 'OrderViewData';
  /** The title of the order data. */
  title?: Maybe<Scalars['String']['output']>;
  /** The value of the order data. */
  value?: Maybe<Scalars['String']['output']>;
  /** The formatted value of the order data. */
  value_formatted?: Maybe<Scalars['String']['output']>;
};

/** Contains detailed information about an order for viewing purposes. */
export type OrderViewInfo = {
  __typename?: 'OrderViewInfo';
  /** The billing address associated with the order. */
  billing_address?: Maybe<OrderAddressInfo>;
  /** Details about the payment method used for the order. */
  payment_method?: Maybe<OrderPaymentMethod>;
  /** The shipping address associated with the order. */
  shipping_address?: Maybe<OrderAddressInfo>;
  /** Additional information about the shipping details for the order. */
  shipping_info?: Maybe<MpOrderShippingInfo>;
  /** Details about the shipping method used for the order. */
  shipping_method?: Maybe<OrderShippingMethod>;
  /** The title or heading of the order view. */
  title?: Maybe<Scalars['String']['output']>;
};

export type OrderViewItem = {
  __typename?: 'OrderViewItem';
  /** The admin commission for the item. */
  admin_commission?: Maybe<Scalars['String']['output']>;
  /** The formatted admin commission for the item. */
  admin_commission_formatted?: Maybe<Scalars['String']['output']>;
  /** The discount amount applied to the item. */
  discount_amount?: Maybe<Scalars['String']['output']>;
  /** The formatted discount amount for the item. */
  discount_amount_formatted?: Maybe<Scalars['String']['output']>;
  /** The unique identifier for the order item. */
  item_id?: Maybe<Scalars['String']['output']>;
  /** Any downloadable links associated with the item. */
  links?: Maybe<Array<Maybe<DownloadableLinkTitle>>>;
  /** The price of the product. */
  price?: Maybe<Scalars['String']['output']>;
  /** The formatted price of the product. */
  price_formatted?: Maybe<Scalars['String']['output']>;
  /** The name of the product in the order. */
  product_name?: Maybe<Scalars['String']['output']>;
  /** The quantity details of the product. */
  qty?: Maybe<OrderViewQty>;
  /** The SKU (Stock Keeping Unit) of the product. */
  sku?: Maybe<Scalars['String']['output']>;
  /** The subtotal for the item. */
  subtotal?: Maybe<Scalars['String']['output']>;
  /** The formatted subtotal for the item. */
  subtotal_formatted?: Maybe<Scalars['String']['output']>;
  /** The tax amount applied to the item. */
  tax_amount?: Maybe<Scalars['String']['output']>;
  /** The formatted tax amount for the item. */
  tax_amount_formatted?: Maybe<Scalars['String']['output']>;
  /** The total amount payable to the vendor for the item. */
  vendor_total?: Maybe<Scalars['String']['output']>;
  /** The formatted vendor total for the item. */
  vendor_total_formatted?: Maybe<Scalars['String']['output']>;
};

export type OrderViewQty = {
  __typename?: 'OrderViewQty';
  /** The quantity of the item canceled. */
  cancelled?: Maybe<Scalars['Float']['output']>;
  /** The quantity of the item invoiced. */
  invoiced?: Maybe<Scalars['Float']['output']>;
  /** The ordered quantity of the item. */
  ordered?: Maybe<Scalars['Float']['output']>;
  /** The quantity of the item refunded. */
  refunded?: Maybe<Scalars['Float']['output']>;
  /** The quantity of the item shipped. */
  shipped?: Maybe<Scalars['Float']['output']>;
};

export type OrdersProductInfo = {
  __typename?: 'OrdersProductInfo';
  /** The quantity of the product canceled. */
  cancelled?: Maybe<Scalars['Int']['output']>;
  /** The quantity of the product invoiced. */
  invoiced?: Maybe<Scalars['Int']['output']>;
  /** The name of the product. */
  name?: Maybe<Scalars['String']['output']>;
  /** The quantity of the product ordered. */
  ordered?: Maybe<Scalars['Int']['output']>;
  /** The unique identifier for the product. */
  product_id?: Maybe<Scalars['String']['output']>;
  /** The quantity of the product refunded. */
  refunded?: Maybe<Scalars['Int']['output']>;
  /** The quantity of the product shipped. */
  shipped?: Maybe<Scalars['Int']['output']>;
  /** The URL link to the product page. */
  url?: Maybe<Scalars['String']['output']>;
};

/** Contains required input for Payflow Express Checkout payments. */
export type PayflowExpressInput = {
  /** The unique ID of the PayPal user. */
  payer_id: Scalars['String']['input'];
  /** The token returned by the createPaypalExpressToken mutation. */
  token: Scalars['String']['input'];
};

/** A set of relative URLs that PayPal uses in response to various actions during the authorization process. Adobe Commerce prepends the base URL to this value to create a full URL. For example, if the full URL is https://www.example.com/path/to/page.html, the relative URL is path/to/page.html. Use this input for Payflow Link and Payments Advanced payment methods. */
export type PayflowLinkInput = {
  /** The relative URL of the page that PayPal redirects to when the buyer cancels the transaction in order to choose a different payment method. If the full URL to this page is https://www.example.com/paypal/action/cancel.html, the relative URL is paypal/action/cancel.html. */
  cancel_url: Scalars['String']['input'];
  /** The relative URL of the transaction error page that PayPal redirects to upon payment error. If the full URL to this page is https://www.example.com/paypal/action/error.html, the relative URL is paypal/action/error.html. */
  error_url: Scalars['String']['input'];
  /** The relative URL of the order confirmation page that PayPal redirects to when the payment is successful and additional confirmation is not needed. If the full URL to this page is https://www.example.com/paypal/action/return.html, the relative URL is paypal/action/return.html. */
  return_url: Scalars['String']['input'];
};

/** Indicates the mode for payment. Applies to the Payflow Link and Payments Advanced payment methods. */
export enum PayflowLinkMode {
  Live = 'LIVE',
  Test = 'TEST'
}

/** Contains information used to generate PayPal iframe for transaction. Applies to Payflow Link and Payments Advanced payment methods. */
export type PayflowLinkToken = {
  __typename?: 'PayflowLinkToken';
  /** The mode for the Payflow transaction. */
  mode?: Maybe<PayflowLinkMode>;
  /** The PayPal URL used for requesting a Payflow form. */
  paypal_url?: Maybe<Scalars['String']['output']>;
  /** The secure token generated by PayPal. */
  secure_token?: Maybe<Scalars['String']['output']>;
  /** The secure token ID generated by PayPal. */
  secure_token_id?: Maybe<Scalars['String']['output']>;
};

/** Contains information required to fetch payment token information for the Payflow Link and Payments Advanced payment methods. */
export type PayflowLinkTokenInput = {
  /** The unique ID that identifies the customer's cart. */
  cart_id: Scalars['String']['input'];
};

/** Contains input for the Payflow Pro and Payments Pro payment methods. */
export type PayflowProInput = {
  /** Required input for credit card related information. */
  cc_details: CreditCardDetailsInput;
  /** Indicates whether details about the shopper's credit/debit card should be tokenized for later usage. Required only if Vault is enabled for the PayPal Payflow Pro payment integration. */
  is_active_payment_token_enabler?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Input required to complete payment. Applies to Payflow Pro and Payments Pro payment methods. */
export type PayflowProResponseInput = {
  /** The unique ID that identifies the shopper's cart. */
  cart_id: Scalars['String']['input'];
  /** The payload returned from PayPal. */
  paypal_payload: Scalars['String']['input'];
};

export type PayflowProResponseOutput = {
  __typename?: 'PayflowProResponseOutput';
  /** The cart with the updated selected payment method. */
  cart: Cart;
};

/** Contains the secure information used to authorize transaction. Applies to Payflow Pro and Payments Pro payment methods. */
export type PayflowProToken = {
  __typename?: 'PayflowProToken';
  /** The RESPMSG returned by PayPal. If the `result` is `0`, then `response_message` is `Approved`. */
  response_message: Scalars['String']['output'];
  /** A non-zero value if any errors occurred. */
  result: Scalars['Int']['output'];
  /** The RESULT returned by PayPal. A value of `0` indicates the transaction was approved. */
  result_code: Scalars['Int']['output'];
  /** A secure token generated by PayPal. */
  secure_token: Scalars['String']['output'];
  /** A secure token ID generated by PayPal. */
  secure_token_id: Scalars['String']['output'];
};

/** Contains input required to fetch payment token information for the Payflow Pro and Payments Pro payment methods. */
export type PayflowProTokenInput = {
  /** The unique ID that identifies the shopper's cart. */
  cart_id: Scalars['String']['input'];
  /** A set of relative URLs that PayPal uses for callback. */
  urls: PayflowProUrlInput;
};

/** Contains a set of relative URLs that PayPal uses in response to various actions during the authorization process. Magento prepends the base URL to this value to create a full URL. For example, if the full URL is https://www.example.com/path/to/page.html, the relative URL is path/to/page.html. Use this input for the Payflow Pro and Payment Pro payment methods. */
export type PayflowProUrlInput = {
  /** The relative URL of the page that PayPal redirects to when the buyer cancels the transaction in order to choose a different payment method. If the full URL to this page is https://www.example.com/paypal/action/cancel.html, the relative URL is paypal/action/cancel.html. */
  cancel_url: Scalars['String']['input'];
  /** The relative URL of the transaction error page that PayPal redirects to upon payment error. If the full URL to this page is https://www.example.com/paypal/action/error.html, the relative URL is paypal/action/error.html. */
  error_url: Scalars['String']['input'];
  /** The relative URL of the final confirmation page that PayPal redirects to upon payment success. If the full URL to this page is https://www.example.com/paypal/action/return.html, the relative URL is paypal/action/return.html. */
  return_url: Scalars['String']['input'];
};

export type PaymentCommonConfig = PaymentConfigItem & {
  __typename?: 'PaymentCommonConfig';
  /** The payment method code as defined in the payment gateway */
  code?: Maybe<Scalars['String']['output']>;
  /** Indicates whether the payment method is displayed */
  is_visible?: Maybe<Scalars['Boolean']['output']>;
  /** Defines the payment intent (Authorize or Capture */
  payment_intent?: Maybe<Scalars['String']['output']>;
  /** The PayPal parameters required to load the JS SDK */
  sdk_params?: Maybe<Array<Maybe<SdkParams>>>;
  /** The relative order the payment method is displayed on the checkout page */
  sort_order?: Maybe<Scalars['String']['output']>;
  /** The name displayed for the payment method */
  title?: Maybe<Scalars['String']['output']>;
};

/** Contains payment fields that are common to all types of payment methods. */
export type PaymentConfigItem = {
  /** The payment method code as defined in the payment gateway */
  code?: Maybe<Scalars['String']['output']>;
  /** Indicates whether the payment method is displayed */
  is_visible?: Maybe<Scalars['Boolean']['output']>;
  /** Defines the payment intent (Authorize or Capture */
  payment_intent?: Maybe<Scalars['String']['output']>;
  /** The PayPal parameters required to load the JS SDK */
  sdk_params?: Maybe<Array<Maybe<SdkParams>>>;
  /** The relative order the payment method is displayed on the checkout page */
  sort_order?: Maybe<Scalars['String']['output']>;
  /** The name displayed for the payment method */
  title?: Maybe<Scalars['String']['output']>;
};

/** Retrieves the payment configuration for a given location */
export type PaymentConfigOutput = {
  __typename?: 'PaymentConfigOutput';
  /** ApplePay payment method configuration */
  apple_pay?: Maybe<ApplePayConfig>;
  /** Fastlane payment method configuration */
  fastlane?: Maybe<FastlaneConfig>;
  /** GooglePay payment method configuration */
  google_pay?: Maybe<GooglePayConfig>;
  /** Hosted fields payment method configuration */
  hosted_fields?: Maybe<HostedFieldsConfig>;
  /** Smart Buttons payment method configuration */
  smart_buttons?: Maybe<SmartButtonsConfig>;
};

/** Defines the origin location for that payment request */
export enum PaymentLocation {
  Admin = 'ADMIN',
  Cart = 'CART',
  Checkout = 'CHECKOUT',
  Minicart = 'MINICART',
  ProductDetail = 'PRODUCT_DETAIL',
  StartOfCheckout = 'START_OF_CHECKOUT'
}

/** Payment Method Data */
export type PaymentMethodData = {
  __typename?: 'PaymentMethodData';
  /** Method */
  method?: Maybe<Scalars['String']['output']>;
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
};

/** Defines the payment method. */
export type PaymentMethodInput = {
  braintree?: InputMaybe<BraintreeInput>;
  braintree_ach_direct_debit?: InputMaybe<BraintreeInput>;
  braintree_ach_direct_debit_vault?: InputMaybe<BraintreeVaultInput>;
  braintree_applepay_vault?: InputMaybe<BraintreeVaultInput>;
  braintree_cc_vault?: InputMaybe<BraintreeCcVaultInput>;
  braintree_googlepay_vault?: InputMaybe<BraintreeVaultInput>;
  braintree_paypal?: InputMaybe<BraintreeInput>;
  braintree_paypal_vault?: InputMaybe<BraintreeVaultInput>;
  /** The internal name for the payment method. */
  code: Scalars['String']['input'];
  /** Required input for PayPal Hosted pro payments. */
  hosted_pro?: InputMaybe<HostedProInput>;
  /** Required input for Payflow Express Checkout payments. */
  payflow_express?: InputMaybe<PayflowExpressInput>;
  /** Required input for PayPal Payflow Link and Payments Advanced payments. */
  payflow_link?: InputMaybe<PayflowLinkInput>;
  /** Required input for PayPal Payflow Pro and Payment Pro payments. */
  payflowpro?: InputMaybe<PayflowProInput>;
  /** Required input for PayPal Payflow Pro vault payments. */
  payflowpro_cc_vault?: InputMaybe<VaultTokenInput>;
  /** Required input for Apple Pay button */
  payment_services_paypal_apple_pay?: InputMaybe<ApplePayMethodInput>;
  /** Required input for fastlane */
  payment_services_paypal_fastlane?: InputMaybe<FastlaneMethodInput>;
  /** Required input for Google Pay button */
  payment_services_paypal_google_pay?: InputMaybe<GooglePayMethodInput>;
  /** Required input for Hosted Fields */
  payment_services_paypal_hosted_fields?: InputMaybe<HostedFieldsInput>;
  /** Required input for Smart buttons */
  payment_services_paypal_smart_buttons?: InputMaybe<SmartButtonMethodInput>;
  /** Required input for vault */
  payment_services_paypal_vault?: InputMaybe<VaultMethodInput>;
  /** Required input for Express Checkout and Payments Standard payments. */
  paypal_express?: InputMaybe<PaypalExpressInput>;
  /** The purchase order number. Optional for most payment methods. */
  purchase_order_number?: InputMaybe<Scalars['String']['input']>;
};

/** Contains the payment order details */
export type PaymentOrderOutput = {
  __typename?: 'PaymentOrderOutput';
  /** PayPal order ID */
  id?: Maybe<Scalars['String']['output']>;
  /** The order ID generated by Payment Services */
  mp_order_id?: Maybe<Scalars['String']['output']>;
  /** Details about the card used on the order */
  payment_source_details?: Maybe<PaymentSourceDetails>;
  /** The status of the payment order */
  status?: Maybe<Scalars['String']['output']>;
};

export type PaymentSdkParamsItem = {
  __typename?: 'PaymentSDKParamsItem';
  /** The payment method code used in the order */
  code?: Maybe<Scalars['String']['output']>;
  /** The payment SDK parameters */
  params?: Maybe<Array<Maybe<SdkParams>>>;
};

export type PaymentSourceDetails = {
  __typename?: 'PaymentSourceDetails';
  /** Details about the card used on the order */
  card?: Maybe<Card>;
};

/** The payment source information */
export type PaymentSourceInput = {
  /** The card payment source information */
  card: CardPaymentSourceInput;
};

/** The payment source information */
export type PaymentSourceOutput = {
  __typename?: 'PaymentSourceOutput';
  /** The card payment source information */
  card: CardPaymentSourceOutput;
};

/** The stored payment method available to the customer. */
export type PaymentToken = {
  __typename?: 'PaymentToken';
  /** A description of the stored account details. */
  details?: Maybe<Scalars['String']['output']>;
  /** The payment method code associated with the token. */
  payment_method_code: Scalars['String']['output'];
  /** The public hash of the token. */
  public_hash: Scalars['String']['output'];
  /** Specifies the payment token type. */
  type: PaymentTokenTypeEnum;
};

/** The list of available payment token types. */
export enum PaymentTokenTypeEnum {
  /** phpcs:ignore Magento2.GraphQL.ValidArgumentName */
  Account = 'account',
  /** phpcs:ignore Magento2.GraphQL.ValidArgumentName */
  Card = 'card'
}

/** Contains required input for Express Checkout and Payments Standard payments. */
export type PaypalExpressInput = {
  /** The unique ID of the PayPal user. */
  payer_id: Scalars['String']['input'];
  /** The token returned by the `createPaypalExpressToken` mutation. */
  token: Scalars['String']['input'];
};

/** Deprecated. Use `PaypalExpressTokenOutput` instead. */
export type PaypalExpressToken = {
  __typename?: 'PaypalExpressToken';
  /**
   * A set of URLs that allow the buyer to authorize payment and adjust checkout details.
   * @deprecated Use `PaypalExpressTokenOutput.paypal_urls` instead.
   */
  paypal_urls?: Maybe<PaypalExpressUrlList>;
  /**
   * The token returned by PayPal.
   * @deprecated Use `PaypalExpressTokenOutput.token` instead.
   */
  token?: Maybe<Scalars['String']['output']>;
};

/** Defines the attributes required to receive a payment token for Express Checkout and Payments Standard payment methods. */
export type PaypalExpressTokenInput = {
  /** The unique ID that identifies the customer's cart. */
  cart_id: Scalars['String']['input'];
  /** The payment method code. */
  code: Scalars['String']['input'];
  /** Indicates whether the buyer selected the quick checkout button. The default value is false. */
  express_button?: InputMaybe<Scalars['Boolean']['input']>;
  /** A set of relative URLs that PayPal uses in response to various actions during the authorization process. */
  urls: PaypalExpressUrlsInput;
  /** Indicates whether the buyer clicked the PayPal credit button. The default value is false. */
  use_paypal_credit?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Contains the token returned by PayPal and a set of URLs that allow the buyer to authorize payment and adjust checkout details. Applies to Express Checkout and Payments Standard payment methods. */
export type PaypalExpressTokenOutput = {
  __typename?: 'PaypalExpressTokenOutput';
  /** A set of URLs that allow the buyer to authorize payment and adjust checkout details. */
  paypal_urls?: Maybe<PaypalExpressUrlList>;
  /** The token returned by PayPal. */
  token?: Maybe<Scalars['String']['output']>;
};

/** Contains a set of URLs that allow the buyer to authorize payment and adjust checkout details for Express Checkout and Payments Standard transactions. */
export type PaypalExpressUrlList = {
  __typename?: 'PaypalExpressUrlList';
  /** The PayPal URL that allows the buyer to edit their checkout details. */
  edit?: Maybe<Scalars['String']['output']>;
  /** The URL to the PayPal login page. */
  start?: Maybe<Scalars['String']['output']>;
};

/** Contains a set of relative URLs that PayPal uses in response to various actions during the authorization process. Magento prepends the base URL to this value to create a full URL. For example, if the full URL is https://www.example.com/path/to/page.html, the relative URL is path/to/page.html. Use this input for Express Checkout and Payments Standard payment methods. */
export type PaypalExpressUrlsInput = {
  /** The relative URL of the page that PayPal redirects to when the buyer cancels the transaction in order to choose a different payment method. If the full URL to this page is https://www.example.com/paypal/action/cancel.html, the relative URL is paypal/action/cancel.html. */
  cancel_url: Scalars['String']['input'];
  /** The relative URL of the page that PayPal redirects to when the payment has been put on hold for additional review. This condition mostly applies to ACH transactions, and is not applicable to most PayPal solutions. If the full URL to this page is https://www.example.com/paypal/action/success_pending.html, the relative URL is paypal/action/success_pending.html. */
  pending_url?: InputMaybe<Scalars['String']['input']>;
  /** The relative URL of the final confirmation page that PayPal redirects to upon payment success. If the full URL to this page is https://www.example.com/paypal/action/return.html, the relative URL is paypal/action/return.html. */
  return_url: Scalars['String']['input'];
  /** The relative URL of the order confirmation page that PayPal redirects to when the payment is successful and additional confirmation is not needed. Not applicable to most PayPal solutions. If the full URL to this page is https://www.example.com/paypal/action/success.html, the relative URL is paypal/action/success.html. */
  success_url?: InputMaybe<Scalars['String']['input']>;
};

/** Contains attributes specific to tangible products. */
export type PhysicalProductInterface = {
  /** The weight of the item, in units defined by the store. */
  weight?: Maybe<Scalars['Float']['output']>;
};

/** Defines Pickup Location information. */
export type PickupLocation = {
  __typename?: 'PickupLocation';
  city?: Maybe<Scalars['String']['output']>;
  contact_name?: Maybe<Scalars['String']['output']>;
  country_id?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  fax?: Maybe<Scalars['String']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  pickup_location_code?: Maybe<Scalars['String']['output']>;
  postcode?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Scalars['String']['output']>;
  region_id?: Maybe<Scalars['Int']['output']>;
  street?: Maybe<Scalars['String']['output']>;
};

/** PickupLocationFilterInput defines the list of attributes and filters for the search. */
export type PickupLocationFilterInput = {
  /** Filter by city. */
  city?: InputMaybe<FilterTypeInput>;
  /** Filter by country. */
  country_id?: InputMaybe<FilterTypeInput>;
  /** Filter by pickup location name. */
  name?: InputMaybe<FilterTypeInput>;
  /** Filter by pickup location code. */
  pickup_location_code?: InputMaybe<FilterTypeInput>;
  /** Filter by postcode. */
  postcode?: InputMaybe<FilterTypeInput>;
  /** Filter by region. */
  region?: InputMaybe<FilterTypeInput>;
  /** Filter by region id. */
  region_id?: InputMaybe<FilterTypeInput>;
  /** Filter by street. */
  street?: InputMaybe<FilterTypeInput>;
};

/** PickupLocationSortInput specifies attribute to use for sorting search results and indicates whether the results are sorted in ascending or descending order. */
export type PickupLocationSortInput = {
  /** City where pickup location is placed. */
  city?: InputMaybe<SortEnum>;
  /** Name of the contact person. */
  contact_name?: InputMaybe<SortEnum>;
  /** Id of the country in two letters. */
  country_id?: InputMaybe<SortEnum>;
  /** Description of the pickup location. */
  description?: InputMaybe<SortEnum>;
  /** Distance to the address, requested by distance filter. Applicable only with distance filter. If distance sort order is present, all other sort orders will be ignored. */
  distance?: InputMaybe<SortEnum>;
  /** Contact email of the pickup location. */
  email?: InputMaybe<SortEnum>;
  /** Contact fax of the pickup location. */
  fax?: InputMaybe<SortEnum>;
  /** Geographic latitude where pickup location is placed. */
  latitude?: InputMaybe<SortEnum>;
  /** Geographic longitude where pickup location is placed. */
  longitude?: InputMaybe<SortEnum>;
  /** The pickup location name. Customer use this to identify the pickup location. */
  name?: InputMaybe<SortEnum>;
  /** Contact phone number of the pickup location. */
  phone?: InputMaybe<SortEnum>;
  /** A code assigned to pickup location to identify the source. */
  pickup_location_code?: InputMaybe<SortEnum>;
  /** Postcode where pickup location is placed. */
  postcode?: InputMaybe<SortEnum>;
  /** Name of the region. */
  region?: InputMaybe<SortEnum>;
  /** Id of the region. */
  region_id?: InputMaybe<SortEnum>;
  /** Street where pickup location is placed. */
  street?: InputMaybe<SortEnum>;
};

/** Top level object returned in a pickup locations search. */
export type PickupLocations = {
  __typename?: 'PickupLocations';
  /** An array of pickup locations that match the specific search request. */
  items?: Maybe<Array<Maybe<PickupLocation>>>;
  /** An object that includes the page_info and currentPage values specified in the query. */
  page_info?: Maybe<SearchResultPageInfo>;
  /** The number of products returned. */
  total_count?: Maybe<Scalars['Int']['output']>;
};

/** An error encountered while placing an order. */
export type PlaceOrderError = {
  __typename?: 'PlaceOrderError';
  /** An error code that is specific to place order. */
  code: PlaceOrderErrorCodes;
  /** A localized error message. */
  message: Scalars['String']['output'];
};

export enum PlaceOrderErrorCodes {
  CartNotActive = 'CART_NOT_ACTIVE',
  CartNotFound = 'CART_NOT_FOUND',
  GuestEmailMissing = 'GUEST_EMAIL_MISSING',
  UnableToPlaceOrder = 'UNABLE_TO_PLACE_ORDER',
  Undefined = 'UNDEFINED'
}

/** Specifies the quote to be converted to an order. */
export type PlaceOrderInput = {
  /** The unique ID of a `Cart` object. */
  cart_id: Scalars['String']['input'];
};

/** Contains the results of the request to place an order. */
export type PlaceOrderOutput = {
  __typename?: 'PlaceOrderOutput';
  /** An array of place order errors. */
  errors: Array<Maybe<PlaceOrderError>>;
  /**
   * The ID of the order.
   * @deprecated Use `orderV2` instead.
   */
  order?: Maybe<Order>;
  /** Full order information. */
  orderV2?: Maybe<CustomerOrder>;
};

/** Deprecated. Use `ProductPrice` instead. Defines the price of a product as well as any tax-related adjustments. */
export type Price = {
  __typename?: 'Price';
  /**
   * An array that provides information about tax, weee, or weee_tax adjustments.
   * @deprecated Use `ProductPrice` instead.
   */
  adjustments?: Maybe<Array<Maybe<PriceAdjustment>>>;
  /**
   * The price of a product plus a three-letter currency code.
   * @deprecated Use `ProductPrice` instead.
   */
  amount?: Maybe<Money>;
};

/** Deprecated. Taxes will be included or excluded in the price. Defines the amount of money to apply as an adjustment, the type of adjustment to apply, and whether the item is included or excluded from the adjustment. */
export type PriceAdjustment = {
  __typename?: 'PriceAdjustment';
  /** The amount of the price adjustment and its currency code. */
  amount?: Maybe<Money>;
  /**
   * Indicates whether the adjustment involves tax, weee, or weee_tax.
   * @deprecated `PriceAdjustment` is deprecated.
   */
  code?: Maybe<PriceAdjustmentCodesEnum>;
  /**
   * Indicates whether the entity described by the code attribute is included or excluded from the adjustment.
   * @deprecated `PriceAdjustment` is deprecated.
   */
  description?: Maybe<PriceAdjustmentDescriptionEnum>;
};

/** `PriceAdjustment.code` is deprecated. */
export enum PriceAdjustmentCodesEnum {
  /** @deprecated `PriceAdjustmentCodesEnum` is deprecated. Tax is included or excluded in the price. Tax is not shown separately in Catalog. */
  Tax = 'TAX',
  /** @deprecated WEEE code is deprecated. Use `fixed_product_taxes.label` instead. */
  Weee = 'WEEE',
  /** @deprecated Use `fixed_product_taxes` instead.  Tax is included or excluded in price. The tax is not shown separtely in Catalog. */
  WeeeTax = 'WEEE_TAX'
}

/** `PriceAdjustmentDescriptionEnum` is deprecated. States whether a price adjustment is included or excluded. */
export enum PriceAdjustmentDescriptionEnum {
  Excluded = 'EXCLUDED',
  Included = 'INCLUDED'
}

/** Can be used to retrieve the main price details in case of bundle product */
export type PriceDetails = {
  __typename?: 'PriceDetails';
  /** The percentage of discount applied to the main product price */
  discount_percentage?: Maybe<Scalars['Float']['output']>;
  /** The final price after applying the discount to the main product */
  main_final_price?: Maybe<Scalars['Float']['output']>;
  /** The regular price of the main product */
  main_price?: Maybe<Scalars['Float']['output']>;
};

/** Contains the price range for a product. If the product has a single price, the minimum and maximum price will be the same. */
export type PriceRange = {
  __typename?: 'PriceRange';
  /** The highest possible price for the product. */
  maximum_price?: Maybe<ProductPrice>;
  /** The lowest possible price for the product. */
  minimum_price: ProductPrice;
};

/** Defines the price type. */
export enum PriceTypeEnum {
  Dynamic = 'DYNAMIC',
  Fixed = 'FIXED',
  Percent = 'PERCENT'
}

/** Defines whether a bundle product's price is displayed as the lowest possible value or as a range. */
export enum PriceViewEnum {
  AsLowAs = 'AS_LOW_AS',
  PriceRange = 'PRICE_RANGE'
}

/** Contains a product attribute code and value. */
export type ProductAttribute = {
  __typename?: 'ProductAttribute';
  /** The unique identifier for a product attribute code. */
  code: Scalars['String']['output'];
  /** The display value of the attribute. */
  value: Scalars['String']['output'];
};

/** Defines the filters to be used in the search. A filter contains at least one attribute, a comparison operator, and the value that is being searched for. */
export type ProductAttributeFilterInput = {
  /** Deprecated: use `category_uid` to filter product by category ID. */
  category_id?: InputMaybe<FilterEqualTypeInput>;
  /** Filter product by the unique ID for a `CategoryInterface` object. */
  category_uid?: InputMaybe<FilterEqualTypeInput>;
  /** Filter product by category URL path. */
  category_url_path?: InputMaybe<FilterEqualTypeInput>;
  /** Attribute label: Description */
  description?: InputMaybe<FilterMatchTypeInput>;
  /** Attribute label: Product Name */
  name?: InputMaybe<FilterMatchTypeInput>;
  /** Attribute label: Price */
  price?: InputMaybe<FilterRangeTypeInput>;
  /** Seller Id */
  seller_id?: InputMaybe<FilterEqualTypeInput>;
  /** Attribute label: Short Description */
  short_description?: InputMaybe<FilterMatchTypeInput>;
  /** Attribute label: SKU */
  sku?: InputMaybe<FilterEqualTypeInput>;
  /** The part of the URL that identifies the product */
  url_key?: InputMaybe<FilterEqualTypeInput>;
};

/** Specifies the attribute to use for sorting search results and indicates whether the results are sorted in ascending or descending order. It's possible to sort products using searchable attributes with enabled 'Use in Filter Options' option */
export type ProductAttributeSortInput = {
  /** Attribute label: Product Name */
  name?: InputMaybe<SortEnum>;
  /** Sort by the position assigned to each product. */
  position?: InputMaybe<SortEnum>;
  /** Attribute label: Price */
  price?: InputMaybe<SortEnum>;
  /** Sort by the search relevance score (default). */
  relevance?: InputMaybe<SortEnum>;
};

export type ProductAttributes = {
  __typename?: 'ProductAttributes';
  /** Attribute code. */
  code?: Maybe<Scalars['String']['output']>;
  /** Attribute label. */
  label?: Maybe<Scalars['String']['output']>;
  /** Attribute value. */
  value?: Maybe<Scalars['String']['output']>;
  /** visible on store. */
  visible_on_front?: Maybe<Scalars['Boolean']['output']>;
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  /** Category Id */
  id?: Maybe<Scalars['String']['output']>;
  /** Product Title */
  name?: Maybe<Scalars['String']['output']>;
  /** Category URL Key */
  url_key?: Maybe<Scalars['String']['output']>;
};

/** Product custom attributes */
export type ProductCustomAttributes = {
  __typename?: 'ProductCustomAttributes';
  /** Errors when retrieving custom attributes metadata. */
  errors: Array<Maybe<AttributeMetadataError>>;
  /** Requested custom attributes */
  items: Array<Maybe<AttributeValueInterface>>;
};

/** Contains the discount applied to a product price. */
export type ProductDiscount = {
  __typename?: 'ProductDiscount';
  /** The actual value of the discount. */
  amount_off?: Maybe<Scalars['Float']['output']>;
  /** The discount expressed a percentage. */
  percent_off?: Maybe<Scalars['Float']['output']>;
};

/** Filters to fetch and manage products */
export type ProductFilter = {
  /** Attribute set ID to filter the product by */
  attribute_set_id?: InputMaybe<Scalars['Int']['input']>;
  /** Filter products created from this date */
  created_from?: InputMaybe<Scalars['String']['input']>;
  /** Filter products created to this date */
  created_to?: InputMaybe<Scalars['String']['input']>;
  /** Reason for denying the product */
  deny_reason?: InputMaybe<Scalars['String']['input']>;
  /** Name of the product to filter */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Filter products with a price greater than or equal to this value */
  price_from?: InputMaybe<Scalars['Float']['input']>;
  /** Filter products with a price less than or equal to this value */
  price_to?: InputMaybe<Scalars['Float']['input']>;
  /** SKU of the product */
  sku?: InputMaybe<Scalars['String']['input']>;
  /** Type ID of the product (e.g., simple, configurable) */
  type_id?: InputMaybe<Scalars['String']['input']>;
  /** Visibility of the product (e.g., 1 = visible, 2 = not visible) */
  visibility?: InputMaybe<Scalars['Int']['input']>;
};

/** ProductFilterInput is deprecated, use @ProductAttributeFilterInput instead. ProductFilterInput defines the filters to be used in the search. A filter contains at least one attribute, a comparison operator, and the value that is being searched for. */
export type ProductFilterInput = {
  /** The category ID the product belongs to. */
  category_id?: InputMaybe<FilterTypeInput>;
  /** The product's country of origin. */
  country_of_manufacture?: InputMaybe<FilterTypeInput>;
  /** The timestamp indicating when the product was created. */
  created_at?: InputMaybe<FilterTypeInput>;
  /** The name of a custom layout. */
  custom_layout?: InputMaybe<FilterTypeInput>;
  /** XML code that is applied as a layout update to the product page. */
  custom_layout_update?: InputMaybe<FilterTypeInput>;
  /** Detailed information about the product. The value can include simple HTML tags. */
  description?: InputMaybe<FilterTypeInput>;
  /** Indicates whether a gift message is available. */
  gift_message_available?: InputMaybe<FilterTypeInput>;
  /** Indicates whether additional attributes have been created for the product. */
  has_options?: InputMaybe<FilterTypeInput>;
  /** The relative path to the main image on the product page. */
  image?: InputMaybe<FilterTypeInput>;
  /** The label assigned to a product image. */
  image_label?: InputMaybe<FilterTypeInput>;
  /** A number representing the product's manufacturer. */
  manufacturer?: InputMaybe<FilterTypeInput>;
  /** The numeric maximal price of the product. Do not include the currency code. */
  max_price?: InputMaybe<FilterTypeInput>;
  /** A brief overview of the product for search results listings, maximum 255 characters. */
  meta_description?: InputMaybe<FilterTypeInput>;
  /** A comma-separated list of keywords that are visible only to search engines. */
  meta_keyword?: InputMaybe<FilterTypeInput>;
  /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
  meta_title?: InputMaybe<FilterTypeInput>;
  /** The numeric minimal price of the product. Do not include the currency code. */
  min_price?: InputMaybe<FilterTypeInput>;
  /** The product name. Customers use this name to identify the product. */
  name?: InputMaybe<FilterTypeInput>;
  /** The beginning date for new product listings, and determines if the product is featured as a new product. */
  news_from_date?: InputMaybe<FilterTypeInput>;
  /** The end date for new product listings. */
  news_to_date?: InputMaybe<FilterTypeInput>;
  /** If the product has multiple options, determines where they appear on the product page. */
  options_container?: InputMaybe<FilterTypeInput>;
  /** The keyword required to perform a logical OR comparison. */
  or?: InputMaybe<ProductFilterInput>;
  /** The price of an item. */
  price?: InputMaybe<FilterTypeInput>;
  /** Indicates whether the product has required options. */
  required_options?: InputMaybe<FilterTypeInput>;
  /** A short description of the product. Its use depends on the theme. */
  short_description?: InputMaybe<FilterTypeInput>;
  /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
  sku?: InputMaybe<FilterTypeInput>;
  /** The relative path to the small image, which is used on catalog pages. */
  small_image?: InputMaybe<FilterTypeInput>;
  /** The label assigned to a product's small image. */
  small_image_label?: InputMaybe<FilterTypeInput>;
  /** The beginning date that a product has a special price. */
  special_from_date?: InputMaybe<FilterTypeInput>;
  /** The discounted price of the product. Do not include the currency code. */
  special_price?: InputMaybe<FilterTypeInput>;
  /** The end date that a product has a special price. */
  special_to_date?: InputMaybe<FilterTypeInput>;
  /** The file name of a swatch image. */
  swatch_image?: InputMaybe<FilterTypeInput>;
  /** The relative path to the product's thumbnail image. */
  thumbnail?: InputMaybe<FilterTypeInput>;
  /** The label assigned to a product's thumbnail image. */
  thumbnail_label?: InputMaybe<FilterTypeInput>;
  /** The price when tier pricing is in effect and the items purchased threshold has been reached. */
  tier_price?: InputMaybe<FilterTypeInput>;
  /** The timestamp indicating when the product was updated. */
  updated_at?: InputMaybe<FilterTypeInput>;
  /** The part of the URL that identifies the product */
  url_key?: InputMaybe<FilterTypeInput>;
  url_path?: InputMaybe<FilterTypeInput>;
  /** The weight of the item, in units defined by the store. */
  weight?: InputMaybe<FilterTypeInput>;
};

/** Contains product image information, including the image URL and label. */
export type ProductImage = MediaGalleryInterface & {
  __typename?: 'ProductImage';
  /** Indicates whether the image is hidden from view. */
  disabled?: Maybe<Scalars['Boolean']['output']>;
  /** The file path of the media item. */
  file?: Maybe<Scalars['String']['output']>;
  /** The unique identifier of the media item. */
  id?: Maybe<Scalars['String']['output']>;
  /** The label of the product image or video. */
  label?: Maybe<Scalars['String']['output']>;
  /** The media item's position after it has been sorted. */
  position?: Maybe<Scalars['Int']['output']>;
  /** The URL of the product image or video. */
  url?: Maybe<Scalars['String']['output']>;
};

/** Product image data for the media gallery */
export type ProductImageInput = {
  /** Flag to disable the image or media (1 = disabled, 0 = enabled) */
  disabled?: InputMaybe<Scalars['Int']['input']>;
  /** URL or path of the image or media file */
  file?: InputMaybe<Scalars['String']['input']>;
  /** Label for the image or media */
  label?: InputMaybe<Scalars['String']['input']>;
  /** Type of media (e.g., image, video) */
  media_type?: InputMaybe<Scalars['String']['input']>;
  /** Position of the image in the media gallery */
  position?: InputMaybe<Scalars['Int']['input']>;
  /** Flag to remove the image or media */
  removed?: InputMaybe<Scalars['String']['input']>;
  /** Role of the media (e.g., 'thumbnail', 'small', 'swatch') */
  role?: InputMaybe<Scalars['String']['input']>;
  /** Value ID for the image or media */
  value_id?: InputMaybe<Scalars['String']['input']>;
  /** Description for the video content */
  video_description?: InputMaybe<Scalars['String']['input']>;
  /** Metadata associated with the video content */
  video_metadata?: InputMaybe<Scalars['String']['input']>;
  /** Video provider for media type 'video' */
  video_provider?: InputMaybe<Scalars['String']['input']>;
  /** Title for the video content */
  video_title?: InputMaybe<Scalars['String']['input']>;
  /** URL for video content (if media type is video) */
  video_url?: InputMaybe<Scalars['String']['input']>;
};

export enum ProductImageThumbnail {
  /** Use thumbnail of product as image. */
  Itself = 'ITSELF',
  /** Use thumbnail of product's parent as image. */
  Parent = 'PARENT'
}

/** Product Information used for Pickup Locations search. */
export type ProductInfoInput = {
  /** Product SKU. */
  sku: Scalars['String']['input'];
};

/** Product */
export type ProductInput = {
  /** Categories */
  category_ids?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Configurable Product Attributes */
  configurable_attributes_data?: InputMaybe<Array<InputMaybe<AttributesInput>>>;
  /** product description */
  description: Scalars['String']['input'];
  /** Entity id */
  entity_id?: InputMaybe<Scalars['Int']['input']>;
  /** product media gallery */
  image?: InputMaybe<Scalars['String']['input']>;
  /** Product Link purchased seperately */
  links_purchased_separately?: InputMaybe<Scalars['String']['input']>;
  /** Title for downloaded product link */
  links_title?: InputMaybe<Scalars['String']['input']>;
  /** product media gallery */
  media_gallery?: InputMaybe<MediaGalleryInput>;
  /** product meta description */
  meta_description?: InputMaybe<Scalars['String']['input']>;
  /** product meta Keyword */
  meta_keyword?: InputMaybe<Scalars['String']['input']>;
  /** product meta title */
  meta_title?: InputMaybe<Scalars['String']['input']>;
  /** product cart limit */
  mp_product_cart_limit?: InputMaybe<Scalars['Int']['input']>;
  /** product name */
  name: Scalars['String']['input'];
  /** product price */
  price: Scalars['Int']['input'];
  /** product has weight */
  product_has_weight?: InputMaybe<Scalars['Int']['input']>;
  /** product qunatity and stock status data */
  quantity_and_stock_status: QuantityInput;
  /** Title for downloaded product sample data */
  samples_title?: InputMaybe<Scalars['String']['input']>;
  /** product short description */
  short_description?: InputMaybe<Scalars['String']['input']>;
  /** Product SKU */
  sku: Scalars['String']['input'];
  /** product media gallery */
  small_image?: InputMaybe<Scalars['String']['input']>;
  /** product special from date */
  special_from_date?: InputMaybe<Scalars['String']['input']>;
  /** product special price */
  special_price?: InputMaybe<Scalars['Int']['input']>;
  /** product special to date */
  special_to_date?: InputMaybe<Scalars['String']['input']>;
  /** Product Status */
  status?: InputMaybe<Scalars['Boolean']['input']>;
  /** stock data */
  stock_data: StockDataInput;
  /** Store Id */
  store_id?: InputMaybe<Scalars['Int']['input']>;
  /** product media gallery */
  swatch_image?: InputMaybe<Scalars['String']['input']>;
  /** product taxClassId */
  tax_class_id?: InputMaybe<Scalars['Int']['input']>;
  /** product media gallery */
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  /** product UrlKey */
  url_key?: InputMaybe<Scalars['String']['input']>;
  /** product visibility */
  visibility: Scalars['Int']['input'];
  /** product weight */
  weight?: InputMaybe<Scalars['Int']['input']>;
};

/** Product */
export type ProductInterface = {
  /** The productdata query returns the product attributes */
  attributeValues?: Maybe<Array<Maybe<ProductAttributes>>>;
  /**
   * The attribute set assigned to the product.
   * @deprecated The field should not be used on the storefront.
   */
  attribute_set_id?: Maybe<Scalars['Int']['output']>;
  /** Name of the product attribute set */
  attribute_set_name?: Maybe<Scalars['String']['output']>;
  /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled. */
  canonical_url?: Maybe<Scalars['String']['output']>;
  /** The categories assigned to a product. */
  categories?: Maybe<Array<Maybe<CategoryInterface>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  color?: Maybe<Scalars['Int']['output']>;
  /** The product's country of origin. */
  country_of_manufacture?: Maybe<Scalars['String']['output']>;
  /**
   * Timestamp indicating when the product was created.
   * @deprecated The field should not be used on the storefront.
   */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Crosssell Products */
  crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** Product custom attributes. */
  custom_attributesV2?: Maybe<ProductCustomAttributes>;
  /** Reason for denying the product listing */
  deny_reason?: Maybe<DenyReason>;
  /** Detailed information about the product. The value can include simple HTML tags. */
  description?: Maybe<ComplexTextValue>;
  /** Returns a value indicating gift message availability for the product. */
  gift_message_available: Scalars['Boolean']['output'];
  /**
   * The ID number assigned to the product.
   * @deprecated Use the `uid` field instead.
   */
  id?: Maybe<Scalars['Int']['output']>;
  /** The relative path to the main image on the product page. */
  image?: Maybe<ProductImage>;
  /**
   * A number representing the product's manufacturer.
   * @deprecated Use the `custom_attributes` field instead.
   */
  manufacturer?: Maybe<Scalars['Int']['output']>;
  /** Maximum Qty Allowed in Shopping Cart */
  max_sale_qty?: Maybe<Scalars['Float']['output']>;
  /** An array of media gallery objects. */
  media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
  /**
   * An array of MediaGalleryEntry objects.
   * @deprecated Use `media_gallery` instead.
   */
  media_gallery_entries?: Maybe<Array<Maybe<MediaGalleryEntry>>>;
  /** A brief overview of the product for search results listings, maximum 255 characters. */
  meta_description?: Maybe<Scalars['String']['output']>;
  /** A comma-separated list of keywords that are visible only to search engines. */
  meta_keyword?: Maybe<Scalars['String']['output']>;
  /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
  meta_title?: Maybe<Scalars['String']['output']>;
  /** Minimum Qty Allowed in Shopping Cart */
  min_sale_qty?: Maybe<Scalars['Float']['output']>;
  /** The product name. Customers use this name to identify the product. */
  name?: Maybe<Scalars['String']['output']>;
  /** The beginning date for new product listings, and determines if the product is featured as a new product. */
  new_from_date?: Maybe<Scalars['String']['output']>;
  /** The end date for new product listings. */
  new_to_date?: Maybe<Scalars['String']['output']>;
  /** Product stock only x left count */
  only_x_left_in_stock?: Maybe<Scalars['Float']['output']>;
  /** If the product has multiple options, determines where they appear on the product page. */
  options_container?: Maybe<Scalars['String']['output']>;
  /**
   * Indicates the price of an item.
   * @deprecated Use `price_range` for product price information.
   */
  price?: Maybe<ProductPrices>;
  /** The range of prices for the product */
  price_range: PriceRange;
  /** An array of `TierPrice` objects. */
  price_tiers?: Maybe<Array<Maybe<TierPrice>>>;
  /** An array of `ProductLinks` objects. */
  product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>;
  /** Current status of the product */
  product_status?: Maybe<Scalars['String']['output']>;
  /** Quantity available for the product */
  qty?: Maybe<Scalars['Int']['output']>;
  /** Quantity of the product confirmed for sale */
  qty_confirmed?: Maybe<ProductQtyConfirmed>;
  /** Quantity of the product pending sale */
  qty_pending?: Maybe<ProductQtyPending>;
  /** Quantity of the product sold */
  qty_sold?: Maybe<ProductQtySold>;
  /** Amount of available stock */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** The average of all the ratings given to the product. */
  rating_summary: Scalars['Float']['output'];
  /** An array of products to be displayed in a Related Products block. */
  related_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The total count of all the reviews given to the product. */
  review_count: Scalars['Int']['output'];
  /** The list of products reviews. */
  reviews: ProductReviews;
  /** @deprecated Use the `custom_attributes` field instead. */
  seller_id?: Maybe<Scalars['Int']['output']>;
  /** A short description of the product. Its use depends on the theme. */
  short_description?: Maybe<ComplexTextValue>;
  /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
  sku?: Maybe<Scalars['String']['output']>;
  /** The relative path to the small image, which is used on catalog pages. */
  small_image?: Maybe<ProductImage>;
  /**
   * The beginning date that a product has a special price.
   * @deprecated The field should not be used on the storefront.
   */
  special_from_date?: Maybe<Scalars['String']['output']>;
  /** The discounted price of the product. */
  special_price?: Maybe<Scalars['Float']['output']>;
  /** The end date for a product with a special price. */
  special_to_date?: Maybe<Scalars['String']['output']>;
  /** Stock status of the product */
  stock_status?: Maybe<ProductStockStatus>;
  /** The file name of a swatch image. */
  swatch_image?: Maybe<Scalars['String']['output']>;
  /** The relative path to the product's thumbnail image. */
  thumbnail?: Maybe<ProductImage>;
  /**
   * The price when tier pricing is in effect and the items purchased threshold has been reached.
   * @deprecated Use `price_tiers` for product tier price information.
   */
  tier_price?: Maybe<Scalars['Float']['output']>;
  /**
   * An array of ProductTierPrices objects.
   * @deprecated Use `price_tiers` for product tier price information.
   */
  tier_prices?: Maybe<Array<Maybe<ProductTierPrices>>>;
  /**
   * One of simple, virtual, bundle, downloadable, grouped, or configurable.
   * @deprecated Use `__typename` instead.
   */
  type_id?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `ProductInterface` object. */
  uid: Scalars['ID']['output'];
  /**
   * Timestamp indicating when the product was updated.
   * @deprecated The field should not be used on the storefront.
   */
  updated_at?: Maybe<Scalars['String']['output']>;
  /** Upsell Products */
  upsell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The part of the URL that identifies the product */
  url_key?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use product's `canonical_url` or url rewrites instead */
  url_path?: Maybe<Scalars['String']['output']>;
  /** URL rewrites list */
  url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>;
  /** The part of the product URL that is appended after the url key */
  url_suffix?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  voguish_featured?: Maybe<Scalars['String']['output']>;
  /**
   * An array of websites in which the product is available.
   * @deprecated The field should not be used on the storefront.
   */
  websites?: Maybe<Array<Maybe<Website>>>;
};


/** Product */
export type ProductInterfaceAttributeValuesArgs = {
  attributeCode?: InputMaybe<Array<InputMaybe<AttributeCodeInput>>>;
};


/** Product */
export type ProductInterfaceCustom_AttributesV2Args = {
  filters?: InputMaybe<AttributeFilterInput>;
};


/** Product */
export type ProductInterfaceReviewsArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

export type ProductItem = {
  __typename?: 'ProductItem';
  /** Product ID */
  id?: Maybe<Scalars['Int']['output']>;
  /** Product Name */
  name?: Maybe<Scalars['String']['output']>;
  /** The range of prices for the product */
  price_range: PriceRange;
  /** rating_summary */
  rating_summary?: Maybe<Scalars['Int']['output']>;
  /** SKU */
  sku?: Maybe<Scalars['String']['output']>;
  /** The relative path to the product's thumbnail image. */
  thumbnail?: Maybe<ProductImage>;
  /** Product UID */
  uid?: Maybe<Scalars['String']['output']>;
  /** Product URL Key */
  url_key?: Maybe<Scalars['String']['output']>;
};

/** Product details in the seller's inventory */
export type ProductItems = {
  __typename?: 'ProductItems';
  /** Indicator if the product is available for sale (1 for yes, 0 for no) */
  is_salable?: Maybe<Scalars['Int']['output']>;
  /** Magento product ID for the product */
  mageproduct_id?: Maybe<Scalars['String']['output']>;
  /** Name of the product */
  name?: Maybe<Scalars['String']['output']>;
  /** Price of the product */
  price?: Maybe<Scalars['String']['output']>;
  /** Stock Keeping Unit (SKU) for the product */
  sku?: Maybe<Scalars['String']['output']>;
  /** Type of the product (e.g., simple, configurable) */
  type?: Maybe<Scalars['String']['output']>;
  /** URL to the product page */
  url?: Maybe<Scalars['String']['output']>;
  /** Website ID where the product is listed */
  website_id?: Maybe<Scalars['String']['output']>;
};

/** An implementation of `ProductLinksInterface`. */
export type ProductLinks = ProductLinksInterface & {
  __typename?: 'ProductLinks';
  /** One of related, associated, upsell, or crosssell. */
  link_type?: Maybe<Scalars['String']['output']>;
  /** The SKU of the linked product. */
  linked_product_sku?: Maybe<Scalars['String']['output']>;
  /** The type of linked product (simple, virtual, bundle, downloadable, grouped, configurable). */
  linked_product_type?: Maybe<Scalars['String']['output']>;
  /** The position within the list of product links. */
  position?: Maybe<Scalars['Int']['output']>;
  /** The identifier of the linked product. */
  sku?: Maybe<Scalars['String']['output']>;
};

/** Contains information about linked products, including the link type and product type of each item. */
export type ProductLinksInterface = {
  /** One of related, associated, upsell, or crosssell. */
  link_type?: Maybe<Scalars['String']['output']>;
  /** The SKU of the linked product. */
  linked_product_sku?: Maybe<Scalars['String']['output']>;
  /** The type of linked product (simple, virtual, bundle, downloadable, grouped, configurable). */
  linked_product_type?: Maybe<Scalars['String']['output']>;
  /** The position within the list of product links. */
  position?: Maybe<Scalars['Int']['output']>;
  /** The identifier of the linked product. */
  sku?: Maybe<Scalars['String']['output']>;
};

/** Contains an image in base64 format and basic information about the image. */
export type ProductMediaGalleryEntriesContent = {
  __typename?: 'ProductMediaGalleryEntriesContent';
  /** The image in base64 format. */
  base64_encoded_data?: Maybe<Scalars['String']['output']>;
  /** The file name of the image. */
  name?: Maybe<Scalars['String']['output']>;
  /** The MIME type of the file, such as image/png. */
  type?: Maybe<Scalars['String']['output']>;
};

/** Contains a link to a video file and basic information about the video. */
export type ProductMediaGalleryEntriesVideoContent = {
  __typename?: 'ProductMediaGalleryEntriesVideoContent';
  /** Must be external-video. */
  media_type?: Maybe<Scalars['String']['output']>;
  /** A description of the video. */
  video_description?: Maybe<Scalars['String']['output']>;
  /** Optional data about the video. */
  video_metadata?: Maybe<Scalars['String']['output']>;
  /** Describes the video source. */
  video_provider?: Maybe<Scalars['String']['output']>;
  /** The title of the video. */
  video_title?: Maybe<Scalars['String']['output']>;
  /** The URL to the video. */
  video_url?: Maybe<Scalars['String']['output']>;
};

/** Represents a product price. */
export type ProductPrice = {
  __typename?: 'ProductPrice';
  /** The price discount. Represents the difference between the regular and final price. */
  discount?: Maybe<ProductDiscount>;
  /** The final price of the product after applying discounts. */
  final_price: Money;
  /** An array of the multiple Fixed Product Taxes that can be applied to a product price. */
  fixed_product_taxes?: Maybe<Array<Maybe<FixedProductTax>>>;
  /** The regular price of the product. */
  regular_price: Money;
};

/** Deprecated. Use `PriceRange` instead. Contains the regular price of an item, as well as its minimum and maximum prices. Only composite products, which include bundle, configurable, and grouped products, can contain a minimum and maximum price. */
export type ProductPrices = {
  __typename?: 'ProductPrices';
  /**
   * The highest possible final price for all the options defined within a composite product. If you are specifying a price range, this would be the `to` value.
   * @deprecated Use `PriceRange.maximum_price` instead.
   */
  maximalPrice?: Maybe<Price>;
  /**
   * The lowest possible final price for all the options defined within a composite product. If you are specifying a price range, this would be the `from` value.
   * @deprecated Use `PriceRange.minimum_price` instead.
   */
  minimalPrice?: Maybe<Price>;
  /**
   * The base price of a product.
   * @deprecated Use `regular_price` from `PriceRange.minimum_price` or `PriceRange.maximum_price` instead.
   */
  regularPrice?: Maybe<Price>;
};

export type ProductQtyConfirmed = {
  __typename?: 'ProductQtyConfirmed';
  /** Confirmed quantity for the product */
  qty?: Maybe<Scalars['Int']['output']>;
};

export type ProductQtyPending = {
  __typename?: 'ProductQtyPending';
  /** Pending quantity for the product */
  qty?: Maybe<Scalars['Int']['output']>;
};

export type ProductQtySold = {
  __typename?: 'ProductQtySold';
  /** Quantity of the product sold */
  qty?: Maybe<Scalars['Int']['output']>;
};

/** Contains details of a product review. */
export type ProductReview = {
  __typename?: 'ProductReview';
  /** The average of all ratings for this product. */
  average_rating: Scalars['Float']['output'];
  /** The date the review was created. */
  created_at: Scalars['String']['output'];
  /** The customer's nickname. Defaults to the customer name, if logged in. */
  nickname: Scalars['String']['output'];
  /** The reviewed product. */
  product: ProductInterface;
  /** An array of ratings by rating category, such as quality, price, and value. */
  ratings_breakdown: Array<Maybe<ProductReviewRating>>;
  /** The summary (title) of the review. */
  summary: Scalars['String']['output'];
  /** The review text. */
  text: Scalars['String']['output'];
};

/** Contains data about a single aspect of a product review. */
export type ProductReviewRating = {
  __typename?: 'ProductReviewRating';
  /** The label assigned to an aspect of a product that is being rated, such as quality or price. */
  name: Scalars['String']['output'];
  /** The rating value given by customer. By default, possible values range from 1 to 5. */
  value: Scalars['String']['output'];
};

/** Contains the reviewer's rating for a single aspect of a review. */
export type ProductReviewRatingInput = {
  /** An encoded rating ID. */
  id: Scalars['String']['input'];
  /** An encoded rating value ID. */
  value_id: Scalars['String']['input'];
};

/** Contains details about a single aspect of a product review. */
export type ProductReviewRatingMetadata = {
  __typename?: 'ProductReviewRatingMetadata';
  /** An encoded rating ID. */
  id: Scalars['String']['output'];
  /** The label assigned to an aspect of a product that is being rated, such as quality or price. */
  name: Scalars['String']['output'];
  /** List of product review ratings sorted by position. */
  values: Array<Maybe<ProductReviewRatingValueMetadata>>;
};

/** Contains details about a single value in a product review. */
export type ProductReviewRatingValueMetadata = {
  __typename?: 'ProductReviewRatingValueMetadata';
  /** A ratings scale, such as the number of stars awarded. */
  value: Scalars['String']['output'];
  /** An encoded rating value ID. */
  value_id: Scalars['String']['output'];
};

/** Contains an array of metadata about each aspect of a product review. */
export type ProductReviewRatingsMetadata = {
  __typename?: 'ProductReviewRatingsMetadata';
  /** An array of product reviews sorted by position. */
  items: Array<Maybe<ProductReviewRatingMetadata>>;
};

/** Contains an array of product reviews. */
export type ProductReviews = {
  __typename?: 'ProductReviews';
  /** An array of product reviews. */
  items: Array<Maybe<ProductReview>>;
  /** Metadata for pagination rendering. */
  page_info: SearchResultPageInfo;
};

/** Seller Info */
export type ProductSellerInfo = {
  __typename?: 'ProductSellerInfo';
  /** Seller Email */
  email?: Maybe<Scalars['String']['output']>;
  /** Seller Name */
  name?: Maybe<Scalars['String']['output']>;
};

/** Deprecated. Use `ProductAttributeSortInput` instead. Specifies the attribute to use for sorting search results and indicates whether the results are sorted in ascending or descending order. */
export type ProductSortInput = {
  /** The product's country of origin. */
  country_of_manufacture?: InputMaybe<SortEnum>;
  /** The timestamp indicating when the product was created. */
  created_at?: InputMaybe<SortEnum>;
  /** The name of a custom layout. */
  custom_layout?: InputMaybe<SortEnum>;
  /** XML code that is applied as a layout update to the product page. */
  custom_layout_update?: InputMaybe<SortEnum>;
  /** Detailed information about the product. The value can include simple HTML tags. */
  description?: InputMaybe<SortEnum>;
  /** Indicates whether a gift message is available. */
  gift_message_available?: InputMaybe<SortEnum>;
  /** Indicates whether additional attributes have been created for the product. */
  has_options?: InputMaybe<SortEnum>;
  /** The relative path to the main image on the product page. */
  image?: InputMaybe<SortEnum>;
  /** The label assigned to a product image. */
  image_label?: InputMaybe<SortEnum>;
  /** A number representing the product's manufacturer. */
  manufacturer?: InputMaybe<SortEnum>;
  /** A brief overview of the product for search results listings, maximum 255 characters. */
  meta_description?: InputMaybe<SortEnum>;
  /** A comma-separated list of keywords that are visible only to search engines. */
  meta_keyword?: InputMaybe<SortEnum>;
  /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
  meta_title?: InputMaybe<SortEnum>;
  /** The product name. Customers use this name to identify the product. */
  name?: InputMaybe<SortEnum>;
  /** The beginning date for new product listings, and determines if the product is featured as a new product. */
  news_from_date?: InputMaybe<SortEnum>;
  /** The end date for new product listings. */
  news_to_date?: InputMaybe<SortEnum>;
  /** If the product has multiple options, determines where they appear on the product page. */
  options_container?: InputMaybe<SortEnum>;
  /** The price of the item. */
  price?: InputMaybe<SortEnum>;
  /** Indicates whether the product has required options. */
  required_options?: InputMaybe<SortEnum>;
  /** A short description of the product. Its use depends on the theme. */
  short_description?: InputMaybe<SortEnum>;
  /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
  sku?: InputMaybe<SortEnum>;
  /** The relative path to the small image, which is used on catalog pages. */
  small_image?: InputMaybe<SortEnum>;
  /** The label assigned to a product's small image. */
  small_image_label?: InputMaybe<SortEnum>;
  /** The beginning date that a product has a special price. */
  special_from_date?: InputMaybe<SortEnum>;
  /** The discounted price of the product. */
  special_price?: InputMaybe<SortEnum>;
  /** The end date that a product has a special price. */
  special_to_date?: InputMaybe<SortEnum>;
  /** Indicates the criteria to sort swatches. */
  swatch_image?: InputMaybe<SortEnum>;
  /** The relative path to the product's thumbnail image. */
  thumbnail?: InputMaybe<SortEnum>;
  /** The label assigned to a product's thumbnail image. */
  thumbnail_label?: InputMaybe<SortEnum>;
  /** The price when tier pricing is in effect and the items purchased threshold has been reached. */
  tier_price?: InputMaybe<SortEnum>;
  /** The timestamp indicating when the product was updated. */
  updated_at?: InputMaybe<SortEnum>;
  /** The part of the URL that identifies the product */
  url_key?: InputMaybe<SortEnum>;
  url_path?: InputMaybe<SortEnum>;
  /** The weight of the item, in units defined by the store. */
  weight?: InputMaybe<SortEnum>;
};

/** This enumeration states whether a product stock status is in stock or out of stock */
export enum ProductStockStatus {
  InStock = 'IN_STOCK',
  OutOfStock = 'OUT_OF_STOCK'
}

/** Deprecated. Use `TierPrice` instead. Defines a tier price, which is a quantity discount offered to a specific customer group. */
export type ProductTierPrices = {
  __typename?: 'ProductTierPrices';
  /**
   * The ID of the customer group.
   * @deprecated Not relevant for the storefront.
   */
  customer_group_id?: Maybe<Scalars['String']['output']>;
  /**
   * The percentage discount of the item.
   * @deprecated Use `TierPrice.discount` instead.
   */
  percentage_value?: Maybe<Scalars['Float']['output']>;
  /**
   * The number of items that must be purchased to qualify for tier pricing.
   * @deprecated Use `TierPrice.quantity` instead.
   */
  qty?: Maybe<Scalars['Float']['output']>;
  /**
   * The price of the fixed price item.
   * @deprecated Use `TierPrice.final_price` instead.
   */
  value?: Maybe<Scalars['Float']['output']>;
  /**
   * The ID assigned to the website.
   * @deprecated Not relevant for the storefront.
   */
  website_id?: Maybe<Scalars['Float']['output']>;
};

/** Contains information about a product video. */
export type ProductVideo = MediaGalleryInterface & {
  __typename?: 'ProductVideo';
  /** Indicates whether the image is hidden from view. */
  disabled?: Maybe<Scalars['Boolean']['output']>;
  /** The file path of the media item. */
  file?: Maybe<Scalars['String']['output']>;
  /** The unique identifier of the media item. */
  id?: Maybe<Scalars['String']['output']>;
  /** The label of the product image or video. */
  label?: Maybe<Scalars['String']['output']>;
  /** The media item's position after it has been sorted. */
  position?: Maybe<Scalars['Int']['output']>;
  /** The URL of the product image or video. */
  url?: Maybe<Scalars['String']['output']>;
  /** Contains a `ProductMediaGalleryEntriesVideoContent` object. */
  video_content?: Maybe<ProductMediaGalleryEntriesVideoContent>;
};

/** The Products object is the top-level object returned in a product search. */
export type Products = {
  __typename?: 'Products';
  /** A bucket that contains the attribute code and label for each filterable option. */
  aggregations?: Maybe<Array<Maybe<Aggregation>>>;
  /** Applied filters */
  applied_filters?: Maybe<Array<Maybe<AppliedLayerFilter>>>;
  /**
   * Layered navigation filters array.
   * @deprecated Use `aggregations` instead.
   */
  filters?: Maybe<Array<Maybe<LayerFilter>>>;
  /** An array of products that match the specified search criteria. */
  items?: Maybe<Array<Maybe<ProductInterface>>>;
  /** An object that includes the page_info and currentPage values specified in the query. */
  page_info?: Maybe<SearchResultPageInfo>;
  /** An object that includes the default sort field and all available sort fields. */
  sort_fields?: Maybe<SortFields>;
  /** An array of search suggestions for case when search query have no results. */
  suggestions?: Maybe<Array<Maybe<SearchSuggestion>>>;
  /** The number of products that are marked as visible. By default, in complex products, parent products are visible, but their child products are not. */
  total_count?: Maybe<Scalars['Int']['output']>;
};


/** The Products object is the top-level object returned in a product search. */
export type ProductsAggregationsArgs = {
  filter?: InputMaybe<AggregationsFilterInput>;
};


/** The Products object is the top-level object returned in a product search. */
export type ProductsApplied_FiltersArgs = {
  filter?: InputMaybe<ProductAttributeFilterInput>;
};

/** Item Quantity Data */
export type QuantityData = {
  __typename?: 'QuantityData';
  /** Invoiced */
  Invoiced?: Maybe<Scalars['Int']['output']>;
  /** Ordered */
  Ordered?: Maybe<Scalars['Int']['output']>;
  /** Refunded */
  Refunded?: Maybe<Scalars['Int']['output']>;
  /** Shipped */
  Shipped?: Maybe<Scalars['Int']['output']>;
};

/** Product quantity and stock status data */
export type QuantityInput = {
  /** Indicates whether the product is in stock (1 = in stock, 0 = out of stock) */
  is_in_stock: Scalars['Int']['input'];
  /** Quantity of the product in stock */
  qty: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  /** Retrieve EAV attributes associated to a frontend form. Use countries query provided by DirectoryGraphQl module to retrieve region_id and country_id attribute options. */
  attributesForm: AttributesFormOutput;
  /** Returns a list of attributes metadata for a given entity type. */
  attributesList?: Maybe<AttributesMetadataOutput>;
  /** Get a list of available store views and their config information. */
  availableStores?: Maybe<Array<Maybe<StoreConfig>>>;
  /** Return information about the specified shopping cart. */
  cart?: Maybe<Cart>;
  /** Return a list of categories that match the specified filter. */
  categories?: Maybe<CategoryResult>;
  /**
   * Search for categories that match the criteria specified in the `search` and `filter` attributes.
   * @deprecated Use `categories` instead.
   */
  category?: Maybe<CategoryTree>;
  /**
   * Return an array of categories based on the specified filters.
   * @deprecated Use `categories` instead.
   */
  categoryList?: Maybe<Array<Maybe<CategoryTree>>>;
  /** Return Terms and Conditions configuration information. */
  checkoutAgreements?: Maybe<Array<Maybe<CheckoutAgreement>>>;
  /** Return information about CMS blocks. */
  cmsBlocks?: Maybe<CmsBlocks>;
  /** Return details about a CMS page. */
  cmsPage?: Maybe<CmsPage>;
  /** Return products that have been added to the specified compare list. */
  compareList?: Maybe<CompareList>;
  /** The countries query provides information for all countries. */
  countries?: Maybe<Array<Maybe<Country>>>;
  /** The countries query provides information for a single country. */
  country?: Maybe<Country>;
  /** Return information about the store's currency. */
  currency?: Maybe<Currency>;
  /**
   * Return the attribute type, given an attribute code and entity type.
   * @deprecated Use `customAttributeMetadataV2` query instead.
   */
  customAttributeMetadata?: Maybe<CustomAttributeMetadata>;
  /** Retrieve EAV attributes metadata. */
  customAttributeMetadataV2: AttributesMetadataOutput;
  /** Return detailed information about a customer account. */
  customer?: Maybe<Customer>;
  /** Return information about the customer's shopping cart. */
  customerCart: Cart;
  /** Return a list of downloadable products the customer has purchased. */
  customerDownloadableProducts?: Maybe<CustomerDownloadableProducts>;
  /** @deprecated Use the `customer` query instead. */
  customerOrders?: Maybe<CustomerOrders>;
  /** Return a list of customer payment tokens stored in the vault. */
  customerPaymentTokens?: Maybe<CustomerPaymentTokens>;
  /** Footer Links */
  footerLinks?: Maybe<Array<Maybe<FooterLinks>>>;
  getHomePageData?: Maybe<HomePageData>;
  /** Retrieve the secure PayPal URL for a Payments Pro Hosted Solution transaction. */
  getHostedProUrl?: Maybe<HostedProUrl>;
  /** Retrieve payment credentials for a transaction. Use this query for Payflow Link and Payments Advanced payment methods. */
  getPayflowLinkToken?: Maybe<PayflowLinkToken>;
  /** Retrieves the payment configuration for a given location */
  getPaymentConfig?: Maybe<PaymentConfigOutput>;
  /** Retrieves the payment details for the order */
  getPaymentOrder?: Maybe<PaymentOrderOutput>;
  /** Gets the payment SDK urls and values */
  getPaymentSDK?: Maybe<GetPaymentSdkOutput>;
  /** Returns the PDF header information for the authenticated seller. */
  getPdfHeaderInfo?: Maybe<SellerGetPdfHeaderInfo>;
  /** Return search suggestions */
  getSearchSuggestions?: Maybe<Array<Maybe<SearchSuggestionTerms>>>;
  /** Retrieves a list of products that match the specified `search` and `filter` criteria. */
  getSellerProduct?: Maybe<Products>;
  /** Returns reviews for a particular seller based on the seller's unique ID. */
  getSellerReview?: Maybe<SellerReview>;
  /** Returns detailed information for a specific review based on the review's unique ID. */
  getSellerReviewDetails?: Maybe<SellerReviewDetails>;
  getTestimonials?: Maybe<TestimonialsData>;
  /** Retrieves the vault configuration */
  getVaultConfig?: Maybe<VaultConfigOutput>;
  /** Retrieve guest order details based on number, email and billing last name. */
  guestOrder: CustomerOrder;
  /** Retrieve guest order details based on token. */
  guestOrderByToken: CustomerOrder;
  /** Check whether the specified email has already been used to create a customer account. */
  isEmailAvailable?: Maybe<IsEmailAvailableOutput>;
  isMarketplaceActive?: Maybe<Scalars['Boolean']['output']>;
  /** This Will Return Query of the marketpalce landing page */
  marketplaceLandingPage?: Maybe<MarketplaceLandingPage>;
  /** Returns all categories for Mega Menu */
  megaMenu?: Maybe<Array<Maybe<MenuItem>>>;
  /** Returns the configuration settings for marketplace reports. */
  mpReportConfig?: Maybe<MpConfig>;
  /** The pickup locations query searches for locations that match the search request requirements. */
  pickupLocations?: Maybe<PickupLocations>;
  /** Return the active ratings attributes and the values each rating can have. */
  productReviewRatingsMetadata: ProductReviewRatingsMetadata;
  /** Search for products that match the criteria specified in the `search` and `filter` attributes. */
  products?: Maybe<Products>;
  recaptchaFormConfig?: Maybe<ReCaptchaConfigOutput>;
  /** Returns details about Google reCAPTCHA V3-Invisible configuration. */
  recaptchaV3Config?: Maybe<ReCaptchaConfigurationV3>;
  /** Returns a list of related, cross-sell, or upsell products for the authenticated seller based on the provided filter. */
  relatedCrossUpsellList?: Maybe<RelatedCrossUpsellList>;
  /** Return the full details for a specified product, category, or CMS page. */
  route?: Maybe<RoutableInterface>;
  searchEngineRobots?: Maybe<SearchEngineRobots>;
  /** Returns the allowed product categories for the authenticated seller. */
  sellerAllowedProductCategory?: Maybe<SellerAllowedProductCategory>;
  /** Returns a list of allowed product types for the authenticated seller. */
  sellerAllowedProductType?: Maybe<Array<Maybe<SellerAllowedProductType>>>;
  /** Returns seller details based on the given product SKU. */
  sellerByProductSku?: Maybe<SellerDetailByProductSku>;
  /** Returns a list of attributes for configurable products based on the provided filter. */
  sellerConfigAttrList?: Maybe<SellerConfigAttrList>;
  /** Returns a list of credit memos for the specified order, with pagination. */
  sellerCreditmemoList?: Maybe<SellerCreditmemoList>;
  /** Returns a list of customers associated with the authenticated seller, with optional filtering and pagination. */
  sellerCustomer?: Maybe<SellerCustomer>;
  /** Returns total order statistics and other data for the seller's dashboard. */
  sellerDashboard?: Maybe<SellerDashboardData>;
  /** Returns seller details based on the given seller id. */
  sellerDetailsBySellerId?: Maybe<SellerDetailBySellerId>;
  /** Returns detailed information about a draft product based on the provided draft ID. */
  sellerDraftProductInfoById?: Maybe<SellerDraftProductInfo>;
  /** Returns a list of draft products for the authenticated seller based on the provided filter. */
  sellerDraftProductList?: Maybe<SellerDraftProductList>;
  /** Returns the earnings data for the authenticated seller based on the provided filter. */
  sellerEarnings?: Maybe<SellerEarnings>;
  /** Returns credit memo details for a given order and credit memo. Authentication is required to access this data. */
  sellerGetCreditmemoDetails?: Maybe<SellerGetCreditmemoDetails>;
  /** Returns invoice details for a given order and invoice. Authentication is required to access this data. */
  sellerGetInvoiceDetails?: Maybe<SellerGetInvoiceDetails>;
  /** Returns shipment details for a given order and shipment. Authentication is required to access this data. */
  sellerGetShipmentDetails?: Maybe<SellerGetShipmentDetails>;
  /** Returns the shop URL data of the authenticated seller. */
  sellerGetShopUrl?: Maybe<SellerGetShopUrl>;
  /** Returns a list of invoices for the specified order, with pagination. */
  sellerInvoiceList?: Maybe<SellerInvoiceList>;
  /** Returns sales details for the authenticated seller's orders. */
  sellerOrderSales?: Maybe<SellerOrderSales>;
  /** Returns detailed information about a specific order based on the provided order ID. */
  sellerOrderView?: Maybe<SellerOrderView>;
  /** Returns a list of orders for the authenticated seller based on the provided filter. */
  sellerOrdersList?: Maybe<SellerOrdersList>;
  /** Returns the product attribute set configuration data for the authenticated seller based on the product ID. */
  sellerProductAttributeSet?: Maybe<Array<Maybe<SellerProductAttributeSet>>>;
  /** Returns a paginated list of products for the authenticated seller, with optional filtering by product type and other attributes. */
  sellerProductList?: Maybe<SellerProductList>;
  /** Returns the profile data of the authenticated seller. */
  sellerProfile?: Maybe<SellerProfile>;
  /** Returns a list of news published by the seller, managed by the admin, with pagination. */
  sellerPublishedNewsList?: Maybe<SellerPublishedNewsList>;
  /** Returns products for the authenticated seller. Authentication is required to access this data. */
  sellerSelfProduct?: Maybe<SellerSelfProduct>;
  /** Returns the list of self-reviews for the authenticated seller based on the provided filter. */
  sellerSelfReviewList?: Maybe<SellerSelfReviewList>;
  /** Returns a list of shipments for the specified order, with pagination. */
  sellerShipmentList?: Maybe<SellerShipmentList>;
  /** Returns detailed information about a specific transaction for the authenticated seller. */
  sellerTransactionView?: Maybe<SellerTransactionView>;
  /** Returns a list of transactions for the authenticated seller. */
  sellerTransactions?: Maybe<SellerTransactions>;
  /** Returns a list of marketplace sellers. */
  sellersList?: Maybe<SellersList>;
  /** Return details about the store's configuration. */
  storeConfig?: Maybe<StoreConfig>;
  /**
   * Return the relative URL for a specified product, category or CMS page.
   * @deprecated Use the `route` query instead.
   */
  urlResolver?: Maybe<EntityUrl>;
  /** Return checkout admin configuration flags. */
  voguishCheckoutConfig?: Maybe<VoguishCheckoutConfig>;
  /**
   * Return the contents of a customer's wish list.
   * @deprecated Moved under `Customer.wishlist`.
   */
  wishlist?: Maybe<WishlistOutput>;
};


export type QueryAttributesFormArgs = {
  formCode: Scalars['String']['input'];
};


export type QueryAttributesListArgs = {
  entityType: AttributeEntityTypeEnum;
  filters?: InputMaybe<AttributeFilterInput>;
};


export type QueryAvailableStoresArgs = {
  useCurrentGroup?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryCartArgs = {
  cart_id: Scalars['String']['input'];
};


export type QueryCategoriesArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<CategoryFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCategoryArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCategoryListArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<CategoryFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCmsBlocksArgs = {
  identifiers?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryCmsPageArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCompareListArgs = {
  uid: Scalars['ID']['input'];
};


export type QueryCountryArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCustomAttributeMetadataArgs = {
  attributes: Array<AttributeInput>;
};


export type QueryCustomAttributeMetadataV2Args = {
  attributes?: InputMaybe<Array<AttributeInput>>;
};


export type QueryGetHostedProUrlArgs = {
  input: HostedProUrlInput;
};


export type QueryGetPayflowLinkTokenArgs = {
  input: PayflowLinkTokenInput;
};


export type QueryGetPaymentConfigArgs = {
  location: PaymentLocation;
};


export type QueryGetPaymentOrderArgs = {
  cartId: Scalars['String']['input'];
  id: Scalars['String']['input'];
};


export type QueryGetPaymentSdkArgs = {
  location: PaymentLocation;
};


export type QueryGetSearchSuggestionsArgs = {
  query: Scalars['String']['input'];
};


export type QueryGetSellerProductArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<ProductAttributeFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<ProductAttributeSortInput>;
};


export type QueryGetSellerReviewArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetSellerReviewDetailsArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetTestimonialsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort_order?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGuestOrderArgs = {
  input: OrderInformationInput;
};


export type QueryGuestOrderByTokenArgs = {
  input: OrderTokenInput;
};


export type QueryIsEmailAvailableArgs = {
  email: Scalars['String']['input'];
};


export type QueryPickupLocationsArgs = {
  area?: InputMaybe<AreaInput>;
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<PickupLocationFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  productsInfo?: InputMaybe<Array<InputMaybe<ProductInfoInput>>>;
  sort?: InputMaybe<PickupLocationSortInput>;
};


export type QueryProductsArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<ProductAttributeFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<ProductAttributeSortInput>;
};


export type QueryRecaptchaFormConfigArgs = {
  formType: ReCaptchaFormEnum;
};


export type QueryRelatedCrossUpsellListArgs = {
  filter: SellerCrossUpsellInputFilter;
};


export type QueryRouteArgs = {
  url: Scalars['String']['input'];
};


export type QuerySellerByProductSkuArgs = {
  productSku?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySellerConfigAttrListArgs = {
  filter?: InputMaybe<SellerConfigAttrInputFilter>;
};


export type QuerySellerCreditmemoListArgs = {
  curPage: Scalars['Int']['input'];
  orderId: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};


export type QuerySellerCustomerArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySellerDetailsBySellerIdArgs = {
  sellerId: Scalars['Int']['input'];
};


export type QuerySellerDraftProductInfoByIdArgs = {
  draftId: Scalars['Int']['input'];
};


export type QuerySellerDraftProductListArgs = {
  filter?: InputMaybe<SellerDraftProductInputFilter>;
};


export type QuerySellerEarningsArgs = {
  filter: SellerEarningFilter;
};


export type QuerySellerGetCreditmemoDetailsArgs = {
  creditmemoId?: InputMaybe<Scalars['Int']['input']>;
  orderId?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySellerGetInvoiceDetailsArgs = {
  invoiceId?: InputMaybe<Scalars['Int']['input']>;
  orderId?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySellerGetShipmentDetailsArgs = {
  orderId?: InputMaybe<Scalars['Int']['input']>;
  shipmentId?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySellerInvoiceListArgs = {
  curPage: Scalars['Int']['input'];
  orderId: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};


export type QuerySellerOrderViewArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySellerOrdersListArgs = {
  filter: OrderInput;
};


export type QuerySellerProductListArgs = {
  curPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<ProductFilter>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  type: Scalars['String']['input'];
};


export type QuerySellerPublishedNewsListArgs = {
  curPage?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySellerSelfReviewListArgs = {
  filter?: InputMaybe<SellerSelfReviewFilter>;
};


export type QuerySellerShipmentListArgs = {
  curPage: Scalars['Int']['input'];
  orderId: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};


export type QuerySellerTransactionViewArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySellerTransactionsArgs = {
  filter?: InputMaybe<TransactionFilter>;
};


export type QuerySellersListArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<SellerFilters>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUrlResolverArgs = {
  url: Scalars['String']['input'];
};

/** Specifies the field to use for sorting quote items */
export type QuoteItemsSortInput = {
  /** Specifies the quote items field to sort by */
  field: SortQuoteItemsEnum;
  /** Specifies the order of quote items' sorting */
  order: SortEnum;
};

/** Rating details for a seller, including star ratings for each level */
export type Rating = {
  __typename?: 'Rating';
  /** Percentage of 1-star ratings */
  star1?: Maybe<Scalars['Float']['output']>;
  /** Percentage of 2-star ratings */
  star2?: Maybe<Scalars['Float']['output']>;
  /** Percentage of 3-star ratings */
  star3?: Maybe<Scalars['Float']['output']>;
  /** Percentage of 4-star ratings */
  star4?: Maybe<Scalars['Float']['output']>;
  /** Percentage of 5-star ratings */
  star5?: Maybe<Scalars['Float']['output']>;
};

export type ReCaptchaConfigOutput = {
  __typename?: 'ReCaptchaConfigOutput';
  /** Configuration details for reCaptcha type */
  configurations?: Maybe<ReCaptchaConfiguration>;
  /** Indicates whether reCaptcha type is enabled */
  is_enabled: Scalars['Boolean']['output'];
};

/** Contains reCAPTCHA form configuration details. */
export type ReCaptchaConfiguration = {
  __typename?: 'ReCaptchaConfiguration';
  /** The position of the invisible reCAPTCHA badge on each page. */
  badge_position?: Maybe<Scalars['String']['output']>;
  /** A two-character code that specifies the language that is used for Google reCAPTCHA text and messaging. */
  language_code?: Maybe<Scalars['String']['output']>;
  /** The minimum score that identifies a user interaction as a potential risk. */
  minimum_score?: Maybe<Scalars['Float']['output']>;
  re_captcha_type: ReCaptchaTypeEmum;
  /** The message that appears when reCaptcha fails. */
  technical_failure_message: Scalars['String']['output'];
  /** Theme to be used to render reCaptcha. */
  theme: Scalars['String']['output'];
  /** The message that appears to the user if validation fails. */
  validation_failure_message: Scalars['String']['output'];
  /** The website key generated when the Google reCAPTCHA account was registered. */
  website_key: Scalars['String']['output'];
};

/** Contains reCAPTCHA V3-Invisible configuration details. */
export type ReCaptchaConfigurationV3 = {
  __typename?: 'ReCaptchaConfigurationV3';
  /** The position of the invisible reCAPTCHA badge on each page. */
  badge_position: Scalars['String']['output'];
  /** The message that appears to the user if validation fails. */
  failure_message: Scalars['String']['output'];
  /** A list of forms on the storefront that have been configured to use reCAPTCHA V3. */
  forms: Array<Maybe<ReCaptchaFormEnum>>;
  /** Return whether recaptcha is enabled or not */
  is_enabled: Scalars['Boolean']['output'];
  /** A two-character code that specifies the language that is used for Google reCAPTCHA text and messaging. */
  language_code?: Maybe<Scalars['String']['output']>;
  /** The minimum score that identifies a user interaction as a potential risk. */
  minimum_score: Scalars['Float']['output'];
  /** Theme to be used to render reCaptcha. */
  theme: Scalars['String']['output'];
  /** The website key generated when the Google reCAPTCHA account was registered. */
  website_key: Scalars['String']['output'];
};

export enum ReCaptchaFormEnum {
  Braintree = 'BRAINTREE',
  Contact = 'CONTACT',
  CustomerCreate = 'CUSTOMER_CREATE',
  CustomerEdit = 'CUSTOMER_EDIT',
  CustomerForgotPassword = 'CUSTOMER_FORGOT_PASSWORD',
  CustomerLogin = 'CUSTOMER_LOGIN',
  Newsletter = 'NEWSLETTER',
  PlaceOrder = 'PLACE_ORDER',
  ProductReview = 'PRODUCT_REVIEW',
  ResendConfirmationEmail = 'RESEND_CONFIRMATION_EMAIL',
  Sendfriend = 'SENDFRIEND'
}

export enum ReCaptchaTypeEmum {
  Invisible = 'INVISIBLE',
  Recaptcha = 'RECAPTCHA',
  RecaptchaV3 = 'RECAPTCHA_V3'
}

export type RecentlyViewedProducts = {
  __typename?: 'RecentlyViewedProducts';
  /** Description */
  description?: Maybe<Scalars['String']['output']>;
  /** Recently Viewed Product List */
  productList?: Maybe<Array<Maybe<ProductItem>>>;
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
};

export type Region = {
  __typename?: 'Region';
  /** The two-letter code for the region, such as TX for Texas. */
  code?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `Region` object. */
  id?: Maybe<Scalars['Int']['output']>;
  /** The name of the region, such as Texas. */
  name?: Maybe<Scalars['String']['output']>;
};

export type RelatedCrossUpsellInput = {
  /** The attribute set to which the product belongs */
  attribute_set?: InputMaybe<Scalars['String']['input']>;
  /** Unique identifier for the product */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Name of the product */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Position of the product in the list (e.g., for sorting) */
  position?: InputMaybe<Scalars['Int']['input']>;
  /** Price of the product */
  price?: InputMaybe<Scalars['String']['input']>;
  /** Record identifier of the product in the database */
  record_id?: InputMaybe<Scalars['Int']['input']>;
  /** Stock Keeping Unit (SKU) identifier of the product */
  sku?: InputMaybe<Scalars['String']['input']>;
  /** Current status of the product (e.g., 'enabled', 'disabled') */
  status?: InputMaybe<Scalars['String']['input']>;
  /** URL of the product's thumbnail image */
  thumbnail?: InputMaybe<Scalars['String']['input']>;
};

export type RelatedCrossUpsellItems = {
  __typename?: 'RelatedCrossUpsellItems';
  /** The attribute set associated with the product. */
  attribute_set?: Maybe<Scalars['String']['output']>;
  /** Indicates if the product is a cross-sell product. */
  crosssell?: Maybe<Scalars['Boolean']['output']>;
  /** The unique identifier for the related, cross-sell, or upsell product. */
  id?: Maybe<Scalars['Int']['output']>;
  /** The name of the related, cross-sell, or upsell product. */
  name?: Maybe<Scalars['String']['output']>;
  /** The price of the related, cross-sell, or upsell product. */
  price?: Maybe<Scalars['String']['output']>;
  /** The formatted price (e.g., with the currency symbol). */
  price_formatted?: Maybe<Scalars['String']['output']>;
  /** Indicates if the product is a related product. */
  related?: Maybe<Scalars['Boolean']['output']>;
  /** The SKU (Stock Keeping Unit) of the related product. */
  sku?: Maybe<Scalars['String']['output']>;
  /** The status of the product */
  status?: Maybe<Scalars['String']['output']>;
  /** URL to the thumbnail image of the product. */
  thumbnail?: Maybe<Scalars['String']['output']>;
  /** The type of the product (e.g., 'simple', 'configurable'). */
  type?: Maybe<Scalars['String']['output']>;
  /** Indicates if the product is an upsell product. */
  upsell?: Maybe<Scalars['Boolean']['output']>;
};

export type RelatedCrossUpsellList = {
  __typename?: 'RelatedCrossUpsellList';
  /** A list of related, cross-sell, or upsell items. */
  items?: Maybe<Array<Maybe<RelatedCrossUpsellItems>>>;
  /** The total number of related, cross-sell, or upsell items. */
  total_count?: Maybe<Scalars['Int']['output']>;
};

/** Specifies the cart from which to remove a coupon. */
export type RemoveCouponFromCartInput = {
  /** The unique ID of a `Cart` object. */
  cart_id: Scalars['String']['input'];
};

/** Contains details about the cart after removing a coupon. */
export type RemoveCouponFromCartOutput = {
  __typename?: 'RemoveCouponFromCartOutput';
  /** The cart after removing a coupon. */
  cart?: Maybe<Cart>;
};

/** Specifies which items to remove from the cart. */
export type RemoveItemFromCartInput = {
  /** The unique ID of a `Cart` object. */
  cart_id: Scalars['String']['input'];
  /** Deprecated. Use `cart_item_uid` instead. */
  cart_item_id?: InputMaybe<Scalars['Int']['input']>;
  /** Required field. The unique ID for a `CartItemInterface` object. */
  cart_item_uid?: InputMaybe<Scalars['ID']['input']>;
};

/** Contains details about the cart after removing an item. */
export type RemoveItemFromCartOutput = {
  __typename?: 'RemoveItemFromCartOutput';
  /** The cart after removing an item. */
  cart: Cart;
};

/** Defines which products to remove from a compare list. */
export type RemoveProductsFromCompareListInput = {
  /** An array of product IDs to remove from the compare list. */
  products: Array<InputMaybe<Scalars['ID']['input']>>;
  /** The unique identifier of the compare list to modify. */
  uid: Scalars['ID']['input'];
};

/** Contains the customer's wish list and any errors encountered. */
export type RemoveProductsFromWishlistOutput = {
  __typename?: 'RemoveProductsFromWishlistOutput';
  /** An array of errors encountered while deleting products from a wish list. */
  user_errors: Array<Maybe<WishListUserInputError>>;
  /** Contains the wish list with after items were successfully deleted. */
  wishlist: Wishlist;
};

/** Contains the cart and any errors after adding products. */
export type ReorderItemsOutput = {
  __typename?: 'ReorderItemsOutput';
  /** Detailed information about the customer's cart. */
  cart: Cart;
  /** An array of reordering errors. */
  userInputErrors: Array<Maybe<CheckoutUserInputError>>;
};

/** Report Flags Labels for various report reasons */
export type ReportFlags = {
  __typename?: 'ReportFlags';
  /** Unique identifier for the report reason */
  id?: Maybe<Scalars['String']['output']>;
  /** Label or name describing the report reason */
  label?: Maybe<Scalars['String']['output']>;
};

/** Report a product for violation of marketplace rules */
export type ReportProduct = {
  __typename?: 'ReportProduct';
  /** Message or reason for reporting the product */
  message?: Maybe<Scalars['String']['output']>;
  /** Status of the product report (true/false) */
  status?: Maybe<Scalars['Boolean']['output']>;
};

/** Report a seller for violating marketplace guidelines */
export type ReportSeller = {
  __typename?: 'ReportSeller';
  /** Message or reason for reporting the seller */
  message?: Maybe<Scalars['String']['output']>;
  /** Status of the report submission (true/false) */
  status?: Maybe<Scalars['Boolean']['output']>;
};

/** Individual review details for a seller's product or service */
export type ReviewItems = {
  __typename?: 'ReviewItems';
  /** Notification status for the admin regarding the review */
  admin_notification?: Maybe<Scalars['String']['output']>;
  /** Email address of the buyer who left the review */
  buyer_email?: Maybe<Scalars['String']['output']>;
  /** ID of the buyer who left the review */
  buyer_id?: Maybe<Scalars['String']['output']>;
  /** Date and time when the review was created */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Unique identifier for the review entity */
  entity_id?: Maybe<Scalars['String']['output']>;
  /** Nickname of the buyer who left the review */
  feed_nickname?: Maybe<Scalars['String']['output']>;
  /** Rating for the price of the product */
  feed_price?: Maybe<Scalars['String']['output']>;
  /** Rating for the quality of the product */
  feed_quality?: Maybe<Scalars['String']['output']>;
  /** Detailed content of the buyer's review */
  feed_review?: Maybe<Scalars['String']['output']>;
  /** Summary or headline of the buyer's review */
  feed_summary?: Maybe<Scalars['String']['output']>;
  /** Rating for the value of the product */
  feed_value?: Maybe<Scalars['String']['output']>;
  /** ID of the seller being reviewed */
  seller_id?: Maybe<Scalars['String']['output']>;
  /** Notification status for pending seller reviews */
  seller_pending_notification?: Maybe<Scalars['String']['output']>;
  /** Current status of the review (e.g., approved, pending) */
  status?: Maybe<Scalars['String']['output']>;
  /** Date and time when the review was last updated */
  updated_at?: Maybe<Scalars['String']['output']>;
};

/** Contains the result of a request to revoke a customer token. */
export type RevokeCustomerTokenOutput = {
  __typename?: 'RevokeCustomerTokenOutput';
  /** The result of a request to revoke a customer token. */
  result: Scalars['Boolean']['output'];
};

/** Routable entities serve as the model for a rendered page. */
export type RoutableInterface = {
  /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
  redirect_code: Scalars['Int']['output'];
  /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
  relative_url?: Maybe<Scalars['String']['output']>;
  /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
  type?: Maybe<UrlRewriteEntityTypeEnum>;
};

/** Default implementation of RoutableInterface. This type is returned when the URL is not linked to an entity. */
export type RoutableUrl = RoutableInterface & {
  __typename?: 'RoutableUrl';
  /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
  redirect_code: Scalars['Int']['output'];
  /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
  relative_url?: Maybe<Scalars['String']['output']>;
  /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
  type?: Maybe<UrlRewriteEntityTypeEnum>;
};

/** Defines the name and value of a SDK parameter */
export type SdkParams = {
  __typename?: 'SDKParams';
  /** The name of the SDK parameter */
  name?: Maybe<Scalars['String']['output']>;
  /** The value of the SDK parameter */
  value?: Maybe<Scalars['String']['output']>;
};

/** Total sale data for the seller */
export type SaleData = {
  __typename?: 'SaleData';
  /** Commission paid to the marketplace */
  commission_paid?: Maybe<Scalars['String']['output']>;
  /** Formatted commission paid amount */
  commission_paid_formatted?: Maybe<Scalars['String']['output']>;
  /** Graph data for total sales */
  graph_data?: Maybe<Scalars['String']['output']>;
  /** Graphical value for total sales */
  graphx_value?: Maybe<Scalars['String']['output']>;
  /** Percentage comparison for sales data */
  percent_compare?: Maybe<Scalars['Float']['output']>;
  /** Remaining payout amount */
  remaining_payout?: Maybe<Scalars['String']['output']>;
  /** Formatted remaining payout amount */
  remaining_payout_formatted?: Maybe<Scalars['String']['output']>;
  /** Total payout amount */
  total_payout?: Maybe<Scalars['String']['output']>;
  /** Formatted total payout amount */
  total_payout_formatted?: Maybe<Scalars['String']['output']>;
  /** Total sales amount */
  total_sale?: Maybe<Scalars['String']['output']>;
  /** Formatted total sales amount */
  total_sale_formatted?: Maybe<Scalars['String']['output']>;
};

/** Contains details about a comment. */
export type SalesCommentItem = {
  __typename?: 'SalesCommentItem';
  /** The text of the message. */
  message: Scalars['String']['output'];
  /** The timestamp of the comment. */
  timestamp: Scalars['String']['output'];
};

export type SalesItemInterface = {
  __typename?: 'SalesItemInterface';
  /** The entered gift message for the order item */
  gift_message?: Maybe<GiftMessage>;
};

/** Individual sales details for a seller's order */
export type SalesItems = {
  __typename?: 'SalesItems';
  /** Shipping carrier used for the sale */
  carrier_name?: Maybe<Scalars['String']['output']>;
  /** Coupon discount applied to the sale */
  coupon_amount?: Maybe<Scalars['String']['output']>;
  /** Date and time when the sale was created */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Credit memo ID associated with the sale */
  creditmemo_id?: Maybe<Scalars['String']['output']>;
  /** Unique identifier for the sales entity */
  entity_id?: Maybe<Scalars['String']['output']>;
  /** Invoice ID associated with the sale */
  invoice_id?: Maybe<Scalars['String']['output']>;
  /** Indicates whether the sale has been canceled (1 for yes, 0 for no) */
  is_canceled?: Maybe<Scalars['String']['output']>;
  /** ID of the order associated with the sale */
  order_id?: Maybe<Scalars['String']['output']>;
  /** Current status of the order (e.g., pending, shipped, completed) */
  order_status?: Maybe<Scalars['String']['output']>;
  /** Comma-separated list of product IDs in the order */
  product_ids?: Maybe<Scalars['String']['output']>;
  /** Amount of the coupon refunded during returns */
  refunded_coupon_amount?: Maybe<Scalars['String']['output']>;
  /** Refunded shipping charges */
  refunded_shipping_charges?: Maybe<Scalars['String']['output']>;
  /** ID of the seller for the sale */
  seller_id?: Maybe<Scalars['String']['output']>;
  /** Notification status for pending seller sale updates */
  seller_pending_notification?: Maybe<Scalars['String']['output']>;
  /** Shipment ID associated with the sale */
  shipment_id?: Maybe<Scalars['String']['output']>;
  /** Shipping charges for the sale */
  shipping_charges?: Maybe<Scalars['String']['output']>;
  /** Tax amount that should be paid to the seller */
  tax_to_seller?: Maybe<Scalars['String']['output']>;
  /** Total tax amount for the sale */
  total_tax?: Maybe<Scalars['String']['output']>;
  /** Tracking number for the shipment */
  tracking_number?: Maybe<Scalars['String']['output']>;
  /** Date and time when the sale was last updated */
  updated_at?: Maybe<Scalars['String']['output']>;
};

export type SampleDownloadData = {
  /** File associated with the sample */
  file?: InputMaybe<Scalars['String']['input']>;
  /** Type associated with the sample file or url */
  type?: InputMaybe<Scalars['String']['input']>;
  /** URL to access the downloadable sample */
  url?: InputMaybe<Scalars['String']['input']>;
};

export type SampleLinks = {
  /** File path or URL for the downloadable sample */
  file?: InputMaybe<Scalars['String']['input']>;
  /** Flag to indicate if the sample should be deleted (1: delete, 0: keep) */
  is_delete?: InputMaybe<Scalars['Int']['input']>;
  /** Unique identifier for the sample */
  sample_id?: InputMaybe<Scalars['Int']['input']>;
  /** Direct URL to access the downloadable sample */
  sample_url?: InputMaybe<Scalars['String']['input']>;
  /** Order in which the sample appears */
  sort_order?: InputMaybe<Scalars['Int']['input']>;
  /** Title of the sample */
  title?: InputMaybe<Scalars['String']['input']>;
  /** Type of the sample (e.g., PDF, Video, etc.) */
  type?: InputMaybe<Scalars['String']['input']>;
};

export type SaveDraftProduct = {
  __typename?: 'SaveDraftProduct';
  /** Additional data related to the saved draft product, such as ID or reference */
  data?: Maybe<Scalars['String']['output']>;
  /** Message indicating success or failure of the draft product save operation */
  message?: Maybe<Scalars['String']['output']>;
  /** Indicates whether the draft product was successfully saved (true: success, false: failure) */
  status?: Maybe<Scalars['Boolean']['output']>;
};

export type SavePdfHeaderInfo = {
  __typename?: 'SavePdfHeaderInfo';
  /** Message indicating the result of the save operation */
  message?: Maybe<Scalars['String']['output']>;
  /** Status of the PDF header save operation */
  status?: Maybe<Scalars['Boolean']['output']>;
};

/** Response for saving the seller profile */
export type SaveSellerProfile = {
  __typename?: 'SaveSellerProfile';
  /** Message indicating the result of the profile save operation */
  message?: Maybe<Scalars['String']['output']>;
  /** Status of the seller profile save operation */
  status?: Maybe<Scalars['Boolean']['output']>;
};

/** This enumeration defines the scope type for customer orders. */
export enum ScopeTypeEnum {
  Global = 'GLOBAL',
  Store = 'STORE',
  Website = 'WEBSITE'
}

export type SearchEngineRobots = {
  __typename?: 'SearchEngineRobots';
  /** Custom Instructions robot.txt */
  customInstructions?: Maybe<Scalars['String']['output']>;
  /** default robot */
  defaultRobots?: Maybe<Scalars['String']['output']>;
};

/** Provides navigation for the query response. */
export type SearchResultPageInfo = {
  __typename?: 'SearchResultPageInfo';
  /** The specific page to return. */
  current_page?: Maybe<Scalars['Int']['output']>;
  /** The maximum number of items to return per page of results. */
  page_size?: Maybe<Scalars['Int']['output']>;
  /** The total number of pages in the response. */
  total_pages?: Maybe<Scalars['Int']['output']>;
};

/** A string that contains search suggestion */
export type SearchSuggestion = {
  __typename?: 'SearchSuggestion';
  /** The search suggestion of existing product. */
  search: Scalars['String']['output'];
};

export type SearchSuggestionTerms = {
  __typename?: 'SearchSuggestionTerms';
  /** Search Suggestions */
  terms?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** Contains details about a selected bundle option. */
export type SelectedBundleOption = {
  __typename?: 'SelectedBundleOption';
  /** @deprecated Use `uid` instead */
  id: Scalars['Int']['output'];
  /** The display name of the selected bundle product option. */
  label: Scalars['String']['output'];
  /** The type of selected bundle product option. */
  type: Scalars['String']['output'];
  /** The unique ID for a `SelectedBundleOption` object */
  uid: Scalars['ID']['output'];
  /** An array of selected bundle option values. */
  values: Array<Maybe<SelectedBundleOptionValue>>;
};

/** Contains details about a value for a selected bundle option. */
export type SelectedBundleOptionValue = {
  __typename?: 'SelectedBundleOptionValue';
  /** Use `uid` instead */
  id: Scalars['Int']['output'];
  /** The display name of the value for the selected bundle product option. */
  label: Scalars['String']['output'];
  /** The original price of the value for the selected bundle product option. */
  original_price: Money;
  /**
   * The price of the value for the selected bundle product option.
   * @deprecated Use priceV2 instead.
   */
  price: Scalars['Float']['output'];
  /** The price of the value for the selected bundle product option. */
  priceV2: Money;
  /** The quantity of the value for the selected bundle product option. */
  quantity: Scalars['Float']['output'];
  /** The unique ID for a `SelectedBundleOptionValue` object */
  uid: Scalars['ID']['output'];
};

/** Contains details about a selected configurable option. */
export type SelectedConfigurableOption = {
  __typename?: 'SelectedConfigurableOption';
  /** The unique ID for a `ConfigurableProductOptions` object. */
  configurable_product_option_uid: Scalars['ID']['output'];
  /** The unique ID for a `ConfigurableProductOptionsValues` object. */
  configurable_product_option_value_uid: Scalars['ID']['output'];
  /** @deprecated Use `SelectedConfigurableOption.configurable_product_option_uid` instead. */
  id: Scalars['Int']['output'];
  /** The display text for the option. */
  option_label: Scalars['String']['output'];
  /** @deprecated Use `SelectedConfigurableOption.configurable_product_option_value_uid` instead. */
  value_id: Scalars['Int']['output'];
  /** The display name of the selected configurable option. */
  value_label: Scalars['String']['output'];
};

/** Identifies a customized product that has been placed in a cart. */
export type SelectedCustomizableOption = {
  __typename?: 'SelectedCustomizableOption';
  /** The unique ID for a specific `CustomizableOptionInterface` object, such as a `CustomizableFieldOption`, `CustomizableFileOption`, or `CustomizableAreaOption` object. */
  customizable_option_uid: Scalars['ID']['output'];
  /** @deprecated Use `SelectedCustomizableOption.customizable_option_uid` instead. */
  id: Scalars['Int']['output'];
  /** Indicates whether the customizable option is required. */
  is_required: Scalars['Boolean']['output'];
  /** The display name of the selected customizable option. */
  label: Scalars['String']['output'];
  /** A value indicating the order to display this option. */
  sort_order: Scalars['Int']['output'];
  /** The type of `CustomizableOptionInterface` object. */
  type: Scalars['String']['output'];
  /** An array of selectable values. */
  values: Array<Maybe<SelectedCustomizableOptionValue>>;
};

/** Identifies the value of the selected customized option. */
export type SelectedCustomizableOptionValue = {
  __typename?: 'SelectedCustomizableOptionValue';
  /** The unique ID for a value object that corresponds to the object represented by the `customizable_option_uid` attribute. */
  customizable_option_value_uid: Scalars['ID']['output'];
  /** @deprecated Use `SelectedCustomizableOptionValue.customizable_option_value_uid` instead. */
  id: Scalars['Int']['output'];
  /** The display name of the selected value. */
  label: Scalars['String']['output'];
  /** The price of the selected customizable value. */
  price: CartItemSelectedOptionValuePrice;
  /** The text identifying the selected value. */
  value: Scalars['String']['output'];
};

/** Describes the payment method the shopper selected. */
export type SelectedPaymentMethod = {
  __typename?: 'SelectedPaymentMethod';
  /** The payment method code. */
  code: Scalars['String']['output'];
  /** The purchase order number. */
  purchase_order_number?: Maybe<Scalars['String']['output']>;
  /** The payment method title. */
  title: Scalars['String']['output'];
};

/** Contains details about the selected shipping method and carrier. */
export type SelectedShippingMethod = {
  __typename?: 'SelectedShippingMethod';
  /** The cost of shipping using this shipping method. */
  amount: Money;
  /** @deprecated The field should not be used on the storefront. */
  base_amount?: Maybe<Money>;
  /** A string that identifies a commercial carrier or an offline shipping method. */
  carrier_code: Scalars['String']['output'];
  /** The label for the carrier code. */
  carrier_title: Scalars['String']['output'];
  /** A shipping method code associated with a carrier. */
  method_code: Scalars['String']['output'];
  /** The label for the method code. */
  method_title: Scalars['String']['output'];
  /** The cost of shipping using this shipping method, excluding tax. */
  price_excl_tax: Money;
  /** The cost of shipping using this shipping method, including tax. */
  price_incl_tax: Money;
};

/** Activity data for the seller, including orders, reviews, and ratings */
export type SellerActivity = {
  __typename?: 'SellerActivity';
  /** Latest order data for the seller */
  latest_order?: Maybe<Array<Maybe<SellerLatestOrder>>>;
  /** Activity notifications related to the seller */
  seller_activity_notification?: Maybe<Array<Maybe<GetSellerActivity>>>;
  /** Latest review comments about the seller */
  seller_latest_review_comment?: Maybe<Array<Maybe<GetLatestCommentReview>>>;
  /** Overall rating for the seller */
  seller_rating?: Maybe<GetSellerRating>;
};

/** Seller Add Product Output */
export type SellerAddProduct = {
  __typename?: 'SellerAddProduct';
  /** Data */
  data?: Maybe<Scalars['String']['output']>;
  /** Message */
  message?: Maybe<Scalars['String']['output']>;
  /** Status */
  status?: Maybe<Scalars['Boolean']['output']>;
};

export type SellerAllowedProductCategory = {
  __typename?: 'SellerAllowedProductCategory';
  /** List of allowed category IDs for the authenticated seller. */
  category_ids?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type SellerAllowedProductType = {
  __typename?: 'SellerAllowedProductType';
  /** The human-readable label for the allowed product type. */
  label?: Maybe<Scalars['String']['output']>;
  /** The value representing the allowed product type. */
  value?: Maybe<Scalars['String']['output']>;
};

/** BecomePartner */
export type SellerBecomePartner = {
  __typename?: 'SellerBecomePartner';
  /** Message */
  message?: Maybe<Scalars['String']['output']>;
};

/** seller cancel order */
export type SellerCancelOrder = {
  __typename?: 'SellerCancelOrder';
  /** Message */
  message?: Maybe<Scalars['String']['output']>;
};

export type SellerConfigAttrInputFilter = {
  /** Filter by attribute code. */
  attribute_code?: InputMaybe<Scalars['String']['input']>;
  /** Filter by attribute ID. */
  attribute_id?: InputMaybe<Scalars['Int']['input']>;
  /** The current page of results to return. */
  cur_page?: InputMaybe<Scalars['Int']['input']>;
  /** Filter by attribute label displayed in the frontend. */
  frontend_label?: InputMaybe<Scalars['String']['input']>;
  /** Filter by whether the attribute is comparable. */
  is_comparable?: InputMaybe<Scalars['Int']['input']>;
  /** Filter by whether the attribute is required (1 for required, 0 for optional). */
  is_required?: InputMaybe<Scalars['Int']['input']>;
  /** Filter by whether the attribute is searchable. */
  is_searchable?: InputMaybe<Scalars['Int']['input']>;
  /** Filter by whether the attribute is user-defined. */
  is_user_defined?: InputMaybe<Scalars['Int']['input']>;
  /** Filter by whether the attribute is visible. */
  is_visible?: InputMaybe<Scalars['Int']['input']>;
  /** The maximum number of configuration attributes to return per page. */
  page_size?: InputMaybe<Scalars['Int']['input']>;
  /** Filter by attribute scope (e.g., 'global', 'store view'). */
  scope?: InputMaybe<Scalars['String']['input']>;
};

export type SellerConfigAttrList = {
  __typename?: 'SellerConfigAttrList';
  /** A list of seller's product configuration attributes. */
  items?: Maybe<Array<Maybe<SellerConfigAttrListItems>>>;
  /** The total count of configuration attributes available. */
  total_count?: Maybe<Scalars['Int']['output']>;
};

export type SellerConfigAttrListItems = {
  __typename?: 'SellerConfigAttrListItems';
  /** The status of actions related to this attribute (e.g., active, inactive). */
  action_status?: Maybe<Scalars['Boolean']['output']>;
  /** The unique code representing the attribute. */
  attribute_code?: Maybe<Scalars['String']['output']>;
  /** The unique ID of the attribute. */
  attribute_id?: Maybe<Scalars['Int']['output']>;
  /** The label displayed in the front end for the attribute. */
  frontend_label?: Maybe<Scalars['String']['output']>;
  /** Indicates if the attribute is comparable with other products. */
  is_comparable?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the attribute is required for the product. */
  is_required?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if the attribute is searchable. */
  is_searchable?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if the attribute is user-defined. */
  is_user_defined?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if the attribute is visible to the user. */
  is_visible?: Maybe<Scalars['Boolean']['output']>;
  /** The scope of the attribute (e.g., global, store view). */
  scope?: Maybe<Scalars['String']['output']>;
};

/** Seller create credit memo */
export type SellerCreateCreditmemo = {
  __typename?: 'SellerCreateCreditmemo';
  /** Credit memo id */
  id?: Maybe<Scalars['Int']['output']>;
  /** Response message */
  message?: Maybe<Scalars['String']['output']>;
  /** Status of the request */
  status?: Maybe<Scalars['Boolean']['output']>;
};

/** Seller creates an invoice for an order */
export type SellerCreateInvoice = {
  __typename?: 'SellerCreateInvoice';
  /** Unique identifier for the invoice */
  invoice_id?: Maybe<Scalars['String']['output']>;
  /** Message or description related to the invoice creation process */
  message?: Maybe<Scalars['String']['output']>;
  /** Indicates the success or failure of the invoice creation (true for success, false for failure) */
  status?: Maybe<Scalars['Boolean']['output']>;
};

/** Create shipment of Seller order */
export type SellerCreateShipment = {
  __typename?: 'SellerCreateShipment';
  /** Response Message */
  message?: Maybe<Scalars['String']['output']>;
  /** Status of the request */
  status?: Maybe<Scalars['Boolean']['output']>;
};

export type SellerCreditmemoList = {
  __typename?: 'SellerCreditmemoList';
  /** A list of credit memos issued by the seller. */
  items?: Maybe<Array<Maybe<CreditmemoListItem>>>;
};

export type SellerCrossUpsellInputFilter = {
  /** The ID of the attribute set associated with the product. */
  attribute_set_id?: InputMaybe<Scalars['Int']['input']>;
  /** The current page number for pagination. */
  cur_page?: InputMaybe<Scalars['Int']['input']>;
  /** Filter for products with IDs greater than or equal to this value. */
  id_from?: InputMaybe<Scalars['Int']['input']>;
  /** Filter for products with IDs less than or equal to this value. */
  id_to?: InputMaybe<Scalars['Int']['input']>;
  /** Filter by product name. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The maximum number of results per page. */
  page_size?: InputMaybe<Scalars['Int']['input']>;
  /** Filter for products with price greater than or equal to this value. */
  price_from?: InputMaybe<Scalars['Float']['input']>;
  /** Filter for products with price less than or equal to this value. */
  price_to?: InputMaybe<Scalars['Float']['input']>;
  /** The unique identifier for the product. */
  product_id?: InputMaybe<Scalars['Int']['input']>;
  /** The type of the product (e.g., simple, configurable). */
  product_type?: InputMaybe<Scalars['String']['input']>;
  /** Filter by SKU (Stock Keeping Unit). */
  sku?: InputMaybe<Scalars['String']['input']>;
  /** The status of the product */
  status?: InputMaybe<Scalars['Int']['input']>;
  /** The type of the product (e.g., 'related', 'upsell', 'cross-sell'). */
  type?: InputMaybe<Scalars['String']['input']>;
};

export type SellerCustomer = {
  __typename?: 'SellerCustomer';
  /** A list of the seller's customers. */
  customer_data?: Maybe<Array<Maybe<SellerCustomerData>>>;
  /** The total count of customers associated with the seller. */
  total_count?: Maybe<Scalars['Int']['output']>;
};

/** Get all the customers of the seller */
export type SellerCustomerData = {
  __typename?: 'SellerCustomerData';
  /** Address of the customer */
  address?: Maybe<Scalars['String']['output']>;
  /** Total purchase value by the customer */
  base_total?: Maybe<Scalars['String']['output']>;
  /** Contact number of the customer */
  contact_number?: Maybe<Scalars['String']['output']>;
  /** Unique identifier for the customer */
  customer_id?: Maybe<Scalars['String']['output']>;
  /** Email of the customer */
  email?: Maybe<Scalars['String']['output']>;
  /** Gender of the customer */
  gender?: Maybe<Scalars['String']['output']>;
  /** Name of the customer */
  name?: Maybe<Scalars['String']['output']>;
  /** Total number of orders placed by the customer */
  order_count?: Maybe<Scalars['Int']['output']>;
};

/** Filters to fetch seller customer data */
export type SellerCustomerFilters = {
  /** Filter by customer address */
  address?: InputMaybe<FilterTypeInput>;
  /** Filter by customer contact number */
  contact?: InputMaybe<FilterTypeInput>;
  /** Filter by customer email */
  email?: InputMaybe<FilterTypeInput>;
  /** Filter by customer gender */
  gender?: InputMaybe<FilterTypeInput>;
  /** Filter by customer name */
  name?: InputMaybe<FilterTypeInput>;
};

/** Get top selling product */
export type SellerDashboardData = {
  __typename?: 'SellerDashboardData';
  /** Seller Activity Data */
  seller_activity?: Maybe<SellerActivity>;
  /** Seller Report Data */
  seller_report?: Maybe<SellerReportData>;
  title?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};


/** Get top selling product */
export type SellerDashboardDataSeller_ReportArgs = {
  duration?: InputMaybe<SellerDataDuration>;
};

/** Dashboard data for total seller orders */
export type SellerDashboardTotalOrder = {
  __typename?: 'SellerDashboardTotalOrder';
  /** Total number of orders that have been cancelled */
  cancelled_order?: Maybe<Scalars['Int']['output']>;
  /** Total number of orders that are completed */
  complete_order?: Maybe<Scalars['Int']['output']>;
  /** Graph data for visualizing order trends */
  graph_data?: Maybe<Scalars['String']['output']>;
  /** Graphical value representation of total orders */
  graphx_value?: Maybe<Scalars['String']['output']>;
  /** Percentage comparison for the orders over time */
  percent_compare?: Maybe<Scalars['Float']['output']>;
  /** Total number of orders that are being processed */
  processing_order?: Maybe<Scalars['Int']['output']>;
  /** Total number of orders placed with the seller */
  total_order?: Maybe<Scalars['Int']['output']>;
};

/** Seller Items */
export type SellerData = {
  __typename?: 'SellerData';
  /** Admin Notification */
  admin_notification?: Maybe<Scalars['String']['output']>;
  /** Allowed Categories */
  allowed_categories?: Maybe<Scalars['String']['output']>;
  /** Background Width */
  background_width?: Maybe<Scalars['String']['output']>;
  /** Banner Pic */
  banner_pic?: Maybe<Scalars['String']['output']>;
  /** Company Description */
  company_description?: Maybe<Scalars['String']['output']>;
  /** Company Locality */
  company_locality?: Maybe<Scalars['String']['output']>;
  /** Contact Number */
  contact_number?: Maybe<Scalars['String']['output']>;
  /** Country Pic */
  country_pic?: Maybe<Scalars['String']['output']>;
  /** Created At */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Message */
  entity_id?: Maybe<Scalars['String']['output']>;
  /** Facebook id */
  facebook_id?: Maybe<Scalars['String']['output']>;
  /** Facebook id */
  fb_active?: Maybe<Scalars['String']['output']>;
  /** Fulfilment Image */
  fulfilment_image?: Maybe<Scalars['String']['output']>;
  /** Fulfilment text */
  fulfilment_text?: Maybe<Scalars['String']['output']>;
  /** Gplus active status */
  gplus_active?: Maybe<Scalars['String']['output']>;
  /** Gplus id */
  gplus_id?: Maybe<Scalars['String']['output']>;
  /** Instagram active status */
  instagram_active?: Maybe<Scalars['String']['output']>;
  /** Instagram id */
  instagram_id?: Maybe<Scalars['String']['output']>;
  /** is seller */
  is_seller?: Maybe<Scalars['String']['output']>;
  /** Logo Pic */
  logo_pic?: Maybe<Scalars['String']['output']>;
  /** Meta Description */
  meta_description?: Maybe<Scalars['String']['output']>;
  /** Meta Keyword */
  meta_keyword?: Maybe<Scalars['String']['output']>;
  /** Moleskine active status */
  moleskine_active?: Maybe<Scalars['String']['output']>;
  /** Twitter id */
  moleskine_id?: Maybe<Scalars['String']['output']>;
  /** Seller Order Count */
  order_count?: Maybe<Scalars['String']['output']>;
  /** Others info  */
  others_info?: Maybe<Scalars['String']['output']>;
  /** Payment Source */
  payment_source?: Maybe<Scalars['String']['output']>;
  /** Pinterest active status */
  pinterest_active?: Maybe<Scalars['String']['output']>;
  /** Pinterest id */
  pinterest_id?: Maybe<Scalars['String']['output']>;
  /** Privacy Policy */
  privacy_policy?: Maybe<Scalars['String']['output']>;
  /** Seller product Count */
  product_count?: Maybe<Scalars['String']['output']>;
  /** Return Policy */
  return_policy?: Maybe<Scalars['String']['output']>;
  /** Seller Total reviews */
  reviews?: Maybe<SellerTotalReviews>;
  /** seller id */
  seller_id?: Maybe<Scalars['String']['output']>;
  seller_info?: Maybe<ProductSellerInfo>;
  /** Seller Ratings */
  seller_rating?: Maybe<Scalars['String']['output']>;
  /** Shipping Policy */
  shipping_policy?: Maybe<Scalars['String']['output']>;
  /** Shop Title */
  shop_title?: Maybe<Scalars['String']['output']>;
  /** Shop Url */
  shop_url?: Maybe<Scalars['String']['output']>;
  /** Store Id */
  store_id?: Maybe<Scalars['String']['output']>;
  /** Tiktok Status */
  tiktok_active?: Maybe<Scalars['String']['output']>;
  /** Tiktok Id */
  tiktok_id?: Maybe<Scalars['String']['output']>;
  /** Twitter Active status */
  tw_active?: Maybe<Scalars['String']['output']>;
  /** Twitter id */
  twitter_id?: Maybe<Scalars['String']['output']>;
  /** Updated At */
  updated_at?: Maybe<Scalars['String']['output']>;
  /** Vimeo active status */
  vimeo_active?: Maybe<Scalars['String']['output']>;
  /** Vimeo id */
  vimeo_id?: Maybe<Scalars['String']['output']>;
  /** Youtube active status */
  youtube_active?: Maybe<Scalars['String']['output']>;
  /** Youtube id */
  youtube_id?: Maybe<Scalars['String']['output']>;
};

/** Time duration for seller data */
export type SellerDataDuration = {
  /** Start date for the report (e.g., '2024-01-01') */
  from?: InputMaybe<Scalars['String']['input']>;
  /** End date for the report (e.g., '2024-12-31') */
  to?: InputMaybe<Scalars['String']['input']>;
};

/** Seller Details By Products Sku */
export type SellerDetailByProductSku = {
  __typename?: 'SellerDetailByProductSku';
  /** Message */
  message?: Maybe<Scalars['String']['output']>;
  /** Seller Details */
  seller?: Maybe<SellerData>;
};

/** Seller Details By Products Sku */
export type SellerDetailBySellerId = {
  __typename?: 'SellerDetailBySellerId';
  /** Seller Details */
  sellerdetails?: Maybe<SellerData>;
};

export type SellerDraftProductInfo = {
  __typename?: 'SellerDraftProductInfo';
  /** The description or content of the draft product. */
  content?: Maybe<Scalars['String']['output']>;
  /** The creation date of the draft product. */
  created_at?: Maybe<Scalars['String']['output']>;
  /** The name of the draft product. */
  name?: Maybe<Scalars['String']['output']>;
  /** The price of the draft product. */
  price?: Maybe<Scalars['Float']['output']>;
  /** The formatted price of the draft product (e.g., with currency symbol). */
  price_formatted?: Maybe<Scalars['String']['output']>;
  /** The quantity of the draft product available. */
  qty?: Maybe<Scalars['Int']['output']>;
  /** The SKU (Stock Keeping Unit) of the draft product. */
  sku?: Maybe<Scalars['String']['output']>;
};

export type SellerDraftProductInputFilter = {
  /** Filter for products created from this date. */
  created_from?: InputMaybe<Scalars['String']['input']>;
  /** Filter for products created until this date. */
  created_to?: InputMaybe<Scalars['String']['input']>;
  /** The current page number for pagination. */
  cur_page?: InputMaybe<Scalars['Int']['input']>;
  /** Filter for products with IDs greater than or equal to this value. */
  id_from?: InputMaybe<Scalars['Int']['input']>;
  /** Filter for products with IDs less than or equal to this value. */
  id_to?: InputMaybe<Scalars['Int']['input']>;
  /** Filter by product name. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The maximum number of results to return per page. */
  page_size?: InputMaybe<Scalars['Int']['input']>;
  /** Filter for products with price equal to this value. */
  price?: InputMaybe<Scalars['Float']['input']>;
  /** Filter for products with the specified quantity. */
  qty?: InputMaybe<Scalars['Int']['input']>;
  /** Filter by product SKU. */
  sku?: InputMaybe<Scalars['String']['input']>;
};

export type SellerDraftProductList = {
  __typename?: 'SellerDraftProductList';
  /** A list of draft products for the authenticated seller. */
  items?: Maybe<Array<Maybe<DraftProductItems>>>;
  /** The total count of draft products. */
  total_count?: Maybe<Scalars['Int']['output']>;
};

export type SellerEarnings = {
  __typename?: 'SellerEarnings';
  /** The datasets representing the earnings data, such as date intervals. */
  datasets?: Maybe<Scalars['String']['output']>;
  /** A list of seller's earnings data with detailed breakdowns. */
  items?: Maybe<Array<Maybe<EarningItemList>>>;
  /** The labels for the earnings data */
  labels?: Maybe<Scalars['String']['output']>;
  /** The total count of earnings data entries available. */
  total_count?: Maybe<Scalars['Int']['output']>;
};

/** Filters to fetch sellers based on various parameters */
export type SellerFilters = {
  /** Filter by allowed product categories */
  allowed_categories?: InputMaybe<FilterTypeInput>;
  /** Filter by company locality */
  company_locality?: InputMaybe<FilterTypeInput>;
  /** Filter by contact number */
  contact_number?: InputMaybe<FilterTypeInput>;
  /** Filter by seller creation date */
  created_at?: InputMaybe<FilterTypeInput>;
  /** Filter by seller ID */
  entity_id?: InputMaybe<FilterTypeInput>;
  /** Filter by Facebook ID */
  facebook_id?: InputMaybe<FilterTypeInput>;
  /** Filter by Google Plus ID */
  gplus_id?: InputMaybe<FilterTypeInput>;
  /** Filter by Instagram ID */
  instagram_id?: InputMaybe<FilterTypeInput>;
  /** Filter by whether the entity is a seller */
  is_seller?: InputMaybe<FilterTypeInput>;
  /** Filter by Moleskine ID */
  moleskine_id?: InputMaybe<FilterTypeInput>;
  /** Filter by payment source */
  payment_source?: InputMaybe<FilterTypeInput>;
  /** Filter by Pinterest ID */
  pinterest_id?: InputMaybe<FilterTypeInput>;
  /** Filter by seller ID */
  seller_id?: InputMaybe<FilterTypeInput>;
  /** Filter by shop title */
  shop_title?: InputMaybe<FilterTypeInput>;
  /** Filter by shop URL */
  shop_url?: InputMaybe<FilterTypeInput>;
  /** Filter by Twitter ID */
  twitter_id?: InputMaybe<FilterTypeInput>;
  /** Filter by seller update date */
  updated_at?: InputMaybe<FilterTypeInput>;
  /** Filter by Vimeo ID */
  vimeo_id?: InputMaybe<FilterTypeInput>;
  /** Filter by YouTube ID */
  youtube_id?: InputMaybe<FilterTypeInput>;
};

/** Get seller creditmemo details */
export type SellerGetCreditmemoDetails = {
  __typename?: 'SellerGetCreditmemoDetails';
  /** billingAddressData */
  billingAddressData?: Maybe<BillingAddressData>;
  /** buyerData */
  buyerData?: Maybe<BuyerData>;
  /** items */
  items?: Maybe<Array<Maybe<ItemData>>>;
  /** mainHeading */
  mainHeading?: Maybe<Scalars['String']['output']>;
  /** orderData */
  orderData?: Maybe<OrderData>;
  /** paymentMethodData */
  paymentMethodData?: Maybe<PaymentMethodData>;
  /** send mail Action */
  sendmailAction?: Maybe<Scalars['String']['output']>;
  /** send mail Warning */
  sendmailWarning?: Maybe<Scalars['String']['output']>;
  /** shipping */
  shipping?: Maybe<ShippingData>;
  /** shippingAddressData */
  shippingAddressData?: Maybe<ShippingAddressData>;
  /** shippingMethodData */
  shippingMethodData?: Maybe<ShippingMethodData>;
  /** subHeading */
  subHeading?: Maybe<Scalars['String']['output']>;
  /** subtotal */
  subtotal?: Maybe<SubTotalData>;
  /** tax */
  tax?: Maybe<TaxData>;
  /** totalAdminComission */
  totalAdminComission?: Maybe<TotalAdminComission>;
  /** totalOrderedAmount */
  totalOrderedAmount?: Maybe<TotalOrderedAmount>;
  /** totalVendorAmount */
  totalVendorAmount?: Maybe<TotalVendorAmount>;
};

/** Seller Invoice Details */
export type SellerGetInvoiceDetails = {
  __typename?: 'SellerGetInvoiceDetails';
  /** Billing Address Data */
  billingAddressData?: Maybe<BillingAddressData>;
  /** Buyer Data */
  buyerData?: Maybe<BuyerData>;
  /** Items Data */
  items?: Maybe<Array<Maybe<ItemData>>>;
  /** Main Heading */
  mainHeading?: Maybe<Scalars['String']['output']>;
  /** Order Data */
  orderData?: Maybe<OrderData>;
  /** Payment Method Data */
  paymentMethodData?: Maybe<PaymentMethodData>;
  /** Sendmail Action */
  sendmailAction?: Maybe<Scalars['String']['output']>;
  /** Sendmail Warning */
  sendmailWarning?: Maybe<Scalars['String']['output']>;
  /** Shipping Data */
  shipping?: Maybe<ShippingData>;
  /** Shipping Address Data */
  shippingAddressData?: Maybe<ShippingAddressData>;
  /** Shipping Method Data */
  shippingMethodData?: Maybe<ShippingMethodData>;
  /** Sub Heading */
  subHeading?: Maybe<Scalars['String']['output']>;
  /** Subtotal Data */
  subtotal?: Maybe<SubTotalData>;
  /** Tax Data */
  tax?: Maybe<TaxData>;
  /** Total Admin Commission */
  totalAdminComission?: Maybe<TotalAdminComission>;
  /** Total Ordered Amount */
  totalOrderedAmount?: Maybe<TotalOrderedAmount>;
  /** Total Vendor Amount */
  totalVendorAmount?: Maybe<TotalVendorAmount>;
};

export type SellerGetPdfHeaderInfo = {
  __typename?: 'SellerGetPdfHeaderInfo';
  /** Additional information for the seller’s PDF header */
  othersInfo?: Maybe<Scalars['String']['output']>;
};

/** Contains the shipment details for a seller's order. */
export type SellerGetShipmentDetails = {
  __typename?: 'SellerGetShipmentDetails';
  /** Details about the billing address associated with the order. */
  billingAddressData?: Maybe<BillingAddressData>;
  /** Information about the buyer who placed the order. */
  buyerData?: Maybe<BuyerData>;
  /** A list of items included in the shipment. */
  items?: Maybe<Array<Maybe<ShippingItemData>>>;
  /** The main heading or title for the shipment details section. */
  mainHeading?: Maybe<Scalars['String']['output']>;
  /** Details about the order associated with the shipment. */
  orderData?: Maybe<OrderData>;
  /** Information about the payment method used for the order. */
  paymentMethodData?: Maybe<PaymentMethodData>;
  /** Action or endpoint for sending shipment-related emails. */
  sendmailAction?: Maybe<Scalars['String']['output']>;
  /** Warning message displayed during the email sending process. */
  sendmailWarning?: Maybe<Scalars['String']['output']>;
  /** Details about the shipping address for the order. */
  shippingAddressData?: Maybe<ShippingAddressData>;
  /** A list of shipping carriers available for the order. */
  shippingCarriers?: Maybe<Array<Maybe<ShippingCarriers>>>;
  /** Information about the shipping method used for the order. */
  shippingMethodData?: Maybe<ShippingMethodData>;
  /** The subheading or secondary title for the shipment details section. */
  subHeading?: Maybe<Scalars['String']['output']>;
};

/** Retrieves data related to the seller's shop URLs. */
export type SellerGetShopUrl = {
  __typename?: 'SellerGetShopUrl';
  /** The requested URL for the seller's collection. */
  collection_request_url?: Maybe<Scalars['String']['output']>;
  /** The target URL for the seller's collection. */
  collection_target_url?: Maybe<Scalars['String']['output']>;
  /** The requested URL for the seller's location. */
  location_request_url?: Maybe<Scalars['String']['output']>;
  /** The target URL for the seller's location. */
  location_target_url?: Maybe<Scalars['String']['output']>;
  /** The requested URL for the seller's policies. */
  policy_request_url?: Maybe<Scalars['String']['output']>;
  /** The requested URL for the seller's profile. */
  profile_request_url?: Maybe<Scalars['String']['output']>;
  /** The target URL for the seller's profile. */
  profile_target_url?: Maybe<Scalars['String']['output']>;
  /** The requested URL for the seller's reviews. */
  review_request_url?: Maybe<Scalars['String']['output']>;
  /** The target URL for the seller's reviews. */
  review_target_url?: Maybe<Scalars['String']['output']>;
};

export type SellerInvoiceList = {
  __typename?: 'SellerInvoiceList';
  /** A list of invoices issued by the seller. */
  items?: Maybe<Array<Maybe<InvoiceListingItem>>>;
};

/** Latest order data for the seller */
export type SellerLatestOrder = {
  __typename?: 'SellerLatestOrder';
  /** Amount received by the seller for the order */
  actual_seller_amount?: Maybe<Scalars['Float']['output']>;
  /** Formatted amount received by the seller */
  actual_seller_amount_formatted?: Maybe<Scalars['String']['output']>;
  /** Timestamp when the order was created */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Name of the customer who placed the order */
  customer_name?: Maybe<Scalars['String']['output']>;
  /** List of images related to the order */
  images?: Maybe<Array<Maybe<OrderImages>>>;
  /** ID of the product in the Magento system */
  mageproduct_id?: Maybe<Scalars['String']['output']>;
  /** Shipping address for the order */
  shipping_address?: Maybe<Scalars['String']['output']>;
  /** Current status of the order */
  status?: Maybe<Scalars['String']['output']>;
};

/** Seller Mail To Admin */
export type SellerMailToAdmin = {
  __typename?: 'SellerMailToAdmin';
  /** Message */
  message?: Maybe<Scalars['String']['output']>;
  /** Status */
  status?: Maybe<Scalars['Int']['output']>;
};

/** Mail To Seller */
export type SellerMailToSeller = {
  __typename?: 'SellerMailToSeller';
  /** Message */
  message?: Maybe<Scalars['String']['output']>;
};

export type SellerOrderItems = {
  __typename?: 'SellerOrderItems';
  /** The base total amount for the order, excluding discounts and taxes. */
  base_total?: Maybe<CurrencyInfo>;
  /** The name of the customer who placed the order. */
  customer?: Maybe<Scalars['String']['output']>;
  /** The unique entity ID for the order in the system. */
  entity_id?: Maybe<Scalars['Int']['output']>;
  /** The unique identifier for the order. */
  order_id?: Maybe<Scalars['String']['output']>;
  /** A list of products in the order. */
  products?: Maybe<Array<Maybe<OrdersProductInfo>>>;
  /** The total amount for the order, including discounts and taxes. */
  purchase_total?: Maybe<CurrencyInfo>;
  /** The date the order was placed. */
  purchased_on?: Maybe<Scalars['String']['output']>;
  /** The current status of the order (e.g., pending, completed, canceled). */
  status?: Maybe<Scalars['String']['output']>;
};

/** Details of the seller's order sales */
export type SellerOrderSales = {
  __typename?: 'SellerOrderSales';
  /** List of individual sales items for the seller */
  items?: Maybe<Array<Maybe<SalesItems>>>;
  /** Total number of sales for the seller */
  total_count?: Maybe<Scalars['Int']['output']>;
};

export type SellerOrderView = {
  __typename?: 'SellerOrderView';
  /** Information about the buyer of the order. */
  buyer_data?: Maybe<OrderBuyerInfo>;
  /** Indicates whether the order can be canceled. */
  can_cancel?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the order can be invoiced. */
  can_invoice?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the order can be emailed. */
  can_mail?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the order can be refunded. */
  can_refund?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the order can be shipped. */
  can_ship?: Maybe<Scalars['Boolean']['output']>;
  /** A list of credit memo IDs associated with the order. */
  creditmemo_ids?: Maybe<Scalars['String']['output']>;
  /** The date when the order was placed. */
  date?: Maybe<Scalars['String']['output']>;
  /** The discount applied to the order. */
  discount?: Maybe<OrderViewData>;
  /** A list of invoice IDs associated with the order. */
  invoice_ids?: Maybe<Scalars['String']['output']>;
  /** A list of items in the order. */
  items?: Maybe<Array<Maybe<OrderViewItem>>>;
  /** The unique identifier for the order. */
  order_id?: Maybe<Scalars['String']['output']>;
  /** Additional order information. */
  order_info?: Maybe<OrderViewInfo>;
  /** A list of shipment IDs associated with the order. */
  shipment_ids?: Maybe<Scalars['String']['output']>;
  /** The current status of the order. */
  status?: Maybe<Scalars['String']['output']>;
  /** The subtotal of the order. */
  subtotal?: Maybe<OrderViewData>;
  /** The tax amount for the order. */
  tax?: Maybe<OrderViewData>;
  /** The total admin commission for the order. */
  total_admin_commision?: Maybe<OrderViewData>;
  /** The total amount ordered. */
  total_ordered_amount?: Maybe<OrderViewData>;
  /** The total amount due to the vendor. */
  total_vendor_amount?: Maybe<OrderViewData>;
};

export type SellerOrdersList = {
  __typename?: 'SellerOrdersList';
  /** Detailed list of items in the seller's orders. */
  items?: Maybe<Array<Maybe<SellerOrderItems>>>;
  /** A list of all orders from the seller. */
  order?: Maybe<Array<Maybe<AllSellerOrder>>>;
};

/** List of products for a seller */
export type SellerProduct = {
  __typename?: 'SellerProduct';
  /** List of individual product items */
  items?: Maybe<Array<Maybe<ProductItems>>>;
  /** Total number of products listed by the seller */
  total_count?: Maybe<Scalars['Int']['output']>;
};

export type SellerProductAttributeSet = {
  __typename?: 'SellerProductAttributeSet';
  /** The human-readable label for the product attribute set. */
  label?: Maybe<Scalars['String']['output']>;
  /** The attribute set value associated with the seller's product. */
  value?: Maybe<Scalars['String']['output']>;
};

/** Seller's product listing */
export type SellerProductList = {
  __typename?: 'SellerProductList';
  /** List of products from the seller */
  items?: Maybe<Array<Maybe<ProductInterface>>>;
  /** Total number of denied products */
  total_denied?: Maybe<Scalars['Int']['output']>;
  /** Total number of disabled products */
  total_disabled?: Maybe<Scalars['Int']['output']>;
  /** Total number of enabled products */
  total_enabled?: Maybe<Scalars['Int']['output']>;
  /** Total number of low stock products */
  total_low_stock?: Maybe<Scalars['Int']['output']>;
  /** Total number of out-of-stock products */
  total_out_of_stock?: Maybe<Scalars['Int']['output']>;
  /** Total number of pending products */
  total_pending?: Maybe<Scalars['Int']['output']>;
};

/** Top 3 products from a seller */
export type SellerProducts = {
  __typename?: 'SellerProducts';
  /** Product ID */
  id?: Maybe<Scalars['Int']['output']>;
  /** Product name */
  name?: Maybe<Scalars['String']['output']>;
  /** URL to the product's thumbnail image */
  thumbnail?: Maybe<Scalars['String']['output']>;
  /** Type of product (e.g., simple, configurable) */
  type?: Maybe<Scalars['String']['output']>;
};

/** Get seller profile data */
export type SellerProfile = {
  __typename?: 'SellerProfile';
  /** Yes/no config to show the seller profile */
  display_seller_profile?: Maybe<Scalars['String']['output']>;
  /** Profile data of the seller */
  profile_data?: Maybe<Scalars['String']['output']>;
  /** Profile hint status (enabled/disabled) */
  profile_hint?: Maybe<Scalars['String']['output']>;
  /** Current status of the seller's profile */
  profile_status?: Maybe<Scalars['String']['output']>;
};

/** Seller profile input data for setting up the seller's profile */
export type SellerProfileInput = {
  /** Analytics ID for tracking and monitoring seller's performance */
  analytic_id?: InputMaybe<Scalars['String']['input']>;
  /** Upload company banner image */
  company_banner?: InputMaybe<ImageUpload>;
  /** A brief description of the seller's company and business */
  company_description?: InputMaybe<Scalars['String']['input']>;
  /** Locality of the seller's company */
  company_locality?: InputMaybe<Scalars['String']['input']>;
  /** Upload company logo */
  company_logo?: InputMaybe<ImageUpload>;
  /** Seller's contact number */
  contact_number?: InputMaybe<Scalars['String']['input']>;
  /** Country picture for seller profile */
  country_pic?: InputMaybe<Scalars['String']['input']>;
  /** Seller's Facebook ID */
  facebook_id?: InputMaybe<Scalars['String']['input']>;
  /** Flag indicating if Facebook is active */
  fb_active?: InputMaybe<Scalars['String']['input']>;
  /** Fulfillment image for seller's profile */
  fulfil_image?: InputMaybe<ImageUpload>;
  /** Text describing the fulfillment process for the seller */
  fulfilment_text?: InputMaybe<Scalars['String']['input']>;
  /** Flag indicating if Instagram is active */
  instagram_active?: InputMaybe<Scalars['String']['input']>;
  /** Seller's Instagram ID */
  instagram_id?: InputMaybe<Scalars['String']['input']>;
  /** Threshold quantity indicating when a product is considered to have low stock */
  low_stock_quantity?: InputMaybe<Scalars['Int']['input']>;
  /** Meta description for SEO */
  meta_description?: InputMaybe<Scalars['String']['input']>;
  /** Meta keywords for SEO */
  meta_keyword?: InputMaybe<Scalars['String']['input']>;
  /** Flag indicating if Moleskine is active for the seller */
  moleskine_active?: InputMaybe<Scalars['String']['input']>;
  /** Moleskine ID associated with the seller */
  moleskine_id?: InputMaybe<Scalars['String']['input']>;
  /** Payment source used by the seller (e.g., PayPal, Stripe) */
  payment_source?: InputMaybe<Scalars['String']['input']>;
  /** Flag indicating if Pinterest is active */
  pinterest_active?: InputMaybe<Scalars['String']['input']>;
  /** Seller's Pinterest ID */
  pinterest_id?: InputMaybe<Scalars['String']['input']>;
  /** Seller's privacy policy text */
  privacy_policy?: InputMaybe<Scalars['String']['input']>;
  /** Seller's return policy text */
  return_policy?: InputMaybe<Scalars['String']['input']>;
  /** Seller's shipping policy text */
  shipping_policy?: InputMaybe<Scalars['String']['input']>;
  /** Seller's shop title */
  shop_title?: InputMaybe<Scalars['String']['input']>;
  /** Seller's tax VAT number */
  taxvat?: InputMaybe<Scalars['String']['input']>;
  /** Flag indicating if TikTok is active for the seller */
  tiktok_active?: InputMaybe<Scalars['String']['input']>;
  /** Seller's TikTok ID */
  tiktok_id?: InputMaybe<Scalars['String']['input']>;
  /** Flag indicating if Twitter is active */
  tw_active?: InputMaybe<Scalars['String']['input']>;
  /** Seller's Twitter ID */
  twitter_id?: InputMaybe<Scalars['String']['input']>;
  /** Flag indicating if Vimeo is active */
  vimeo_active?: InputMaybe<Scalars['String']['input']>;
  /** Seller's Vimeo ID */
  vimeo_id?: InputMaybe<Scalars['String']['input']>;
  /** Flag indicating if YouTube is active */
  youtube_active?: InputMaybe<Scalars['String']['input']>;
  /** Seller's YouTube ID */
  youtube_id?: InputMaybe<Scalars['String']['input']>;
};

export type SellerPublishedNewsItems = {
  __typename?: 'SellerPublishedNewsItems';
  /** The content of the published news item. */
  content?: Maybe<Scalars['String']['output']>;
  /** The creation date of the published news item. */
  created_at?: Maybe<Scalars['String']['output']>;
  /** The unique identifier for the published news item. */
  id?: Maybe<Scalars['Int']['output']>;
  /** The read status of the news item (e.g., 0 for unread, 1 for read). */
  read_status?: Maybe<Scalars['Int']['output']>;
};

export type SellerPublishedNewsList = {
  __typename?: 'SellerPublishedNewsList';
  /** A list of published news items. */
  items?: Maybe<Array<Maybe<SellerPublishedNewsItems>>>;
  /** The name or title of the published news list. */
  name?: Maybe<Scalars['String']['output']>;
  /** The total count of published news items by the seller. */
  total_count?: Maybe<Scalars['Int']['output']>;
};

/** Get seller data */
export type SellerReportData = {
  __typename?: 'SellerReportData';
  /** Get average order value */
  average_order_value?: Maybe<AverageOrderValue>;
  /** Get seller top category */
  sale_data?: Maybe<SaleData>;
  /** Get total order of seller Dashboard */
  seller_order?: Maybe<SellerDashboardTotalOrder>;
  /** Get seller top category */
  top_category?: Maybe<Array<Maybe<SellerTopCategory>>>;
  /** Get top Customer */
  top_customer?: Maybe<SellerTopCustomer>;
  /** Get top selling product data of seller */
  topselling_product?: Maybe<Array<Maybe<SellerTopSellingProduct>>>;
};

/** Contains customer reviews and ratings for a seller */
export type SellerReview = {
  __typename?: 'SellerReview';
  /** List of individual reviews submitted by customers */
  items?: Maybe<Array<Maybe<ReviewItems>>>;
  /** Total number of reviews submitted for the seller */
  total_count?: Maybe<Scalars['Int']['output']>;
};

/** List of reviews and review details for a seller */
export type SellerReviewDetails = {
  __typename?: 'SellerReviewDetails';
  /** List of individual review items for the seller */
  items?: Maybe<Array<Maybe<ReviewItems>>>;
  /** Total number of reviews for the seller */
  total_count?: Maybe<Scalars['Int']['output']>;
};

export type SellerReviewItems = {
  __typename?: 'SellerReviewItems';
  /** The date and time when the review was created. */
  created_at?: Maybe<Scalars['String']['output']>;
  /** The name of the customer who left the review. */
  customer_name?: Maybe<Scalars['String']['output']>;
  /** Detailed review provided by the customer. */
  feed_review?: Maybe<Scalars['String']['output']>;
  /** Summary of the feedback provided in the review. */
  feed_summary?: Maybe<Scalars['String']['output']>;
  /** The unique identifier for the review. */
  id: Scalars['Int']['output'];
  /** Rating of the product price (scale: 1 to 5). */
  price_rating?: Maybe<Scalars['Int']['output']>;
  /** Rating of the product quality (scale: 1 to 5). */
  quality_rating?: Maybe<Scalars['Int']['output']>;
  /** The status of the review (e.g., 'approved', 'pending'). */
  status?: Maybe<Scalars['String']['output']>;
  /** Rating of the product value (scale: 1 to 5). */
  value_rating?: Maybe<Scalars['Int']['output']>;
};

/** Provides response data for saving the seller's shop URL information. */
export type SellerSaveShopUrl = {
  __typename?: 'SellerSaveShopUrl';
  /** A message indicating the result of the save operation. */
  message?: Maybe<Scalars['String']['output']>;
  /** The status of the operation, where true indicates success. */
  status?: Maybe<Scalars['Boolean']['output']>;
};

/** List of products owned by the seller */
export type SellerSelfProduct = {
  __typename?: 'SellerSelfProduct';
  /** List of product items sold by the seller */
  items?: Maybe<Array<Maybe<ProductItems>>>;
};

export type SellerSelfReviewFilter = {
  /** Filter reviews created from this date onwards. */
  created_from?: InputMaybe<Scalars['String']['input']>;
  /** Filter reviews created until this date. */
  created_to?: InputMaybe<Scalars['String']['input']>;
  /** The current page of reviews to return. */
  cur_page?: InputMaybe<Scalars['Int']['input']>;
  /** Filter reviews by the customer's name. */
  customer_name?: InputMaybe<Scalars['String']['input']>;
  /** Filter reviews by detailed feedback. */
  feed_review?: InputMaybe<Scalars['String']['input']>;
  /** Filter reviews by summary feedback. */
  feed_summary?: InputMaybe<Scalars['String']['input']>;
  /** Filter reviews with IDs greater than or equal to this value. */
  id_from?: InputMaybe<Scalars['Int']['input']>;
  /** Filter reviews with IDs less than or equal to this value. */
  id_to?: InputMaybe<Scalars['Int']['input']>;
  /** The maximum number of reviews to return per page. */
  page_size?: InputMaybe<Scalars['Int']['input']>;
  /** Filter reviews by price rating (1 to 5). */
  price_rating?: InputMaybe<Scalars['Int']['input']>;
  /** Filter reviews by quality rating (1 to 5). */
  quality_rating?: InputMaybe<Scalars['Int']['input']>;
  /** Filter reviews by their approval status (e.g., 1 for approved, 0 for pending). */
  status?: InputMaybe<Scalars['Int']['input']>;
  /** Filter reviews by value rating (1 to 5). */
  value_rating?: InputMaybe<Scalars['Int']['input']>;
};

export type SellerSelfReviewList = {
  __typename?: 'SellerSelfReviewList';
  /** A list of reviews for the seller. */
  items?: Maybe<Array<Maybe<SellerReviewItems>>>;
  /** The total number of reviews available for the seller. */
  total_count?: Maybe<Scalars['Int']['output']>;
};

export type SellerShipmentList = {
  __typename?: 'SellerShipmentList';
  /** A list of shipments made by the seller. */
  items?: Maybe<Array<Maybe<ShipmentListItem>>>;
};

/** Represents the top categories based on seller data */
export type SellerTopCategory = {
  __typename?: 'SellerTopCategory';
  /** Name of the top-selling category */
  category?: Maybe<Scalars['String']['output']>;
  /** Unique identifier for the category */
  id?: Maybe<Scalars['Int']['output']>;
  /** Percentage of total sales attributed to this category */
  percentage?: Maybe<Scalars['Float']['output']>;
};

/** Top customer based on sales data */
export type SellerTopCustomer = {
  __typename?: 'SellerTopCustomer';
  /** Percentage comparison for top customer data */
  percent_compare?: Maybe<Scalars['Float']['output']>;
  /** List of top customers based on sales data */
  top_customer_data?: Maybe<Array<Maybe<TopCustomer>>>;
  /** Total number of top customers */
  total_top_customer?: Maybe<Scalars['Int']['output']>;
};

/** Data for the top-selling products of the seller */
export type SellerTopSellingProduct = {
  __typename?: 'SellerTopSellingProduct';
  /** Image of the top-selling product */
  image?: Maybe<Scalars['String']['output']>;
  /** Name of the top-selling product */
  name?: Maybe<Scalars['String']['output']>;
  /** Quantity sold for the top-selling product */
  qty?: Maybe<Scalars['Int']['output']>;
  /** URL of the top-selling product */
  url?: Maybe<Scalars['String']['output']>;
};

/** Seller Reviews */
export type SellerTotalReviews = {
  __typename?: 'SellerTotalReviews';
  /** Total Price Ratings */
  feedcount?: Maybe<Scalars['Float']['output']>;
  /** Total Price Ratings */
  price?: Maybe<Scalars['Float']['output']>;
  /** Total Price Ratings */
  price_star_1?: Maybe<Scalars['Float']['output']>;
  /** Total Price Ratings */
  price_star_2?: Maybe<Scalars['Float']['output']>;
  /** Total Price Ratings */
  price_star_3?: Maybe<Scalars['Float']['output']>;
  /** Total Price Ratings */
  price_star_4?: Maybe<Scalars['Float']['output']>;
  /** Total Price Ratings */
  price_star_5?: Maybe<Scalars['Float']['output']>;
  /** Total Price Ratings */
  quality?: Maybe<Scalars['Float']['output']>;
  /** Total quality Ratings */
  quality_star_1?: Maybe<Scalars['Float']['output']>;
  /** Total quality Ratings */
  quality_star_2?: Maybe<Scalars['Float']['output']>;
  /** Total quality Ratings */
  quality_star_3?: Maybe<Scalars['Float']['output']>;
  /** Total quality Ratings */
  quality_star_4?: Maybe<Scalars['Float']['output']>;
  /** Total quality Ratings */
  quality_star_5?: Maybe<Scalars['Float']['output']>;
  /** Total Price Ratings */
  total?: Maybe<Scalars['Float']['output']>;
  /** Total Price Ratings */
  totalfeed?: Maybe<Scalars['Float']['output']>;
  /** Total Price Ratings */
  value?: Maybe<Scalars['Float']['output']>;
  /** Total value Ratings */
  value_star_1?: Maybe<Scalars['Float']['output']>;
  /** Total value Ratings */
  value_star_2?: Maybe<Scalars['Float']['output']>;
  /** Total value Ratings */
  value_star_3?: Maybe<Scalars['Float']['output']>;
  /** Total value Ratings */
  value_star_4?: Maybe<Scalars['Float']['output']>;
  /** Total value Ratings */
  value_star_5?: Maybe<Scalars['Float']['output']>;
};

export type SellerTransactionView = {
  __typename?: 'SellerTransactionView';
  /** The unique identifier for the transaction. */
  transaction_id?: Maybe<Scalars['String']['output']>;
  /** Detailed information about the transaction. */
  transaction_info?: Maybe<TransactionInfo>;
  /** A list of orders related to this transaction. */
  transaction_order_info?: Maybe<Array<Maybe<TransactionOrderInfo>>>;
};

export type SellerTransactions = {
  __typename?: 'SellerTransactions';
  /** Indicates whether the payout button should be displayed. */
  button_show?: Maybe<Scalars['Boolean']['output']>;
  /** The total commission deducted by the platform. */
  commission?: Maybe<Scalars['String']['output']>;
  /** The formatted version of the commission. */
  commission_formatted?: Maybe<Scalars['String']['output']>;
  /** A list of the seller's transactions. */
  items?: Maybe<Array<Maybe<TransactionList>>>;
  /** The remaining payout amount to the seller. */
  remaining_payout?: Maybe<Scalars['String']['output']>;
  /** The formatted version of the remaining payout. */
  remaining_payout_formatted?: Maybe<Scalars['String']['output']>;
  /** The total tax the seller has paid. */
  tax?: Maybe<Scalars['String']['output']>;
  /** The formatted version of the total tax. */
  tax_formatted?: Maybe<Scalars['String']['output']>;
  /** The total payout amount to the seller. */
  total_payout?: Maybe<Scalars['String']['output']>;
  /** The formatted version of the total payout. */
  total_payout_formatted?: Maybe<Scalars['String']['output']>;
  /** The total sales value for the seller. */
  total_sale?: Maybe<Scalars['String']['output']>;
  /** The formatted version of the total sales. */
  total_sale_formatted?: Maybe<Scalars['String']['output']>;
  /** The total earnings for the seller. */
  total_seller_earning?: Maybe<Scalars['String']['output']>;
  /** The formatted version of the total seller earnings. */
  total_seller_earning_formatted?: Maybe<Scalars['String']['output']>;
};

export type SellerWithdrawalRequest = {
  __typename?: 'SellerWithdrawalRequest';
  /** Response message for the withdrawal request */
  message?: Maybe<Scalars['String']['output']>;
  /** Status indicating whether the withdrawal request was successful */
  status?: Maybe<Scalars['Boolean']['output']>;
};

/** Top 3 Sellers with their details for marketplace */
export type Sellers = {
  __typename?: 'Sellers';
  /** Top 3 products from the seller */
  products?: Maybe<Array<Maybe<SellerProducts>>>;
  /** URL to the seller's profile page */
  profileurl?: Maybe<Scalars['String']['output']>;
  /** URL to the seller's profile icon */
  sellerIcon?: Maybe<Scalars['String']['output']>;
  /** Number of products listed by the seller */
  sellerProductCount?: Maybe<Scalars['String']['output']>;
  /** The title of the seller's shop */
  shopTitle?: Maybe<Scalars['String']['output']>;
};

/** List of sellers with count and items */
export type SellersList = {
  __typename?: 'SellersList';
  /** List of individual seller items */
  items?: Maybe<Array<Maybe<Items>>>;
  /** Total number of sellers */
  total_count?: Maybe<Scalars['Int']['output']>;
};

/** Defines the referenced product and the email sender and recipients. */
export type SendEmailToFriendInput = {
  /** The ID of the product that the sender is referencing. */
  product_id: Scalars['Int']['input'];
  /** An array containing information about each recipient. */
  recipients: Array<InputMaybe<SendEmailToFriendRecipientInput>>;
  /** Information about the customer and the content of the message. */
  sender: SendEmailToFriendSenderInput;
};

/** Contains information about the sender and recipients. */
export type SendEmailToFriendOutput = {
  __typename?: 'SendEmailToFriendOutput';
  /** An array containing information about each recipient. */
  recipients?: Maybe<Array<Maybe<SendEmailToFriendRecipient>>>;
  /** Information about the customer and the content of the message. */
  sender?: Maybe<SendEmailToFriendSender>;
};

/** An output object that contains information about the recipient. */
export type SendEmailToFriendRecipient = {
  __typename?: 'SendEmailToFriendRecipient';
  /** The email address of the recipient. */
  email: Scalars['String']['output'];
  /** The name of the recipient. */
  name: Scalars['String']['output'];
};

/** Contains details about a recipient. */
export type SendEmailToFriendRecipientInput = {
  /** The email address of the recipient. */
  email: Scalars['String']['input'];
  /** The name of the recipient. */
  name: Scalars['String']['input'];
};

/** An output object that contains information about the sender. */
export type SendEmailToFriendSender = {
  __typename?: 'SendEmailToFriendSender';
  /** The email address of the sender. */
  email: Scalars['String']['output'];
  /** The text of the message to be sent. */
  message: Scalars['String']['output'];
  /** The name of the sender. */
  name: Scalars['String']['output'];
};

/** Contains details about the sender. */
export type SendEmailToFriendSenderInput = {
  /** The email address of the sender. */
  email: Scalars['String']['input'];
  /** The text of the message to be sent. */
  message: Scalars['String']['input'];
  /** The name of the sender. */
  name: Scalars['String']['input'];
};

/** Contains details about the configuration of the Email to a Friend feature. */
export type SendFriendConfiguration = {
  __typename?: 'SendFriendConfiguration';
  /** Indicates whether the Email to a Friend feature is enabled. */
  enabled_for_customers: Scalars['Boolean']['output'];
  /** Indicates whether the Email to a Friend feature is enabled for guests. */
  enabled_for_guests: Scalars['Boolean']['output'];
};

export type SendOrderMailToCustomer = {
  __typename?: 'SendOrderMailToCustomer';
  /** Response message after sending the order email */
  message?: Maybe<Scalars['String']['output']>;
  /** Status indicating if the email was successfully sent */
  status?: Maybe<Scalars['Boolean']['output']>;
};

/** Sets the billing address. */
export type SetBillingAddressOnCartInput = {
  /** The billing address. */
  billing_address: BillingAddressInput;
  /** The unique ID of a `Cart` object. */
  cart_id: Scalars['String']['input'];
};

/** Contains details about the cart after setting the billing address. */
export type SetBillingAddressOnCartOutput = {
  __typename?: 'SetBillingAddressOnCartOutput';
  /** The cart after setting the billing address. */
  cart: Cart;
};

/** Sets the cart as inactive */
export type SetCartAsInactiveOutput = {
  __typename?: 'SetCartAsInactiveOutput';
  /** The error message returned after failing to set the cart as inactive */
  error?: Maybe<Scalars['String']['output']>;
  /** Indicates whether the cart was set as inactive */
  success: Scalars['Boolean']['output'];
};

/** Defines the guest email and cart. */
export type SetGuestEmailOnCartInput = {
  /** The unique ID of a `Cart` object. */
  cart_id: Scalars['String']['input'];
  /** The email address of the guest. */
  email: Scalars['String']['input'];
};

/** Contains details about the cart after setting the email of a guest. */
export type SetGuestEmailOnCartOutput = {
  __typename?: 'SetGuestEmailOnCartOutput';
  /** The cart after setting the guest email. */
  cart: Cart;
};

/** Applies a payment method to the quote. */
export type SetPaymentMethodAndPlaceOrderInput = {
  /** The unique ID of a `Cart` object. */
  cart_id: Scalars['String']['input'];
  /** The payment method data to apply to the cart. */
  payment_method: PaymentMethodInput;
};

/** Applies a payment method to the cart. */
export type SetPaymentMethodOnCartInput = {
  /** The unique ID of a `Cart` object. */
  cart_id: Scalars['String']['input'];
  /** The payment method data to apply to the cart. */
  payment_method: PaymentMethodInput;
};

/** Contains details about the cart after setting the payment method. */
export type SetPaymentMethodOnCartOutput = {
  __typename?: 'SetPaymentMethodOnCartOutput';
  /** The cart after setting the payment method. */
  cart: Cart;
};

/** Specifies an array of addresses to use for shipping. */
export type SetShippingAddressesOnCartInput = {
  /** The unique ID of a `Cart` object. */
  cart_id: Scalars['String']['input'];
  /** An array of shipping addresses. */
  shipping_addresses: Array<InputMaybe<ShippingAddressInput>>;
};

/** Contains details about the cart after setting the shipping addresses. */
export type SetShippingAddressesOnCartOutput = {
  __typename?: 'SetShippingAddressesOnCartOutput';
  /** The cart after setting the shipping addresses. */
  cart: Cart;
};

/** Applies one or shipping methods to the cart. */
export type SetShippingMethodsOnCartInput = {
  /** The unique ID of a `Cart` object. */
  cart_id: Scalars['String']['input'];
  /** An array of shipping methods. */
  shipping_methods: Array<InputMaybe<ShippingMethodInput>>;
};

/** Contains details about the cart after setting the shipping methods. */
export type SetShippingMethodsOnCartOutput = {
  __typename?: 'SetShippingMethodsOnCartOutput';
  /** The cart after setting the shipping methods. */
  cart: Cart;
};

/** Defines whether bundle items must be shipped together. */
export enum ShipBundleItemsEnum {
  Separately = 'SEPARATELY',
  Together = 'TOGETHER'
}

export type ShipmentItem = ShipmentItemInterface & {
  __typename?: 'ShipmentItem';
  /** The unique ID for a `ShipmentItemInterface` object. */
  id: Scalars['ID']['output'];
  /** The order item associated with the shipment item. */
  order_item?: Maybe<OrderItemInterface>;
  /** The name of the base product. */
  product_name?: Maybe<Scalars['String']['output']>;
  /** The sale price for the base product. */
  product_sale_price: Money;
  /** The SKU of the base product. */
  product_sku: Scalars['String']['output'];
  /** The number of shipped items. */
  quantity_shipped: Scalars['Float']['output'];
};

/** Order shipment item details. */
export type ShipmentItemInterface = {
  /** The unique ID for a `ShipmentItemInterface` object. */
  id: Scalars['ID']['output'];
  /** The order item associated with the shipment item. */
  order_item?: Maybe<OrderItemInterface>;
  /** The name of the base product. */
  product_name?: Maybe<Scalars['String']['output']>;
  /** The sale price for the base product. */
  product_sale_price: Money;
  /** The SKU of the base product. */
  product_sku: Scalars['String']['output'];
  /** The number of shipped items. */
  quantity_shipped: Scalars['Float']['output'];
};

export type ShipmentListItem = {
  __typename?: 'ShipmentListItem';
  /** The associated entity ID for the shipment. */
  entity_id?: Maybe<Scalars['Int']['output']>;
  /** The quantity of products shipped. */
  quantity?: Maybe<Scalars['Int']['output']>;
  /** The date the shipment was dispatched. */
  ship_date?: Maybe<Scalars['String']['output']>;
  /** The name of the recipient of the shipment. */
  ship_to_name?: Maybe<Scalars['String']['output']>;
  /** The unique identifier for the shipment. */
  shipment_id?: Maybe<Scalars['String']['output']>;
};

export type ShipmentParams = {
  /** Flag to notify the customer about a comment on the shipment */
  comment_customer_notify: Scalars['Boolean']['input'];
  /** The comment text to be added to the shipment */
  comment_text: Scalars['String']['input'];
  /** Flag to control the visibility of the shipment on the front-end */
  is_visible_on_front: Scalars['Boolean']['input'];
  /** List of items to be included in the shipment */
  items?: InputMaybe<Array<InputMaybe<InvoiceItems>>>;
  /** Flag to send an email to the customer about the shipment */
  send_email: Scalars['Boolean']['input'];
};

/** Contains order shipment tracking details. */
export type ShipmentTracking = {
  __typename?: 'ShipmentTracking';
  /** The shipping carrier for the order delivery. */
  carrier: Scalars['String']['output'];
  /** The tracking number of the order shipment. */
  number?: Maybe<Scalars['String']['output']>;
  /** The shipment tracking title. */
  title: Scalars['String']['output'];
};

/** Shipping Address Data */
export type ShippingAddressData = {
  __typename?: 'ShippingAddressData';
  /** Address */
  address?: Maybe<OrderAddress>;
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
};

/** Defines a single shipping address. */
export type ShippingAddressInput = {
  /** Defines a shipping address. */
  address?: InputMaybe<CartAddressInput>;
  /** An ID from the customer's address book that uniquely identifies the address to be used for shipping. */
  customer_address_id?: InputMaybe<Scalars['Int']['input']>;
  /** Text provided by the shopper. */
  customer_notes?: InputMaybe<Scalars['String']['input']>;
  /** The code of Pickup Location which will be used for In-Store Pickup. */
  pickup_location_code?: InputMaybe<Scalars['String']['input']>;
};

/** Shipping Carriers */
export type ShippingCarriers = {
  __typename?: 'ShippingCarriers';
  /** Carrier */
  carrier?: Maybe<Scalars['String']['output']>;
  /** Number */
  number?: Maybe<Scalars['String']['output']>;
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
};

/** Contains shipping addresses and methods. */
export type ShippingCartAddress = CartAddressInterface & {
  __typename?: 'ShippingCartAddress';
  /** An array that lists the shipping methods that can be applied to the cart. */
  available_shipping_methods?: Maybe<Array<Maybe<AvailableShippingMethod>>>;
  /** @deprecated Use `cart_items_v2` instead. */
  cart_items?: Maybe<Array<Maybe<CartItemQuantity>>>;
  /** An array that lists the items in the cart. */
  cart_items_v2?: Maybe<Array<Maybe<CartItemInterface>>>;
  /** The city specified for the billing or shipping address. */
  city: Scalars['String']['output'];
  /** The company specified for the billing or shipping address. */
  company?: Maybe<Scalars['String']['output']>;
  /** An object containing the country label and code. */
  country: CartAddressCountry;
  /** Text provided by the shopper. */
  customer_notes?: Maybe<Scalars['String']['output']>;
  /** The customer's fax number. */
  fax?: Maybe<Scalars['String']['output']>;
  /** The first name of the customer or guest. */
  firstname: Scalars['String']['output'];
  /** Id of the customer address. */
  id?: Maybe<Scalars['Int']['output']>;
  /** @deprecated This information should not be exposed on the frontend. */
  items_weight?: Maybe<Scalars['Float']['output']>;
  /** The last name of the customer or guest. */
  lastname: Scalars['String']['output'];
  /** The middle name of the person associated with the billing/shipping address. */
  middlename?: Maybe<Scalars['String']['output']>;
  pickup_location_code?: Maybe<Scalars['String']['output']>;
  /** The ZIP or postal code of the billing or shipping address. */
  postcode?: Maybe<Scalars['String']['output']>;
  /** An honorific, such as Dr., Mr., or Mrs. */
  prefix?: Maybe<Scalars['String']['output']>;
  /** An object containing the region label and code. */
  region?: Maybe<CartAddressRegion>;
  /** Indicates whether the shipping address is same as billing address. */
  same_as_billing: Scalars['Boolean']['output'];
  /** An object that describes the selected shipping method. */
  selected_shipping_method?: Maybe<SelectedShippingMethod>;
  /** An array containing the street for the billing or shipping address. */
  street: Array<Maybe<Scalars['String']['output']>>;
  /** A value such as Sr., Jr., or III. */
  suffix?: Maybe<Scalars['String']['output']>;
  /** The telephone number for the billing or shipping address. */
  telephone?: Maybe<Scalars['String']['output']>;
  /** The unique id of the customer address. */
  uid: Scalars['String']['output'];
  /** The VAT company number for billing or shipping address. */
  vat_id?: Maybe<Scalars['String']['output']>;
};

/** Shipping Data */
export type ShippingData = {
  __typename?: 'ShippingData';
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
  /** Value */
  value?: Maybe<Scalars['String']['output']>;
  /** Formatted value */
  valueFormatted?: Maybe<Scalars['String']['output']>;
};

/** Defines an individual shipping discount. This discount can be applied to shipping. */
export type ShippingDiscount = {
  __typename?: 'ShippingDiscount';
  /** The amount of the discount. */
  amount: Money;
};

/** Contains details about shipping and handling costs. */
export type ShippingHandling = {
  __typename?: 'ShippingHandling';
  /** The shipping amount, excluding tax. */
  amount_excluding_tax?: Maybe<Money>;
  /** The shipping amount, including tax. */
  amount_including_tax?: Maybe<Money>;
  /** The applied discounts to the shipping. */
  discounts?: Maybe<Array<Maybe<ShippingDiscount>>>;
  /** Details about taxes applied for shipping. */
  taxes?: Maybe<Array<Maybe<TaxItem>>>;
  /** The total amount for shipping. */
  total_amount: Money;
};

/** Shipping Item Data */
export type ShippingItemData = {
  __typename?: 'ShippingItemData';
  /** Product Name */
  productName?: Maybe<Scalars['String']['output']>;
  /** Qty */
  qty?: Maybe<Scalars['Int']['output']>;
  /** Sku */
  sku?: Maybe<Scalars['String']['output']>;
};

/** Shipping Method Data */
export type ShippingMethodData = {
  __typename?: 'ShippingMethodData';
  /** Method */
  method?: Maybe<Scalars['String']['output']>;
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
};

/** Defines the shipping carrier and method. */
export type ShippingMethodInput = {
  /** A string that identifies a commercial carrier or an offline delivery method. */
  carrier_code: Scalars['String']['input'];
  /** A string that indicates which service a commercial carrier will use to ship items. For offline delivery methods, this value is similar to the label displayed on the checkout page. */
  method_code: Scalars['String']['input'];
};

export type ShopCollectionBanner = {
  __typename?: 'ShopCollectionBanner';
  /** banner description */
  bannerDesc?: Maybe<Scalars['String']['output']>;
  /** banner subtitle */
  bannerSubtitle?: Maybe<Scalars['String']['output']>;
  /** banner title */
  bannerTitle?: Maybe<Scalars['String']['output']>;
  /** bannerType */
  bannerType?: Maybe<Scalars['String']['output']>;
  /** button text */
  buttonText?: Maybe<Scalars['String']['output']>;
  /** dominantColor */
  dominantColor?: Maybe<Scalars['String']['output']>;
  /** Id */
  id?: Maybe<Scalars['Int']['output']>;
  /** Information Div Position */
  infoPosition?: Maybe<Scalars['String']['output']>;
  /** url */
  url?: Maybe<Scalars['String']['output']>;
  /** urlKey */
  urlKey?: Maybe<Scalars['String']['output']>;
};

export type ShopType = {
  __typename?: 'ShopType';
  /** Description */
  description?: Maybe<Scalars['String']['output']>;
  /** Id */
  id?: Maybe<Scalars['Int']['output']>;
  /** Items */
  items?: Maybe<Array<Maybe<ShopCollectionBanner>>>;
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
};

/** An implementation for simple product cart items. */
export type SimpleCartItem = CartItemInterface & {
  __typename?: 'SimpleCartItem';
  /** An array containing the customizable options the shopper selected. */
  customizable_options: Array<Maybe<SelectedCustomizableOption>>;
  /** An array of errors encountered while loading the cart item */
  errors?: Maybe<Array<Maybe<CartItemError>>>;
  /** The entered gift message for the cart item */
  gift_message?: Maybe<GiftMessage>;
  /** @deprecated Use `uid` instead. */
  id: Scalars['String']['output'];
  /** True if requested quantity is less than available stock, false otherwise. */
  is_available: Scalars['Boolean']['output'];
  /** Message to display when the product is not available with this selected option. */
  not_available_message?: Maybe<Scalars['String']['output']>;
  /** Contains details about the price of the item, including taxes and discounts. */
  prices?: Maybe<CartItemPrices>;
  /** Details about an item in the cart. */
  product: ProductInterface;
  /** The quantity of this item in the cart. */
  quantity: Scalars['Float']['output'];
  /** The unique ID for a `CartItemInterface` object. */
  uid: Scalars['ID']['output'];
};

/** Defines a simple product, which is tangible and is usually sold in single units or in fixed quantities. */
export type SimpleProduct = CustomizableProductInterface & PhysicalProductInterface & ProductInterface & RoutableInterface & {
  __typename?: 'SimpleProduct';
  /** The productdata query returns the product attributes */
  attributeValues?: Maybe<Array<Maybe<ProductAttributes>>>;
  /**
   * The attribute set assigned to the product.
   * @deprecated The field should not be used on the storefront.
   */
  attribute_set_id?: Maybe<Scalars['Int']['output']>;
  /** Name of the product attribute set */
  attribute_set_name?: Maybe<Scalars['String']['output']>;
  /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled. */
  canonical_url?: Maybe<Scalars['String']['output']>;
  /** The categories assigned to a product. */
  categories?: Maybe<Array<Maybe<CategoryInterface>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  color?: Maybe<Scalars['Int']['output']>;
  /** The product's country of origin. */
  country_of_manufacture?: Maybe<Scalars['String']['output']>;
  /**
   * Timestamp indicating when the product was created.
   * @deprecated The field should not be used on the storefront.
   */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Crosssell Products */
  crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** Product custom attributes. */
  custom_attributesV2?: Maybe<ProductCustomAttributes>;
  /** Reason for denying the product listing */
  deny_reason?: Maybe<DenyReason>;
  /** Detailed information about the product. The value can include simple HTML tags. */
  description?: Maybe<ComplexTextValue>;
  /** Returns a value indicating gift message availability for the product. */
  gift_message_available: Scalars['Boolean']['output'];
  /**
   * The ID number assigned to the product.
   * @deprecated Use the `uid` field instead.
   */
  id?: Maybe<Scalars['Int']['output']>;
  /** The relative path to the main image on the product page. */
  image?: Maybe<ProductImage>;
  /**
   * A number representing the product's manufacturer.
   * @deprecated Use the `custom_attributes` field instead.
   */
  manufacturer?: Maybe<Scalars['Int']['output']>;
  /** Maximum Qty Allowed in Shopping Cart */
  max_sale_qty?: Maybe<Scalars['Float']['output']>;
  /** An array of media gallery objects. */
  media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
  /**
   * An array of MediaGalleryEntry objects.
   * @deprecated Use `media_gallery` instead.
   */
  media_gallery_entries?: Maybe<Array<Maybe<MediaGalleryEntry>>>;
  /** A brief overview of the product for search results listings, maximum 255 characters. */
  meta_description?: Maybe<Scalars['String']['output']>;
  /** A comma-separated list of keywords that are visible only to search engines. */
  meta_keyword?: Maybe<Scalars['String']['output']>;
  /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
  meta_title?: Maybe<Scalars['String']['output']>;
  /** Minimum Qty Allowed in Shopping Cart */
  min_sale_qty?: Maybe<Scalars['Float']['output']>;
  /** The product name. Customers use this name to identify the product. */
  name?: Maybe<Scalars['String']['output']>;
  /** The beginning date for new product listings, and determines if the product is featured as a new product. */
  new_from_date?: Maybe<Scalars['String']['output']>;
  /** The end date for new product listings. */
  new_to_date?: Maybe<Scalars['String']['output']>;
  /** Product stock only x left count */
  only_x_left_in_stock?: Maybe<Scalars['Float']['output']>;
  /** An array of options for a customizable product. */
  options?: Maybe<Array<Maybe<CustomizableOptionInterface>>>;
  /** If the product has multiple options, determines where they appear on the product page. */
  options_container?: Maybe<Scalars['String']['output']>;
  /**
   * Indicates the price of an item.
   * @deprecated Use `price_range` for product price information.
   */
  price?: Maybe<ProductPrices>;
  /** The range of prices for the product */
  price_range: PriceRange;
  /** An array of `TierPrice` objects. */
  price_tiers?: Maybe<Array<Maybe<TierPrice>>>;
  /** An array of `ProductLinks` objects. */
  product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>;
  /** Current status of the product */
  product_status?: Maybe<Scalars['String']['output']>;
  /** Quantity available for the product */
  qty?: Maybe<Scalars['Int']['output']>;
  /** Quantity of the product confirmed for sale */
  qty_confirmed?: Maybe<ProductQtyConfirmed>;
  /** Quantity of the product pending sale */
  qty_pending?: Maybe<ProductQtyPending>;
  /** Quantity of the product sold */
  qty_sold?: Maybe<ProductQtySold>;
  /** Amount of available stock */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** The average of all the ratings given to the product. */
  rating_summary: Scalars['Float']['output'];
  /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
  redirect_code: Scalars['Int']['output'];
  /** An array of products to be displayed in a Related Products block. */
  related_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
  relative_url?: Maybe<Scalars['String']['output']>;
  /** The total count of all the reviews given to the product. */
  review_count: Scalars['Int']['output'];
  /** The list of products reviews. */
  reviews: ProductReviews;
  /** @deprecated Use the `custom_attributes` field instead. */
  seller_id?: Maybe<Scalars['Int']['output']>;
  /** A short description of the product. Its use depends on the theme. */
  short_description?: Maybe<ComplexTextValue>;
  /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
  sku?: Maybe<Scalars['String']['output']>;
  /** The relative path to the small image, which is used on catalog pages. */
  small_image?: Maybe<ProductImage>;
  /**
   * The beginning date that a product has a special price.
   * @deprecated The field should not be used on the storefront.
   */
  special_from_date?: Maybe<Scalars['String']['output']>;
  /** The discounted price of the product. */
  special_price?: Maybe<Scalars['Float']['output']>;
  /** The end date for a product with a special price. */
  special_to_date?: Maybe<Scalars['String']['output']>;
  /** Stock status of the product */
  stock_status?: Maybe<ProductStockStatus>;
  /** The file name of a swatch image. */
  swatch_image?: Maybe<Scalars['String']['output']>;
  /** The relative path to the product's thumbnail image. */
  thumbnail?: Maybe<ProductImage>;
  /**
   * The price when tier pricing is in effect and the items purchased threshold has been reached.
   * @deprecated Use `price_tiers` for product tier price information.
   */
  tier_price?: Maybe<Scalars['Float']['output']>;
  /**
   * An array of ProductTierPrices objects.
   * @deprecated Use `price_tiers` for product tier price information.
   */
  tier_prices?: Maybe<Array<Maybe<ProductTierPrices>>>;
  /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
  type?: Maybe<UrlRewriteEntityTypeEnum>;
  /**
   * One of simple, virtual, bundle, downloadable, grouped, or configurable.
   * @deprecated Use `__typename` instead.
   */
  type_id?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `ProductInterface` object. */
  uid: Scalars['ID']['output'];
  /**
   * Timestamp indicating when the product was updated.
   * @deprecated The field should not be used on the storefront.
   */
  updated_at?: Maybe<Scalars['String']['output']>;
  /** Upsell Products */
  upsell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The part of the URL that identifies the product */
  url_key?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use product's `canonical_url` or url rewrites instead */
  url_path?: Maybe<Scalars['String']['output']>;
  /** URL rewrites list */
  url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>;
  /** The part of the product URL that is appended after the url key */
  url_suffix?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  voguish_featured?: Maybe<Scalars['String']['output']>;
  /**
   * An array of websites in which the product is available.
   * @deprecated The field should not be used on the storefront.
   */
  websites?: Maybe<Array<Maybe<Website>>>;
  /** The weight of the item, in units defined by the store. */
  weight?: Maybe<Scalars['Float']['output']>;
};


/** Defines a simple product, which is tangible and is usually sold in single units or in fixed quantities. */
export type SimpleProductAttributeValuesArgs = {
  attributeCode?: InputMaybe<Array<InputMaybe<AttributeCodeInput>>>;
};


/** Defines a simple product, which is tangible and is usually sold in single units or in fixed quantities. */
export type SimpleProductCustom_AttributesV2Args = {
  filters?: InputMaybe<AttributeFilterInput>;
};


/** Defines a simple product, which is tangible and is usually sold in single units or in fixed quantities. */
export type SimpleProductReviewsArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

/** Defines a single product to add to the cart. */
export type SimpleProductCartItemInput = {
  /** An array that defines customizable options for the product. */
  customizable_options?: InputMaybe<Array<InputMaybe<CustomizableOptionInput>>>;
  /** An object containing the `sku`, `quantity`, and other relevant information about the product. */
  data: CartItemInput;
};

/** Contains a simple product wish list item. */
export type SimpleWishlistItem = WishlistItemInterface & {
  __typename?: 'SimpleWishlistItem';
  /** The date and time the item was added to the wish list. */
  added_at: Scalars['String']['output'];
  /** Custom options selected for the wish list item. */
  customizable_options: Array<Maybe<SelectedCustomizableOption>>;
  /** The description of the item. */
  description?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `WishlistItemInterface` object. */
  id: Scalars['ID']['output'];
  /** Product details of the wish list item. */
  product?: Maybe<ProductInterface>;
  /** The quantity of this wish list item. */
  quantity: Scalars['Float']['output'];
};

/** Smart button payment inputs */
export type SmartButtonMethodInput = {
  /** The payment source for the payment method */
  payment_source?: InputMaybe<Scalars['String']['input']>;
  /** The payment services order ID */
  payments_order_id?: InputMaybe<Scalars['String']['input']>;
  /** PayPal order ID */
  paypal_order_id?: InputMaybe<Scalars['String']['input']>;
};

export type SmartButtonsConfig = PaymentConfigItem & {
  __typename?: 'SmartButtonsConfig';
  /** Indicated whether to use App Switch on enabled mobile devices */
  app_switch_when_available?: Maybe<Scalars['Boolean']['output']>;
  /** The styles for the PayPal Smart Button configuration */
  button_styles?: Maybe<ButtonStyles>;
  /** The payment method code as defined in the payment gateway */
  code?: Maybe<Scalars['String']['output']>;
  /** Indicates whether to display the PayPal Pay Later message */
  display_message?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether to display Venmo */
  display_venmo?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the payment method is displayed */
  is_visible?: Maybe<Scalars['Boolean']['output']>;
  /** Contains details about the styles for the PayPal Pay Later message */
  message_styles?: Maybe<MessageStyles>;
  /** Defines the payment intent (Authorize or Capture */
  payment_intent?: Maybe<Scalars['String']['output']>;
  /** The PayPal parameters required to load the JS SDK */
  sdk_params?: Maybe<Array<Maybe<SdkParams>>>;
  /** The relative order the payment method is displayed on the checkout page */
  sort_order?: Maybe<Scalars['String']['output']>;
  /** The name displayed for the payment method */
  title?: Maybe<Scalars['String']['output']>;
};

/** Indicates whether to return results in ascending or descending order. */
export enum SortEnum {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** Defines a possible sort field. */
export type SortField = {
  __typename?: 'SortField';
  /** The label of the sort field. */
  label?: Maybe<Scalars['String']['output']>;
  /** The attribute code of the sort field. */
  value?: Maybe<Scalars['String']['output']>;
};

/** Contains a default value for sort fields and all available sort fields. */
export type SortFields = {
  __typename?: 'SortFields';
  /** The default sort field value. */
  default?: Maybe<Scalars['String']['output']>;
  /** An array of possible sort fields. */
  options?: Maybe<Array<Maybe<SortField>>>;
};

export type SortOrderData = {
  __typename?: 'SortOrderData';
  /** Section Id */
  sectionId?: Maybe<Scalars['String']['output']>;
  /** Sort Order */
  sortOrder?: Maybe<Scalars['Int']['output']>;
};

/** Specifies the field to use for sorting quote items */
export enum SortQuoteItemsEnum {
  BaseDiscountAmount = 'BASE_DISCOUNT_AMOUNT',
  BaseDiscountTaxCompensationAmount = 'BASE_DISCOUNT_TAX_COMPENSATION_AMOUNT',
  BasePrice = 'BASE_PRICE',
  BasePriceIncTax = 'BASE_PRICE_INC_TAX',
  BaseRowTotal = 'BASE_ROW_TOTAL',
  BaseRowTotalIncTax = 'BASE_ROW_TOTAL_INC_TAX',
  BaseTaxAmount = 'BASE_TAX_AMOUNT',
  BaseTaxBeforeDiscount = 'BASE_TAX_BEFORE_DISCOUNT',
  CreatedAt = 'CREATED_AT',
  CustomPrice = 'CUSTOM_PRICE',
  Description = 'DESCRIPTION',
  DiscountAmount = 'DISCOUNT_AMOUNT',
  DiscountPercent = 'DISCOUNT_PERCENT',
  DiscountTaxCompensationAmount = 'DISCOUNT_TAX_COMPENSATION_AMOUNT',
  FreeShipping = 'FREE_SHIPPING',
  ItemId = 'ITEM_ID',
  Name = 'NAME',
  OriginalCustomPrice = 'ORIGINAL_CUSTOM_PRICE',
  Price = 'PRICE',
  PriceIncTax = 'PRICE_INC_TAX',
  ProductId = 'PRODUCT_ID',
  ProductType = 'PRODUCT_TYPE',
  Qty = 'QTY',
  RowTotal = 'ROW_TOTAL',
  RowTotalIncTax = 'ROW_TOTAL_INC_TAX',
  RowTotalWithDiscount = 'ROW_TOTAL_WITH_DISCOUNT',
  RowWeight = 'ROW_WEIGHT',
  Sku = 'SKU',
  TaxAmount = 'TAX_AMOUNT',
  TaxBeforeDiscount = 'TAX_BEFORE_DISCOUNT',
  TaxPercent = 'TAX_PERCENT',
  UpdatedAt = 'UPDATED_AT',
  Weight = 'WEIGHT'
}

/** Product stock data params for managing product stock */
export type StockDataInput = {
  /** Indicates whether stock should be managed for the product (1 = yes, 0 = no) */
  manage_stock: Scalars['Int']['input'];
  /** Indicates whether to use default stock management configuration (1 = yes, 0 = no) */
  use_config_manage_stock: Scalars['Int']['input'];
};

/** Contains information about a store's configuration. */
export type StoreConfig = {
  __typename?: 'StoreConfig';
  /** Contains scripts that must be included in the HTML before the closing `<body>` tag. */
  absolute_footer?: Maybe<Scalars['String']['output']>;
  /** Indicates whether guest users can write product reviews. Possible values: 1 (Yes) and 0 (No). */
  allow_guests_to_write_product_reviews?: Maybe<Scalars['String']['output']>;
  /** The value of the Allow Gift Messages for Order Items option */
  allow_items?: Maybe<Scalars['String']['output']>;
  /** The value of the Allow Gift Messages on Order Level option */
  allow_order?: Maybe<Scalars['String']['output']>;
  application_icon_48?: Maybe<Scalars['String']['output']>;
  application_icon_72?: Maybe<Scalars['String']['output']>;
  application_icon_96?: Maybe<Scalars['String']['output']>;
  application_icon_144?: Maybe<Scalars['String']['output']>;
  application_icon_168?: Maybe<Scalars['String']['output']>;
  application_icon_192?: Maybe<Scalars['String']['output']>;
  application_icon_384?: Maybe<Scalars['String']['output']>;
  application_icon_512?: Maybe<Scalars['String']['output']>;
  application_name?: Maybe<Scalars['String']['output']>;
  application_short_name?: Maybe<Scalars['String']['output']>;
  /** Indicates whether to enable autocomplete on login and forgot password forms. */
  autocomplete_on_storefront?: Maybe<Scalars['Boolean']['output']>;
  /** The base currency code. */
  base_currency_code?: Maybe<Scalars['String']['output']>;
  /** A fully-qualified URL that is used to create relative links to the `base_url`. */
  base_link_url?: Maybe<Scalars['String']['output']>;
  /** The fully-qualified URL that specifies the location of media files. */
  base_media_url?: Maybe<Scalars['String']['output']>;
  /** The fully-qualified URL that specifies the location of static view files. */
  base_static_url?: Maybe<Scalars['String']['output']>;
  /** The store’s fully-qualified base URL. */
  base_url?: Maybe<Scalars['String']['output']>;
  /** BeReal logo URL */
  bereal_url?: Maybe<Scalars['String']['output']>;
  bg_color?: Maybe<Scalars['String']['output']>;
  /** Braintree 3D Secure, should 3D Secure be used for specific countries. */
  braintree_3dsecure_allowspecific?: Maybe<Scalars['Boolean']['output']>;
  /** Braintree 3D Secure, always request 3D Secure flag. */
  braintree_3dsecure_always_request_3ds?: Maybe<Scalars['Boolean']['output']>;
  /** Braintree 3D Secure, the specific countries to use 3D Secure in, to be used if allow specific is status is enabled. */
  braintree_3dsecure_specificcountry?: Maybe<Scalars['String']['output']>;
  /** Braintree 3D Secure, threshold above which 3D Secure should be requested. */
  braintree_3dsecure_threshold_amount?: Maybe<Scalars['String']['output']>;
  /** Braintree 3D Secure enabled/active status. */
  braintree_3dsecure_verify_3dsecure?: Maybe<Scalars['Boolean']['output']>;
  /** Braintree ACH vault status. */
  braintree_ach_direct_debit_vault_active?: Maybe<Scalars['Boolean']['output']>;
  /** Braintree Apple Pay merchant name. */
  braintree_applepay_merchant_name?: Maybe<Scalars['String']['output']>;
  /** Braintree Apple Pay vault status. */
  braintree_applepay_vault_active?: Maybe<Scalars['Boolean']['output']>;
  /** Braintree cc vault status. */
  braintree_cc_vault_active?: Maybe<Scalars['String']['output']>;
  /** Braintree cc vault CVV re-verification enabled status. */
  braintree_cc_vault_cvv?: Maybe<Scalars['Boolean']['output']>;
  /** Braintree environment. */
  braintree_environment?: Maybe<Scalars['String']['output']>;
  /** Braintree Google Pay button color. */
  braintree_googlepay_btn_color?: Maybe<Scalars['String']['output']>;
  /** Braintree Google Pay Card types supported. */
  braintree_googlepay_cctypes?: Maybe<Scalars['String']['output']>;
  /** Braintree Google Pay merchant ID. */
  braintree_googlepay_merchant_id?: Maybe<Scalars['String']['output']>;
  /** Braintree Google Pay vault status. */
  braintree_googlepay_vault_active?: Maybe<Scalars['Boolean']['output']>;
  /** Braintree Local Payment Methods allowed payment methods. */
  braintree_local_payment_allowed_methods?: Maybe<Scalars['String']['output']>;
  /** Braintree Local Payment Methods fallback button text. */
  braintree_local_payment_fallback_button_text?: Maybe<Scalars['String']['output']>;
  /** Braintree Local Payment Methods redirect URL on failed payment. */
  braintree_local_payment_redirect_on_fail?: Maybe<Scalars['String']['output']>;
  /** Braintree Merchant Account ID. */
  braintree_merchant_account_id?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal Credit mini-cart & cart button style color. */
  braintree_paypal_button_location_cart_type_credit_color?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal Credit mini-cart & cart button style label. */
  braintree_paypal_button_location_cart_type_credit_label?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal Credit mini-cart & cart button style shape. */
  braintree_paypal_button_location_cart_type_credit_shape?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal Credit mini-cart & cart button show status. */
  braintree_paypal_button_location_cart_type_credit_show?: Maybe<Scalars['Boolean']['output']>;
  /** Braintree PayPal Pay Later messaging mini-cart & cart style layout. */
  braintree_paypal_button_location_cart_type_messaging_layout?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal Pay Later messaging mini-cart & cart style logo. */
  braintree_paypal_button_location_cart_type_messaging_logo?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal Pay Later messaging mini-cart & cart style logo position. */
  braintree_paypal_button_location_cart_type_messaging_logo_position?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal Pay Later messaging mini-cart & cart show status. */
  braintree_paypal_button_location_cart_type_messaging_show?: Maybe<Scalars['Boolean']['output']>;
  /** Braintree PayPal Pay Later messaging checkout style text color. */
  braintree_paypal_button_location_cart_type_messaging_text_color?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal Pay Later mini-cart & cart button style color. */
  braintree_paypal_button_location_cart_type_paylater_color?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal Pay Later mini-cart & cart button style label. */
  braintree_paypal_button_location_cart_type_paylater_label?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal Pay Later mini-cart & cart button style shape. */
  braintree_paypal_button_location_cart_type_paylater_shape?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal Pay Later mini-cart & cart button show status. */
  braintree_paypal_button_location_cart_type_paylater_show?: Maybe<Scalars['Boolean']['output']>;
  /** Braintree PayPal mini-cart & cart button style color. */
  braintree_paypal_button_location_cart_type_paypal_color?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal mini-cart & cart button style label. */
  braintree_paypal_button_location_cart_type_paypal_label?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal mini-cart & cart button style shape. */
  braintree_paypal_button_location_cart_type_paypal_shape?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal mini-cart & cart button show. */
  braintree_paypal_button_location_cart_type_paypal_show?: Maybe<Scalars['Boolean']['output']>;
  /** Braintree PayPal Credit checkout button style color. */
  braintree_paypal_button_location_checkout_type_credit_color?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal Credit checkout button style label. */
  braintree_paypal_button_location_checkout_type_credit_label?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal Credit checkout button style shape. */
  braintree_paypal_button_location_checkout_type_credit_shape?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal Credit checkout button show status. */
  braintree_paypal_button_location_checkout_type_credit_show?: Maybe<Scalars['Boolean']['output']>;
  /** Braintree PayPal Pay Later messaging checkout style layout. */
  braintree_paypal_button_location_checkout_type_messaging_layout?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal Pay Later messaging checkout style logo. */
  braintree_paypal_button_location_checkout_type_messaging_logo?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal Pay Later messaging checkout style logo position. */
  braintree_paypal_button_location_checkout_type_messaging_logo_position?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal Pay Later messaging checkout show status. */
  braintree_paypal_button_location_checkout_type_messaging_show?: Maybe<Scalars['Boolean']['output']>;
  /** Braintree PayPal Pay Later messaging checkout style text color. */
  braintree_paypal_button_location_checkout_type_messaging_text_color?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal Pay Later checkout button style color. */
  braintree_paypal_button_location_checkout_type_paylater_color?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal Pay Later checkout button style label. */
  braintree_paypal_button_location_checkout_type_paylater_label?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal Pay Later checkout button style shape. */
  braintree_paypal_button_location_checkout_type_paylater_shape?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal Pay Later checkout button show status. */
  braintree_paypal_button_location_checkout_type_paylater_show?: Maybe<Scalars['Boolean']['output']>;
  /** Braintree PayPal checkout button style color. */
  braintree_paypal_button_location_checkout_type_paypal_color?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal checkout button style label. */
  braintree_paypal_button_location_checkout_type_paypal_label?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal checkout button style shape. */
  braintree_paypal_button_location_checkout_type_paypal_shape?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal checkout button show. */
  braintree_paypal_button_location_checkout_type_paypal_show?: Maybe<Scalars['Boolean']['output']>;
  /** Braintree PayPal Credit PDP button style color. */
  braintree_paypal_button_location_productpage_type_credit_color?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal Credit PDP button style label. */
  braintree_paypal_button_location_productpage_type_credit_label?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal Credit PDP button style shape. */
  braintree_paypal_button_location_productpage_type_credit_shape?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal Credit PDP button show status. */
  braintree_paypal_button_location_productpage_type_credit_show?: Maybe<Scalars['Boolean']['output']>;
  /** Braintree PayPal Pay Later messaging PDP style layout. */
  braintree_paypal_button_location_productpage_type_messaging_layout?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal Pay Later messaging PDP style logo. */
  braintree_paypal_button_location_productpage_type_messaging_logo?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal Pay Later messaging PDP style logo position. */
  braintree_paypal_button_location_productpage_type_messaging_logo_position?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal Pay Later messaging PDP show status. */
  braintree_paypal_button_location_productpage_type_messaging_show?: Maybe<Scalars['Boolean']['output']>;
  /** Braintree PayPal Pay Later messaging PDP style text color. */
  braintree_paypal_button_location_productpage_type_messaging_text_color?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal Pay Later PDP button style color. */
  braintree_paypal_button_location_productpage_type_paylater_color?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal Pay Later PDP button style label. */
  braintree_paypal_button_location_productpage_type_paylater_label?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal Pay Later PDP button style shape. */
  braintree_paypal_button_location_productpage_type_paylater_shape?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal Pay Later PDP button show status. */
  braintree_paypal_button_location_productpage_type_paylater_show?: Maybe<Scalars['Boolean']['output']>;
  /** Braintree PayPal PDP button style color. */
  braintree_paypal_button_location_productpage_type_paypal_color?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal PDP button style label. */
  braintree_paypal_button_location_productpage_type_paypal_label?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal PDP button style shape. */
  braintree_paypal_button_location_productpage_type_paypal_shape?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal PDP button show. */
  braintree_paypal_button_location_productpage_type_paypal_show?: Maybe<Scalars['Boolean']['output']>;
  /** Braintree PayPal Credit Merchant Name on the FCA Register. */
  braintree_paypal_credit_uk_merchant_name?: Maybe<Scalars['String']['output']>;
  /** Should display Braintree PayPal in mini-cart & cart? */
  braintree_paypal_display_on_shopping_cart?: Maybe<Scalars['Boolean']['output']>;
  /** Braintree PayPal merchant's country. */
  braintree_paypal_merchant_country?: Maybe<Scalars['String']['output']>;
  /** Braintree PayPal override for Merchant Name. */
  braintree_paypal_merchant_name_override?: Maybe<Scalars['String']['output']>;
  /** Does Braintree PayPal require the customer's billing address? */
  braintree_paypal_require_billing_address?: Maybe<Scalars['Boolean']['output']>;
  /** Does Braintree PayPal require the order line items? */
  braintree_paypal_send_cart_line_items?: Maybe<Scalars['Boolean']['output']>;
  /** Braintree PayPal vault status. */
  braintree_paypal_vault_active?: Maybe<Scalars['Boolean']['output']>;
  /** checkout/cart/delete_quote_after: quote lifetime in days. */
  cart_expires_in_days?: Maybe<Scalars['Int']['output']>;
  /** checkout/cart_link/use_qty: what to show in the display cart summary, number of items or item quantities. */
  cart_summary_display_quantity?: Maybe<Scalars['Int']['output']>;
  /** The default sort order of the search results list. */
  catalog_default_sort_by?: Maybe<Scalars['String']['output']>;
  /** Corresponds to the 'Display Prices In Product Lists' field in the Admin. It indicates how FPT information is displayed on category pages. */
  category_fixed_product_tax_display_setting?: Maybe<FixedProductTaxDisplaySettings>;
  /** The suffix applied to category pages, such as `.htm` or `.html`. */
  category_url_suffix?: Maybe<Scalars['String']['output']>;
  /** Indicates whether only specific countries can use this payment method. */
  check_money_order_enable_for_specific_countries?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the Check/Money Order payment method is enabled. */
  check_money_order_enabled?: Maybe<Scalars['Boolean']['output']>;
  /** The name of the party to whom the check must be payable. */
  check_money_order_make_check_payable_to?: Maybe<Scalars['String']['output']>;
  /** The maximum order amount required to qualify for the Check/Money Order payment method. */
  check_money_order_max_order_total?: Maybe<Scalars['String']['output']>;
  /** The minimum order amount required to qualify for the Check/Money Order payment method. */
  check_money_order_min_order_total?: Maybe<Scalars['String']['output']>;
  /** The status of new orders placed using the Check/Money Order payment method. */
  check_money_order_new_order_status?: Maybe<Scalars['String']['output']>;
  /** A comma-separated list of specific countries allowed to use the Check/Money Order payment method. */
  check_money_order_payment_from_specific_countries?: Maybe<Scalars['String']['output']>;
  /** The full street address or PO Box where the checks are mailed. */
  check_money_order_send_check_to?: Maybe<Scalars['String']['output']>;
  /** A number indicating the position of the Check/Money Order payment method in the list of available payment methods during checkout. */
  check_money_order_sort_order?: Maybe<Scalars['Int']['output']>;
  /** The title of the Check/Money Order payment method displayed on the storefront. */
  check_money_order_title?: Maybe<Scalars['String']['output']>;
  /** Clubhouse logo URL */
  clubhouse_url?: Maybe<Scalars['String']['output']>;
  /** The name of the CMS page that identifies the home page for the store. */
  cms_home_page?: Maybe<Scalars['String']['output']>;
  /** A specific CMS page that displays when cookies are not enabled for the browser. */
  cms_no_cookies?: Maybe<Scalars['String']['output']>;
  /** A specific CMS page that displays when a 404 'Page Not Found' error occurs. */
  cms_no_route?: Maybe<Scalars['String']['output']>;
  /**
   * A code assigned to the store to identify it.
   * @deprecated Use `store_code` instead.
   */
  code?: Maybe<Scalars['String']['output']>;
  /** checkout/cart/configurable_product_image: which image to use for configurable products. */
  configurable_product_image: ProductImageThumbnail;
  /** Indicates whether the `parent` or child (`itself`) thumbnail should be used in the cart for configurable products. */
  configurable_thumbnail_source?: Maybe<Scalars['String']['output']>;
  /** Indicates whether the Contact Us form in enabled. */
  contact_enabled: Scalars['Boolean']['output'];
  /** The copyright statement that appears at the bottom of each page. */
  copyright?: Maybe<Scalars['String']['output']>;
  /** Extended Config Data - general/region/state_required */
  countries_with_required_region?: Maybe<Scalars['String']['output']>;
  /** Indicates if the new accounts need confirmation. */
  create_account_confirmation?: Maybe<Scalars['Boolean']['output']>;
  /** Customer access token lifetime. */
  customer_access_token_lifetime?: Maybe<Scalars['Float']['output']>;
  /** Customer Oauth Access Token Lifetime Hour */
  customer_token_lifetime?: Maybe<Scalars['String']['output']>;
  /** Extended Config Data - general/country/default */
  default_country?: Maybe<Scalars['String']['output']>;
  /** The description that provides a summary of your site for search engine listings. It should not be more than 160 characters in length. */
  default_description?: Maybe<Scalars['String']['output']>;
  /** The default display currency code. */
  default_display_currency_code?: Maybe<Scalars['String']['output']>;
  /** A series of keywords that describe your store, each separated by a comma. */
  default_keywords?: Maybe<Scalars['String']['output']>;
  /** The title that appears at the title bar of each page when viewed in a browser. */
  default_title?: Maybe<Scalars['String']['output']>;
  /** Controls the display of the demo store notice at the top of the page. Options: 0 (No) or 1 (Yes). */
  demonotice?: Maybe<Scalars['Int']['output']>;
  /** Discord logo URL */
  discord_url?: Maybe<Scalars['String']['output']>;
  /** Configuration data from tax/display/type */
  display_product_prices_in_catalog: Scalars['Int']['output'];
  /** Configuration data from tax/display/shipping */
  display_shipping_prices: Scalars['Int']['output'];
  /** Extended Config Data - general/region/display_all */
  display_state_if_optional?: Maybe<Scalars['Boolean']['output']>;
  /** Facebook logo URL */
  facebook_url?: Maybe<Scalars['String']['output']>;
  /** Configuration data from tax/weee/apply_vat */
  fixed_product_taxes_apply_tax_to_fpt: Scalars['Boolean']['output'];
  /** Configuration data from tax/weee/display_email */
  fixed_product_taxes_display_prices_in_emails: Scalars['Int']['output'];
  /** Configuration data from tax/weee/display_list */
  fixed_product_taxes_display_prices_in_product_lists: Scalars['Int']['output'];
  /** Configuration data from tax/weee/display_sales */
  fixed_product_taxes_display_prices_in_sales_modules: Scalars['Int']['output'];
  /** Configuration data from tax/weee/display */
  fixed_product_taxes_display_prices_on_product_view_page: Scalars['Int']['output'];
  /** Configuration data from tax/weee/enable */
  fixed_product_taxes_enable: Scalars['Boolean']['output'];
  /** Configuration data from tax/weee/include_in_subtotal */
  fixed_product_taxes_include_fpt_in_subtotal: Scalars['Boolean']['output'];
  /** The landing page that is associated with the base URL. */
  front?: Maybe<Scalars['String']['output']>;
  /** The default number of products per page in Grid View. */
  grid_per_page?: Maybe<Scalars['Int']['output']>;
  /** A list of numbers that define how many products can be displayed in Grid View. */
  grid_per_page_values?: Maybe<Scalars['String']['output']>;
  /** checkout/cart/grouped_product_image: which image to use for grouped products. */
  grouped_product_image: ProductImageThumbnail;
  /** Scripts that must be included in the HTML before the closing `<head>` tag. */
  head_includes?: Maybe<Scalars['String']['output']>;
  /** The small graphic image (favicon) that appears in the address bar and tab of the browser. */
  head_shortcut_icon?: Maybe<Scalars['String']['output']>;
  /** The path to the logo that appears in the header. */
  header_logo_src?: Maybe<Scalars['String']['output']>;
  /**
   * The ID number assigned to the store.
   * @deprecated Use `store_code` instead.
   */
  id?: Maybe<Scalars['Int']['output']>;
  /** Instagram logo URL */
  instagram_url?: Maybe<Scalars['String']['output']>;
  /** Configuration data from checkout/options/enable_agreements */
  is_checkout_agreements_enabled: Scalars['Boolean']['output'];
  /** Indicates whether the store view has been designated as the default within the store group. */
  is_default_store?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the store group has been designated as the default within the website. */
  is_default_store_group?: Maybe<Scalars['Boolean']['output']>;
  /** checkout/options/guest_checkout: whether the guest checkout is enabled or not. */
  is_guest_checkout_enabled?: Maybe<Scalars['Boolean']['output']>;
  /** checkout/options/onepage_checkout_enabled: whether the one page checkout is enabled or not */
  is_one_page_checkout_enabled?: Maybe<Scalars['Boolean']['output']>;
  /** Linkedin logo URL */
  linkedin_url?: Maybe<Scalars['String']['output']>;
  /** The format of the search results list. */
  list_mode?: Maybe<Scalars['String']['output']>;
  /** The default number of products per page in List View. */
  list_per_page?: Maybe<Scalars['Int']['output']>;
  /** A list of numbers that define how many products can be displayed in List View. */
  list_per_page_values?: Maybe<Scalars['String']['output']>;
  /** The store locale. */
  locale?: Maybe<Scalars['String']['output']>;
  /** The Alt text that is associated with the logo. */
  logo_alt?: Maybe<Scalars['String']['output']>;
  /** The height of the logo image, in pixels. */
  logo_height?: Maybe<Scalars['Int']['output']>;
  /** The width of the logo image, in pixels. */
  logo_width?: Maybe<Scalars['Int']['output']>;
  /** Indicates whether wishlists are enabled (1) or disabled (0). */
  magento_wishlist_general_is_enabled?: Maybe<Scalars['String']['output']>;
  /** Admin name for the marketplace settings */
  marketplace_general_settings_admin_name?: Maybe<Scalars['String']['output']>;
  /** Admin email for the marketplace settings */
  marketplace_general_settings_adminemail?: Maybe<Scalars['String']['output']>;
  /** Captcha setting for seller registration and other actions */
  marketplace_general_settings_captcha?: Maybe<Scalars['String']['output']>;
  /** Setting for deducting discounts from marketplace fees */
  marketplace_general_settings_deduct_discount?: Maybe<Scalars['String']['output']>;
  /** Image for marketplace fulfillment settings */
  marketplace_general_settings_fulfilment_image?: Maybe<Scalars['String']['output']>;
  /** Label for marketplace fulfillment settings */
  marketplace_general_settings_fulfilment_label?: Maybe<Scalars['String']['output']>;
  /** Text description for marketplace fulfillment settings */
  marketplace_general_settings_fulfilment_text?: Maybe<Scalars['String']['output']>;
  /** Google Analytics integration settings for tracking marketplace activity */
  marketplace_general_settings_google_analytic?: Maybe<Scalars['String']['output']>;
  /** Percentage setting for marketplace (e.g., commission rate) */
  marketplace_general_settings_percent?: Maybe<Scalars['String']['output']>;
  /** Setting to require approval for sellers before they can list products */
  marketplace_general_settings_seller_approval?: Maybe<Scalars['String']['output']>;
  /** Tax management settings for the marketplace */
  marketplace_general_settings_tax_manage?: Maybe<Scalars['String']['output']>;
  /** Flag to check if Marketplace module is active or not */
  marketplace_is_active?: Maybe<Scalars['Boolean']['output']>;
  /** Admin name for the layered navigation settings */
  marketplace_layered_navigation_admin_name?: Maybe<Scalars['String']['output']>;
  /** Flag to enable layered navigation for product search */
  marketplace_layered_navigation_enable?: Maybe<Scalars['String']['output']>;
  /** Setting to determine if there should be a separate panel for marketplace settings */
  marketplace_layout_settings_is_separate_panel?: Maybe<Scalars['String']['output']>;
  /** Minimum order amount required in the marketplace */
  marketplace_min_order_settings_amount?: Maybe<Scalars['String']['output']>;
  /** Flag to apply minimum order amount for each seller */
  marketplace_min_order_settings_for_seller?: Maybe<Scalars['String']['output']>;
  /** Flag to enable or disable minimum order amount setting */
  marketplace_min_order_settings_min_order_status?: Maybe<Scalars['String']['output']>;
  /** Status for guest users interacting with product flags */
  marketplace_product_flag_guest_status?: Maybe<Scalars['String']['output']>;
  /** Other reason for flagging a product */
  marketplace_product_flag_other_reason?: Maybe<Scalars['String']['output']>;
  /** Label for the other reason in product flags */
  marketplace_product_flag_other_reason_label?: Maybe<Scalars['String']['output']>;
  /** Label for product flags */
  marketplace_product_flag_product_flag_label?: Maybe<Scalars['String']['output']>;
  /** Reason for flagging a product */
  marketplace_product_flag_reason?: Maybe<Scalars['String']['output']>;
  /** Flag to enable or disable product flags */
  marketplace_product_flag_status?: Maybe<Scalars['String']['output']>;
  /** Flag to allow sellers to add cross-sell products */
  marketplace_product_settings_allow_crosssell_product?: Maybe<Scalars['String']['output']>;
  /** Setting to allow or disallow certain features for sellers */
  marketplace_product_settings_allow_for_seller?: Maybe<Scalars['String']['output']>;
  /** Limit on the number of products a seller can list */
  marketplace_product_settings_allow_product_limit?: Maybe<Scalars['String']['output']>;
  /** Flag to allow sellers to add related products */
  marketplace_product_settings_allow_related_product?: Maybe<Scalars['String']['output']>;
  /** Flag to allow sellers to add upsell products */
  marketplace_product_settings_allow_upsell_product?: Maybe<Scalars['String']['output']>;
  /** ID for the product attribute set used in the marketplace */
  marketplace_product_settings_attributesetid?: Maybe<Scalars['String']['output']>;
  /** List of category IDs for products in the marketplace */
  marketplace_product_settings_categoryids?: Maybe<Scalars['String']['output']>;
  /** Global limit on the number of products across all sellers */
  marketplace_product_settings_global_product_limit?: Maybe<Scalars['String']['output']>;
  /** Flag to enable admin view of category tree for product listing */
  marketplace_product_settings_is_admin_view_category_tree?: Maybe<Scalars['String']['output']>;
  /** Setting for requiring product approval before listing */
  marketplace_product_settings_product_approval?: Maybe<Scalars['String']['output']>;
  /** Setting for requiring approval to edit listed products */
  marketplace_product_settings_product_edit_approval?: Maybe<Scalars['String']['output']>;
  /** Prefix for the SKU of marketplace products */
  marketplace_product_settings_sku_prefix?: Maybe<Scalars['String']['output']>;
  /** SKU type configuration for marketplace products */
  marketplace_product_settings_sku_type?: Maybe<Scalars['String']['output']>;
  /** Category for product hints */
  marketplace_producthint_settings_product_category?: Maybe<Scalars['String']['output']>;
  /** Description for the product hint */
  marketplace_producthint_settings_product_des?: Maybe<Scalars['String']['output']>;
  /** End date of the product hint */
  marketplace_producthint_settings_product_edate?: Maybe<Scalars['String']['output']>;
  /** Flag to enable or disable product hinting */
  marketplace_producthint_settings_product_enable?: Maybe<Scalars['String']['output']>;
  /** Flag to enable or disable product hints */
  marketplace_producthint_settings_product_hint_status?: Maybe<Scalars['String']['output']>;
  /** Image of the product for hinting */
  marketplace_producthint_settings_product_image?: Maybe<Scalars['String']['output']>;
  /** Name of the product for hinting */
  marketplace_producthint_settings_product_name?: Maybe<Scalars['String']['output']>;
  /** Price of the product for hinting */
  marketplace_producthint_settings_product_price?: Maybe<Scalars['String']['output']>;
  /** Stock quantity of the product for hinting */
  marketplace_producthint_settings_product_qty?: Maybe<Scalars['String']['output']>;
  /** Start date of the product hint */
  marketplace_producthint_settings_product_sdate?: Maybe<Scalars['String']['output']>;
  /** Short description for the product hint */
  marketplace_producthint_settings_product_sdes?: Maybe<Scalars['String']['output']>;
  /** SKU of the product for hinting */
  marketplace_producthint_settings_product_sku?: Maybe<Scalars['String']['output']>;
  /** Special price of the product for hinting */
  marketplace_producthint_settings_product_sprice?: Maybe<Scalars['String']['output']>;
  /** Stock availability of the product for hinting */
  marketplace_producthint_settings_product_stock?: Maybe<Scalars['String']['output']>;
  /** Tax status for the product hint */
  marketplace_producthint_settings_product_tax?: Maybe<Scalars['String']['output']>;
  /** Weight of the product for hinting */
  marketplace_producthint_settings_product_weight?: Maybe<Scalars['String']['output']>;
  /** Color picker settings for the seller's active profile theme */
  marketplace_profile_settings_activecolorpicker?: Maybe<Scalars['String']['output']>;
  /** Flag to automatically rewrite URLs for seller profiles */
  marketplace_profile_settings_auto_url_rewrite?: Maybe<Scalars['String']['output']>;
  /** URL or image for the seller's profile banner */
  marketplace_profile_settings_banner?: Maybe<Scalars['String']['output']>;
  /** Type of cards used in the seller profile */
  marketplace_profile_settings_card_type?: Maybe<Scalars['String']['output']>;
  /** Type of profile a seller can set up */
  marketplace_profile_settings_profile_type?: Maybe<Scalars['String']['output']>;
  /** Flag for requiring seller policy approval */
  marketplace_profile_settings_seller_policy_approval?: Maybe<Scalars['String']['output']>;
  /** Flag to control visibility of seller profile display */
  marketplace_profile_settings_seller_profile_display?: Maybe<Scalars['String']['output']>;
  /** Setting for URL rewriting for seller profile pages */
  marketplace_profile_settings_url_rewrite?: Maybe<Scalars['String']['output']>;
  /** Flag to mark a seller as featured */
  marketplace_profile_settings_vendor_featured?: Maybe<Scalars['String']['output']>;
  /** Hint for becoming a seller in the marketplace */
  marketplace_profilehint_settings_become_seller?: Maybe<Scalars['String']['output']>;
  /** Hint for the seller's bank details or payment information. */
  marketplace_profilehint_settings_profile_bank?: Maybe<Scalars['String']['output']>;
  /** Hint for the shop banner or header image. */
  marketplace_profilehint_settings_profile_banner?: Maybe<Scalars['String']['output']>;
  /** Hint for the business card or key identifier of the seller. */
  marketplace_profilehint_settings_profile_bc?: Maybe<Scalars['String']['output']>;
  /** Hint for company name in seller's profile */
  marketplace_profilehint_settings_profile_cn?: Maybe<Scalars['String']['output']>;
  /** Hint for the seller's country of operation. */
  marketplace_profilehint_settings_profile_country?: Maybe<Scalars['String']['output']>;
  /** Hint for the seller's profile description. */
  marketplace_profilehint_settings_profile_desciption?: Maybe<Scalars['String']['output']>;
  /** Hint for Facebook profile in seller's profile */
  marketplace_profilehint_settings_profile_fb?: Maybe<Scalars['String']['output']>;
  /** Hint for Google+ profile in seller's profile */
  marketplace_profilehint_settings_profile_google?: Maybe<Scalars['String']['output']>;
  /** Flag to enable or disable profile hints */
  marketplace_profilehint_settings_profile_hint_status?: Maybe<Scalars['String']['output']>;
  /** Hint for Instagram profile in seller's profile */
  marketplace_profilehint_settings_profile_inst?: Maybe<Scalars['String']['output']>;
  /** Hint for the shop's physical or operational location. */
  marketplace_profilehint_settings_profile_loc?: Maybe<Scalars['String']['output']>;
  /** Hint for the shop logo or branding image. */
  marketplace_profilehint_settings_profile_logo?: Maybe<Scalars['String']['output']>;
  /** Hint for the meta description of the seller's profile. */
  marketplace_profilehint_settings_profile_mdesc?: Maybe<Scalars['String']['output']>;
  /** Hint for meta information associated with the seller's profile. */
  marketplace_profilehint_settings_profile_meta?: Maybe<Scalars['String']['output']>;
  /** Hint for Pinterest profile in seller's profile */
  marketplace_profilehint_settings_profile_pin?: Maybe<Scalars['String']['output']>;
  /** Hint for the shop name or display name of the seller. */
  marketplace_profilehint_settings_profile_shop?: Maybe<Scalars['String']['output']>;
  /** Hint for the seller's tax information. */
  marketplace_profilehint_settings_profile_tax?: Maybe<Scalars['String']['output']>;
  /** Hint for Twitter profile in seller's profile */
  marketplace_profilehint_settings_profile_tw?: Maybe<Scalars['String']['output']>;
  /** Hint for Vimeo profile in seller's profile */
  marketplace_profilehint_settings_profile_vimeo?: Maybe<Scalars['String']['output']>;
  /** Hint for YouTube profile in seller's profile */
  marketplace_profilehint_settings_profile_youtube?: Maybe<Scalars['String']['output']>;
  /** Hint for the seller's return policy details. */
  marketplace_profilehint_settings_returnpolicy?: Maybe<Scalars['String']['output']>;
  /** Hint for the seller's shipping policy details. */
  marketplace_profilehint_settings_shippingpolicy?: Maybe<Scalars['String']['output']>;
  /** Hint for seller's shop URL */
  marketplace_profilehint_settings_shopurl_seller?: Maybe<Scalars['String']['output']>;
  /** Flag to enable or disable product reviews in the marketplace */
  marketplace_review_settings_review_status?: Maybe<Scalars['String']['output']>;
  /** Reason for guest users flagging a seller */
  marketplace_seller_flag_guest_reason?: Maybe<Scalars['String']['output']>;
  /** Other reason for seller flagging */
  marketplace_seller_flag_other_reason?: Maybe<Scalars['String']['output']>;
  /** Label for the other reason flag */
  marketplace_seller_flag_other_reason_label?: Maybe<Scalars['String']['output']>;
  /** Label for the seller flag */
  marketplace_seller_flag_seller_flag_label?: Maybe<Scalars['String']['output']>;
  /** Flag to indicate whether seller flags are enabled */
  marketplace_seller_flag_status?: Maybe<Scalars['String']['output']>;
  /** Flag to allow collection URLs in the sitemap */
  marketplace_sitemap_allow_collection_url?: Maybe<Scalars['String']['output']>;
  /** Flag to allow the seller profile URL in the sitemap */
  marketplace_sitemap_allow_profile_url?: Maybe<Scalars['String']['output']>;
  /** Change frequency for collection URLs in the sitemap */
  marketplace_sitemap_collection_url_changefreq?: Maybe<Scalars['String']['output']>;
  /** Priority of collection URLs in the sitemap */
  marketplace_sitemap_collection_url_priority?: Maybe<Scalars['String']['output']>;
  /** Flag to enable the marketplace sitemap */
  marketplace_sitemap_enable?: Maybe<Scalars['String']['output']>;
  /** Change frequency for seller profile URLs in the sitemap */
  marketplace_sitemap_profile_url_changefreq?: Maybe<Scalars['String']['output']>;
  /** Priority of seller profile URLs in the sitemap */
  marketplace_sitemap_profile_url_priority?: Maybe<Scalars['String']['output']>;
  /** checkout/options/max_items_display_count: maximum number of items to display in order summary. */
  max_items_in_order_summary?: Maybe<Scalars['Int']['output']>;
  /** checkout/sidebar/display: whether to display the minicart or not. */
  minicart_display?: Maybe<Scalars['Boolean']['output']>;
  /** checkout/sidebar/count: maximum number of items to show in minicart. */
  minicart_max_items?: Maybe<Scalars['Int']['output']>;
  /** The minimum number of characters required for a valid password. */
  minimum_password_length?: Maybe<Scalars['String']['output']>;
  /** Indicates whether newsletters are enabled. */
  newsletter_enabled: Scalars['Boolean']['output'];
  /** The default page that displays when a 404 'Page not Found' error occurs. */
  no_route?: Maybe<Scalars['String']['output']>;
  /** Extended Config Data - general/country/optional_zip_countries */
  optional_zip_countries?: Maybe<Scalars['String']['output']>;
  /** Indicates whether orders can be cancelled by customers or not. */
  order_cancellation_enabled: Scalars['Boolean']['output'];
  /** An array containing available cancellation reasons. */
  order_cancellation_reasons: Array<Maybe<CancellationReason>>;
  /** Configuration data from tax/sales_display/full_summary */
  orders_invoices_credit_memos_display_full_summary: Scalars['Boolean']['output'];
  /** Configuration data from tax/sales_display/grandtotal */
  orders_invoices_credit_memos_display_grandtotal: Scalars['Boolean']['output'];
  /** Configuration data from tax/sales_display/price */
  orders_invoices_credit_memos_display_price: Scalars['Int']['output'];
  /** Configuration data from tax/sales_display/shipping */
  orders_invoices_credit_memos_display_shipping_amount: Scalars['Int']['output'];
  /** Configuration data from tax/sales_display/subtotal */
  orders_invoices_credit_memos_display_subtotal: Scalars['Int']['output'];
  /** Configuration data from tax/sales_display/zero_tax */
  orders_invoices_credit_memos_display_zero_tax: Scalars['Boolean']['output'];
  /** Payflow Pro vault status. */
  payment_payflowpro_cc_vault_active?: Maybe<Scalars['String']['output']>;
  /** Pinterest logo URL */
  pinterest_url?: Maybe<Scalars['String']['output']>;
  /** Corresponds to the 'Display Prices On Product View Page' field in the Admin. It indicates how FPT information is displayed on product pages. */
  product_fixed_product_tax_display_setting?: Maybe<FixedProductTaxDisplaySettings>;
  /** Indicates whether product reviews are enabled. Possible values: 1 (Yes) and 0 (No). */
  product_reviews_enabled?: Maybe<Scalars['String']['output']>;
  /** The suffix applied to product pages, such as `.htm` or `.html`. */
  product_url_suffix?: Maybe<Scalars['String']['output']>;
  /** Reddit logo URL */
  reddit_url?: Maybe<Scalars['String']['output']>;
  /** The number of different character classes (lowercase, uppercase, digits, special characters) required in a password. */
  required_character_classes_number?: Maybe<Scalars['String']['output']>;
  /**
   * The ID of the root category.
   * @deprecated Use `root_category_uid` instead.
   */
  root_category_id?: Maybe<Scalars['Int']['output']>;
  /** The unique ID for a `CategoryInterface` object. */
  root_category_uid?: Maybe<Scalars['ID']['output']>;
  /** Corresponds to the 'Display Prices In Sales Modules' field in the Admin. It indicates how FPT information is displayed on cart, checkout, and order pages. */
  sales_fixed_product_tax_display_setting?: Maybe<FixedProductTaxDisplaySettings>;
  /** A secure fully-qualified URL that is used to create relative links to the `base_url`. */
  secure_base_link_url?: Maybe<Scalars['String']['output']>;
  /** The secure fully-qualified URL that specifies the location of media files. */
  secure_base_media_url?: Maybe<Scalars['String']['output']>;
  /** The secure fully-qualified URL that specifies the location of static view files. */
  secure_base_static_url?: Maybe<Scalars['String']['output']>;
  /** The store’s fully-qualified secure base URL. */
  secure_base_url?: Maybe<Scalars['String']['output']>;
  security_contact?: Maybe<Scalars['String']['output']>;
  security_expires?: Maybe<Scalars['String']['output']>;
  security_policy?: Maybe<Scalars['String']['output']>;
  security_preferred_languages?: Maybe<Scalars['String']['output']>;
  /** Email to a Friend configuration. */
  send_friend?: Maybe<SendFriendConfiguration>;
  /** Extended Config Data - tax/cart_display/full_summary */
  shopping_cart_display_full_summary?: Maybe<Scalars['Boolean']['output']>;
  /** Extended Config Data - tax/cart_display/grandtotal */
  shopping_cart_display_grand_total?: Maybe<Scalars['Boolean']['output']>;
  /** Extended Config Data - tax/cart_display/price */
  shopping_cart_display_price?: Maybe<Scalars['Int']['output']>;
  /** Extended Config Data - tax/cart_display/shipping */
  shopping_cart_display_shipping?: Maybe<Scalars['Int']['output']>;
  /** Extended Config Data - tax/cart_display/subtotal */
  shopping_cart_display_subtotal?: Maybe<Scalars['Int']['output']>;
  /** Extended Config Data - tax/cart_display/gift_wrapping */
  shopping_cart_display_tax_gift_wrapping?: Maybe<TaxWrappingEnum>;
  /** Extended Config Data - tax/cart_display/zero_tax */
  shopping_cart_display_zero_tax?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether a breadcrumb trail appears on all CMS pages in the catalog. 0 (No) or 1 (Yes). */
  show_cms_breadcrumbs?: Maybe<Scalars['Int']['output']>;
  /** Snapchat logo URL */
  snapchat_url?: Maybe<Scalars['String']['output']>;
  /** The unique ID of the store view. In the Admin, this is called the Store View Code. When making a GraphQL call, assign this value to the `Store` header to provide the scope. */
  store_code?: Maybe<Scalars['ID']['output']>;
  /** The unique ID assigned to the store group. In the Admin, this is called the Store Name. */
  store_group_code?: Maybe<Scalars['ID']['output']>;
  /** The label assigned to the store group. */
  store_group_name?: Maybe<Scalars['String']['output']>;
  /** The label assigned to the store view. */
  store_name?: Maybe<Scalars['String']['output']>;
  /** The store view sort order. */
  store_sort_order?: Maybe<Scalars['Int']['output']>;
  /** Telegram logo URL */
  telegram_url?: Maybe<Scalars['String']['output']>;
  theme_color?: Maybe<Scalars['String']['output']>;
  /** Theme primary color */
  theme_primary_color?: Maybe<Scalars['String']['output']>;
  /** Theme secondary color */
  theme_secondary_color?: Maybe<Scalars['String']['output']>;
  /** Threads logo URL */
  threads_url?: Maybe<Scalars['String']['output']>;
  /** TikTok logo URL */
  tiktok_url?: Maybe<Scalars['String']['output']>;
  /** The time zone of the store. */
  timezone?: Maybe<Scalars['String']['output']>;
  /** A prefix that appears before the title to create a two- or three-part title. */
  title_prefix?: Maybe<Scalars['String']['output']>;
  /** The character that separates the category name and subcategory in the browser title bar. */
  title_separator?: Maybe<Scalars['String']['output']>;
  /** A suffix that appears after the title to create a two- or three-part title. */
  title_suffix?: Maybe<Scalars['String']['output']>;
  /** Twitter logo URL */
  twiter_url?: Maybe<Scalars['String']['output']>;
  /** Indicates whether the store code should be used in the URL. */
  use_store_in_url?: Maybe<Scalars['Boolean']['output']>;
  /** The unique ID for the website. */
  website_code?: Maybe<Scalars['ID']['output']>;
  /**
   * The ID number assigned to the website store.
   * @deprecated The field should not be used on the storefront.
   */
  website_id?: Maybe<Scalars['Int']['output']>;
  /** The label assigned to the website. */
  website_name?: Maybe<Scalars['String']['output']>;
  /** The unit of weight. */
  weight_unit?: Maybe<Scalars['String']['output']>;
  /** Text that appears in the header of the page and includes the name of the logged in customer. */
  welcome?: Maybe<Scalars['String']['output']>;
  /** WhatsApp logo URL */
  whatsapp_url?: Maybe<Scalars['String']['output']>;
  /** Youtube logo URL */
  youtube_url?: Maybe<Scalars['String']['output']>;
  /** Indicates whether only specific countries can use this payment method. */
  zero_subtotal_enable_for_specific_countries?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the Zero Subtotal payment method is enabled. */
  zero_subtotal_enabled?: Maybe<Scalars['Boolean']['output']>;
  /** The status of new orders placed using the Zero Subtotal payment method. */
  zero_subtotal_new_order_status?: Maybe<Scalars['String']['output']>;
  /** When the new order status is 'Processing', this can be set to `authorize_capture` to automatically invoice all items that have a zero balance. */
  zero_subtotal_payment_action?: Maybe<Scalars['String']['output']>;
  /** A comma-separated list of specific countries allowed to use the Zero Subtotal payment method. */
  zero_subtotal_payment_from_specific_countries?: Maybe<Scalars['String']['output']>;
  /** A number indicating the position of the Zero Subtotal payment method in the list of available payment methods during checkout. */
  zero_subtotal_sort_order?: Maybe<Scalars['Int']['output']>;
  /** The title of the Zero Subtotal payment method displayed on the storefront. */
  zero_subtotal_title?: Maybe<Scalars['String']['output']>;
};

/** Indicates where an attribute can be displayed. */
export type StorefrontProperties = {
  __typename?: 'StorefrontProperties';
  /** The relative position of the attribute in the layered navigation block. */
  position?: Maybe<Scalars['Int']['output']>;
  /** Indicates whether the attribute is filterable with results, without results, or not at all. */
  use_in_layered_navigation?: Maybe<UseInLayeredNavigationOptions>;
  /** Indicates whether the attribute is displayed in product listings. */
  use_in_product_listing?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the attribute can be used in layered navigation on search results pages. */
  use_in_search_results_layered_navigation?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the attribute is displayed on product pages. */
  visible_on_catalog_pages?: Maybe<Scalars['Boolean']['output']>;
};

/** Sub Link */
export type SubLink = {
  __typename?: 'SubLink';
  /** Open link in new tab */
  open_new_tab?: Maybe<Scalars['Boolean']['output']>;
  /** Link Sort Order */
  sort_order?: Maybe<Scalars['Int']['output']>;
  /** Link Title */
  title?: Maybe<Scalars['String']['output']>;
  /** Link Type */
  type?: Maybe<Scalars['String']['output']>;
  /** Link Uid */
  uid: Scalars['ID']['output'];
  /** Url Key of Link */
  url_key?: Maybe<Scalars['String']['output']>;
};

/** Sub total data */
export type SubTotalData = {
  __typename?: 'SubTotalData';
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
  /** Value */
  value?: Maybe<Scalars['String']['output']>;
  /** Formatted value */
  valueFormatted?: Maybe<Scalars['String']['output']>;
};

/** Contains the result of the `subscribeEmailToNewsletter` operation. */
export type SubscribeEmailToNewsletterOutput = {
  __typename?: 'SubscribeEmailToNewsletterOutput';
  /** The status of the subscription request. */
  status?: Maybe<SubscriptionStatusesEnum>;
};

/** Indicates the status of the request. */
export enum SubscriptionStatusesEnum {
  NotActive = 'NOT_ACTIVE',
  Subscribed = 'SUBSCRIBED',
  Unconfirmed = 'UNCONFIRMED',
  Unsubscribed = 'UNSUBSCRIBED'
}

/** Describes the swatch type and a value. */
export type SwatchData = {
  __typename?: 'SwatchData';
  /** The type of swatch filter item: 1 - text; 2 - image. */
  type?: Maybe<Scalars['String']['output']>;
  /** The value for the swatch item. It could be text or an image link. */
  value?: Maybe<Scalars['String']['output']>;
};

export type SwatchDataInterface = {
  /** The value can be represented as color (HEX code), image link, or text. */
  value?: Maybe<Scalars['String']['output']>;
};

/** Swatch attribute metadata input types. */
export enum SwatchInputTypeEnum {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  Datetime = 'DATETIME',
  Dropdown = 'DROPDOWN',
  File = 'FILE',
  Gallery = 'GALLERY',
  Hidden = 'HIDDEN',
  Image = 'IMAGE',
  MediaImage = 'MEDIA_IMAGE',
  Multiline = 'MULTILINE',
  Multiselect = 'MULTISELECT',
  Price = 'PRICE',
  Select = 'SELECT',
  Text = 'TEXT',
  Textarea = 'TEXTAREA',
  Undefined = 'UNDEFINED',
  Visual = 'VISUAL',
  Weight = 'WEIGHT'
}

export type SwatchLayerFilterItem = LayerFilterItemInterface & SwatchLayerFilterItemInterface & {
  __typename?: 'SwatchLayerFilterItem';
  /**
   * The count of items per filter.
   * @deprecated Use `AggregationOption.count` instead.
   */
  items_count?: Maybe<Scalars['Int']['output']>;
  /**
   * The label for a filter.
   * @deprecated Use `AggregationOption.label` instead.
   */
  label?: Maybe<Scalars['String']['output']>;
  /** Data required to render a swatch filter item. */
  swatch_data?: Maybe<SwatchData>;
  /**
   * The value of a filter request variable to be used in query.
   * @deprecated Use `AggregationOption.value` instead.
   */
  value_string?: Maybe<Scalars['String']['output']>;
};

export type SwatchLayerFilterItemInterface = {
  /** Data required to render a swatch filter item. */
  swatch_data?: Maybe<SwatchData>;
};

/** Synchronizes the payment order details */
export type SyncPaymentOrderInput = {
  /** The customer cart ID */
  cartId: Scalars['String']['input'];
  /** PayPal order ID */
  id: Scalars['String']['input'];
};

/** Tax Data */
export type TaxData = {
  __typename?: 'TaxData';
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
  /** Value */
  value?: Maybe<Scalars['String']['output']>;
  /** Formatted value */
  valueFormatted?: Maybe<Scalars['String']['output']>;
};

/** Contains tax item details. */
export type TaxItem = {
  __typename?: 'TaxItem';
  /** The amount of tax applied to the item. */
  amount: Money;
  /** The rate used to calculate the tax. */
  rate: Scalars['Float']['output'];
  /** A title that describes the tax. */
  title: Scalars['String']['output'];
};

export enum TaxWrappingEnum {
  DisplayExcludingTax = 'DISPLAY_EXCLUDING_TAX',
  DisplayIncludingTax = 'DISPLAY_INCLUDING_TAX',
  DisplayTypeBoth = 'DISPLAY_TYPE_BOTH'
}

export type Testimonial = {
  __typename?: 'Testimonial';
  /** Description */
  description?: Maybe<Scalars['String']['output']>;
  /** Testimonial Items */
  items?: Maybe<Array<Maybe<TestimonialItem>>>;
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
};

export type TestimonialItem = {
  __typename?: 'TestimonialItem';
  /** customer label */
  customer_label?: Maybe<Scalars['String']['output']>;
  /** customer name */
  customer_name?: Maybe<Scalars['String']['output']>;
  /** Id */
  id?: Maybe<Scalars['Int']['output']>;
  /** image url */
  image?: Maybe<Scalars['String']['output']>;
  /** message */
  message?: Maybe<Scalars['String']['output']>;
  /** product label */
  product_label?: Maybe<Scalars['String']['output']>;
  /** product name */
  product_name?: Maybe<Scalars['String']['output']>;
};

export type TestimonialsData = {
  __typename?: 'TestimonialsData';
  current_page?: Maybe<Scalars['Int']['output']>;
  /** Description */
  description?: Maybe<Scalars['String']['output']>;
  item_from?: Maybe<Scalars['Int']['output']>;
  item_to?: Maybe<Scalars['Int']['output']>;
  /** Testimonial Items */
  items?: Maybe<Array<Maybe<TestimonialItem>>>;
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
  total_counts?: Maybe<Scalars['Int']['output']>;
  total_pages?: Maybe<Scalars['Int']['output']>;
};

export type TextSwatchData = SwatchDataInterface & {
  __typename?: 'TextSwatchData';
  /** The value can be represented as color (HEX code), image link, or text. */
  value?: Maybe<Scalars['String']['output']>;
};

/** 3D Secure mode. */
export enum ThreeDsMode {
  Off = 'OFF',
  ScaAlways = 'SCA_ALWAYS',
  ScaWhenRequired = 'SCA_WHEN_REQUIRED'
}

/** Defines a price based on the quantity purchased. */
export type TierPrice = {
  __typename?: 'TierPrice';
  /** The price discount that this tier represents. */
  discount?: Maybe<ProductDiscount>;
  /** The price of the product at this tier. */
  final_price?: Maybe<Money>;
  /** The minimum number of items that must be purchased to qualify for this price tier. */
  quantity?: Maybe<Scalars['Float']['output']>;
};

/** Details of a top customer */
export type TopCustomer = {
  __typename?: 'TopCustomer';
  /** Billing telephone number of the customer */
  billing_telephone?: Maybe<Scalars['String']['output']>;
  /** Total spending by the customer */
  customer_base_total?: Maybe<Scalars['String']['output']>;
  /** Formatted total spending of the customer */
  customer_base_total_formatted?: Maybe<Scalars['String']['output']>;
  /** Email address of the customer */
  email?: Maybe<Scalars['String']['output']>;
  /** Name of the customer */
  name?: Maybe<Scalars['String']['output']>;
  /** Number of orders placed by the customer */
  order_count?: Maybe<Scalars['Int']['output']>;
};

/** Total Admin Comission */
export type TotalAdminComission = {
  __typename?: 'TotalAdminComission';
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
  /** Value */
  value?: Maybe<Scalars['String']['output']>;
  /** Formatted value */
  valueFormatted?: Maybe<Scalars['String']['output']>;
};

/** Total Ordered Amount */
export type TotalOrderedAmount = {
  __typename?: 'TotalOrderedAmount';
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
  /** Value */
  value?: Maybe<Scalars['String']['output']>;
  /** Formatted value */
  valueFormatted?: Maybe<Scalars['String']['output']>;
};

/** vendor amount */
export type TotalVendorAmount = {
  __typename?: 'TotalVendorAmount';
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
  /** Value */
  value?: Maybe<Scalars['String']['output']>;
  /** Formatted value */
  valueFormatted?: Maybe<Scalars['String']['output']>;
};

export type TransactionFilter = {
  /** The current page of results to be returned. */
  curPage?: InputMaybe<Scalars['Int']['input']>;
  /** The starting transaction ID for the filter. */
  id_from?: InputMaybe<Scalars['Int']['input']>;
  /** The ending transaction ID for the filter. */
  id_to?: InputMaybe<Scalars['Int']['input']>;
  /** The number of items to be returned per page. */
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  /** The starting date for the purchase filter. */
  purchased_on_from?: InputMaybe<Scalars['String']['input']>;
  /** The ending date for the purchase filter. */
  purchased_on_to?: InputMaybe<Scalars['String']['input']>;
  /** The unique transaction ID for filtering. */
  transaction_id?: InputMaybe<Scalars['String']['input']>;
};

export type TransactionInfo = {
  __typename?: 'TransactionInfo';
  /** The total amount involved in the transaction. */
  amount?: Maybe<Scalars['String']['output']>;
  /** The formatted version of the transaction amount. */
  amount_formatted?: Maybe<Scalars['String']['output']>;
  /** Any comments or messages associated with the transaction. */
  comment_message?: Maybe<Scalars['String']['output']>;
  /** The date and time when the transaction occurred. */
  date?: Maybe<Scalars['String']['output']>;
  /** The payment method used in the transaction (e.g., 'PayPal', 'Credit Card'). */
  method?: Maybe<Scalars['String']['output']>;
  /** The type of the transaction (e.g., 'credit', 'debit'). */
  type?: Maybe<Scalars['String']['output']>;
};

export type TransactionList = {
  __typename?: 'TransactionList';
  /** The unique identifier for the transaction. */
  id?: Maybe<Scalars['String']['output']>;
  /** A message associated with the transaction. */
  message?: Maybe<Scalars['String']['output']>;
  /** The date when the transaction was made. */
  purchased_on?: Maybe<Scalars['String']['output']>;
  /** The total amount of the transaction. */
  transaction_amount?: Maybe<Scalars['String']['output']>;
  /** The formatted version of the transaction amount. */
  transaction_amount_formatted?: Maybe<Scalars['String']['output']>;
  /** The unique transaction identifier. */
  transaction_id?: Maybe<Scalars['String']['output']>;
};

export type TransactionOrderInfo = {
  __typename?: 'TransactionOrderInfo';
  /** The unique identifier for the order associated with the transaction. */
  order_id?: Maybe<Scalars['String']['output']>;
  /** The price of the product. */
  price?: Maybe<Scalars['String']['output']>;
  /** The formatted price of the product. */
  price_formatted?: Maybe<Scalars['String']['output']>;
  /** The name of the product in the order. */
  product_name?: Maybe<Scalars['String']['output']>;
  /** The quantity of the product ordered. */
  qty?: Maybe<Scalars['Int']['output']>;
  /** The subtotal for the order before any additional charges or discounts. */
  subtotal?: Maybe<Scalars['String']['output']>;
  /** The total commission deducted by the platform from the order amount. */
  total_commission?: Maybe<Scalars['String']['output']>;
  /** The formatted version of the total commission. */
  total_commission_formatted?: Maybe<Scalars['String']['output']>;
  /** The total discount applied to the order. */
  total_discount?: Maybe<Scalars['String']['output']>;
  /** The formatted version of the total discount. */
  total_discount_formatted?: Maybe<Scalars['String']['output']>;
  /** The total price for the order, including any additional charges. */
  total_price?: Maybe<Scalars['String']['output']>;
  /** The formatted version of the total price for the order. */
  total_price_formatted?: Maybe<Scalars['String']['output']>;
  /** The total shipping charge for the order. */
  total_shipping?: Maybe<Scalars['String']['output']>;
  /** The formatted version of the total shipping charge. */
  total_shipping_formatted?: Maybe<Scalars['String']['output']>;
  /** The total tax applied to the order. */
  total_tax?: Maybe<Scalars['String']['output']>;
  /** The formatted version of the total tax. */
  total_tax_formatted?: Maybe<Scalars['String']['output']>;
};

/** Modifies the specified items in the cart. */
export type UpdateCartItemsInput = {
  /** The unique ID of a `Cart` object. */
  cart_id: Scalars['String']['input'];
  /** An array of items to be updated. */
  cart_items: Array<InputMaybe<CartItemUpdateInput>>;
};

/** Contains details about the cart after updating items. */
export type UpdateCartItemsOutput = {
  __typename?: 'UpdateCartItemsOutput';
  /** The cart after updating products. */
  cart: Cart;
  /** Contains errors encountered while updating an item to the cart. */
  errors: Array<Maybe<CartUserInputError>>;
};

/** Contains the customer's wish list and any errors encountered. */
export type UpdateProductsInWishlistOutput = {
  __typename?: 'UpdateProductsInWishlistOutput';
  /** An array of errors encountered while updating products in a wish list. */
  user_errors: Array<Maybe<WishListUserInputError>>;
  /** Contains the wish list with all items that were successfully updated. */
  wishlist: Wishlist;
};

/** Response for image upload to the server */
export type UploadImage = {
  __typename?: 'UploadImage';
  /** The file name or path of the uploaded image */
  file?: Maybe<Scalars['String']['output']>;
  /** Detailed message about the upload process (e.g., success message or error details) */
  message?: Maybe<Scalars['String']['output']>;
  /** Indicates the success (true) or failure (false) of the image upload */
  status?: Maybe<Scalars['Boolean']['output']>;
  /** The URL of the uploaded image, if the upload is successful */
  url?: Maybe<Scalars['String']['output']>;
};

/** Contains URL rewrite details. */
export type UrlRewrite = {
  __typename?: 'UrlRewrite';
  /** An array of request parameters. */
  parameters?: Maybe<Array<Maybe<HttpQueryParameter>>>;
  /** The request URL. */
  url?: Maybe<Scalars['String']['output']>;
};

/** This enumeration defines the entity type. */
export enum UrlRewriteEntityTypeEnum {
  Category = 'CATEGORY',
  CmsPage = 'CMS_PAGE',
  Product = 'PRODUCT'
}

/** Defines whether the attribute is filterable in layered navigation. */
export enum UseInLayeredNavigationOptions {
  FilterableNoResult = 'FILTERABLE_NO_RESULT',
  FilterableWithResults = 'FILTERABLE_WITH_RESULTS',
  No = 'NO'
}

/** Defines a customer attribute validation rule. */
export type ValidationRule = {
  __typename?: 'ValidationRule';
  /** Validation rule name applied to a customer attribute. */
  name?: Maybe<ValidationRuleEnum>;
  /** Validation rule value. */
  value?: Maybe<Scalars['String']['output']>;
};

/** List of validation rule names applied to a customer attribute. */
export enum ValidationRuleEnum {
  DateRangeMax = 'DATE_RANGE_MAX',
  DateRangeMin = 'DATE_RANGE_MIN',
  FileExtensions = 'FILE_EXTENSIONS',
  InputValidation = 'INPUT_VALIDATION',
  MaxFileSize = 'MAX_FILE_SIZE',
  MaxImageHeight = 'MAX_IMAGE_HEIGHT',
  MaxImageWidth = 'MAX_IMAGE_WIDTH',
  MaxTextLength = 'MAX_TEXT_LENGTH',
  MinTextLength = 'MIN_TEXT_LENGTH'
}

/** Product configurable attribute data params for variations */
export type VariationsInput = {
  /** Attribute this variation is linked to */
  configurable_attribute?: InputMaybe<Scalars['String']['input']>;
  /** Image associated with the variation */
  image?: InputMaybe<Scalars['String']['input']>;
  /** Name of the variation */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Price of the variation */
  price?: InputMaybe<Scalars['Int']['input']>;
  /** Quantity and stock status of the variation */
  quantity_and_stock_status?: InputMaybe<QuantityInput>;
  /** SKU of the variation */
  sku?: InputMaybe<Scalars['String']['input']>;
  /** Status of the variation (1 = active, 0 = inactive) */
  status?: InputMaybe<Scalars['Int']['input']>;
  /** Weight of the variation */
  weight?: InputMaybe<Scalars['Int']['input']>;
};

/** Retrieves the vault configuration */
export type VaultConfigOutput = {
  __typename?: 'VaultConfigOutput';
  /** Credit card vault method configuration */
  credit_card?: Maybe<VaultCreditCardConfig>;
};

export type VaultCreditCardConfig = {
  __typename?: 'VaultCreditCardConfig';
  /** Is vault enabled */
  is_vault_enabled?: Maybe<Scalars['Boolean']['output']>;
  /** The parameters required to load the Paypal JS SDK */
  sdk_params?: Maybe<Array<Maybe<SdkParams>>>;
  /** 3DS mode */
  three_ds_mode?: Maybe<ThreeDsMode>;
};

/** Vault payment inputs */
export type VaultMethodInput = {
  /** The payment source for the payment method */
  payment_source?: InputMaybe<Scalars['String']['input']>;
  /** The payment services order ID */
  payments_order_id?: InputMaybe<Scalars['String']['input']>;
  /** PayPal order ID */
  paypal_order_id?: InputMaybe<Scalars['String']['input']>;
  /** The public hash of the token. */
  public_hash?: InputMaybe<Scalars['String']['input']>;
};

/** The payment source information */
export type VaultSetupTokenInput = {
  /** The payment source information */
  payment_source: PaymentSourceInput;
};

/** Contains required input for payment methods with Vault support. */
export type VaultTokenInput = {
  /** The public hash of the payment token. */
  public_hash: Scalars['String']['input'];
};

/** An implementation for virtual product cart items. */
export type VirtualCartItem = CartItemInterface & {
  __typename?: 'VirtualCartItem';
  /** An array containing customizable options the shopper selected. */
  customizable_options: Array<Maybe<SelectedCustomizableOption>>;
  /** An array of errors encountered while loading the cart item */
  errors?: Maybe<Array<Maybe<CartItemError>>>;
  /** @deprecated Use `uid` instead. */
  id: Scalars['String']['output'];
  /** True if requested quantity is less than available stock, false otherwise. */
  is_available: Scalars['Boolean']['output'];
  /** Message to display when the product is not available with this selected option. */
  not_available_message?: Maybe<Scalars['String']['output']>;
  /** Contains details about the price of the item, including taxes and discounts. */
  prices?: Maybe<CartItemPrices>;
  /** Details about an item in the cart. */
  product: ProductInterface;
  /** The quantity of this item in the cart. */
  quantity: Scalars['Float']['output'];
  /** The unique ID for a `CartItemInterface` object. */
  uid: Scalars['ID']['output'];
};

/** Defines a virtual product, which is a non-tangible product that does not require shipping and is not kept in inventory. */
export type VirtualProduct = CustomizableProductInterface & ProductInterface & RoutableInterface & {
  __typename?: 'VirtualProduct';
  /** The productdata query returns the product attributes */
  attributeValues?: Maybe<Array<Maybe<ProductAttributes>>>;
  /**
   * The attribute set assigned to the product.
   * @deprecated The field should not be used on the storefront.
   */
  attribute_set_id?: Maybe<Scalars['Int']['output']>;
  /** Name of the product attribute set */
  attribute_set_name?: Maybe<Scalars['String']['output']>;
  /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled. */
  canonical_url?: Maybe<Scalars['String']['output']>;
  /** The categories assigned to a product. */
  categories?: Maybe<Array<Maybe<CategoryInterface>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  color?: Maybe<Scalars['Int']['output']>;
  /** The product's country of origin. */
  country_of_manufacture?: Maybe<Scalars['String']['output']>;
  /**
   * Timestamp indicating when the product was created.
   * @deprecated The field should not be used on the storefront.
   */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Crosssell Products */
  crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** Product custom attributes. */
  custom_attributesV2?: Maybe<ProductCustomAttributes>;
  /** Reason for denying the product listing */
  deny_reason?: Maybe<DenyReason>;
  /** Detailed information about the product. The value can include simple HTML tags. */
  description?: Maybe<ComplexTextValue>;
  /** Returns a value indicating gift message availability for the product. */
  gift_message_available: Scalars['Boolean']['output'];
  /**
   * The ID number assigned to the product.
   * @deprecated Use the `uid` field instead.
   */
  id?: Maybe<Scalars['Int']['output']>;
  /** The relative path to the main image on the product page. */
  image?: Maybe<ProductImage>;
  /**
   * A number representing the product's manufacturer.
   * @deprecated Use the `custom_attributes` field instead.
   */
  manufacturer?: Maybe<Scalars['Int']['output']>;
  /** Maximum Qty Allowed in Shopping Cart */
  max_sale_qty?: Maybe<Scalars['Float']['output']>;
  /** An array of media gallery objects. */
  media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
  /**
   * An array of MediaGalleryEntry objects.
   * @deprecated Use `media_gallery` instead.
   */
  media_gallery_entries?: Maybe<Array<Maybe<MediaGalleryEntry>>>;
  /** A brief overview of the product for search results listings, maximum 255 characters. */
  meta_description?: Maybe<Scalars['String']['output']>;
  /** A comma-separated list of keywords that are visible only to search engines. */
  meta_keyword?: Maybe<Scalars['String']['output']>;
  /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
  meta_title?: Maybe<Scalars['String']['output']>;
  /** Minimum Qty Allowed in Shopping Cart */
  min_sale_qty?: Maybe<Scalars['Float']['output']>;
  /** The product name. Customers use this name to identify the product. */
  name?: Maybe<Scalars['String']['output']>;
  /** The beginning date for new product listings, and determines if the product is featured as a new product. */
  new_from_date?: Maybe<Scalars['String']['output']>;
  /** The end date for new product listings. */
  new_to_date?: Maybe<Scalars['String']['output']>;
  /** Product stock only x left count */
  only_x_left_in_stock?: Maybe<Scalars['Float']['output']>;
  /** An array of options for a customizable product. */
  options?: Maybe<Array<Maybe<CustomizableOptionInterface>>>;
  /** If the product has multiple options, determines where they appear on the product page. */
  options_container?: Maybe<Scalars['String']['output']>;
  /**
   * Indicates the price of an item.
   * @deprecated Use `price_range` for product price information.
   */
  price?: Maybe<ProductPrices>;
  /** The range of prices for the product */
  price_range: PriceRange;
  /** An array of `TierPrice` objects. */
  price_tiers?: Maybe<Array<Maybe<TierPrice>>>;
  /** An array of `ProductLinks` objects. */
  product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>;
  /** Current status of the product */
  product_status?: Maybe<Scalars['String']['output']>;
  /** Quantity available for the product */
  qty?: Maybe<Scalars['Int']['output']>;
  /** Quantity of the product confirmed for sale */
  qty_confirmed?: Maybe<ProductQtyConfirmed>;
  /** Quantity of the product pending sale */
  qty_pending?: Maybe<ProductQtyPending>;
  /** Quantity of the product sold */
  qty_sold?: Maybe<ProductQtySold>;
  /** Amount of available stock */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** The average of all the ratings given to the product. */
  rating_summary: Scalars['Float']['output'];
  /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
  redirect_code: Scalars['Int']['output'];
  /** An array of products to be displayed in a Related Products block. */
  related_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
  relative_url?: Maybe<Scalars['String']['output']>;
  /** The total count of all the reviews given to the product. */
  review_count: Scalars['Int']['output'];
  /** The list of products reviews. */
  reviews: ProductReviews;
  /** @deprecated Use the `custom_attributes` field instead. */
  seller_id?: Maybe<Scalars['Int']['output']>;
  /** A short description of the product. Its use depends on the theme. */
  short_description?: Maybe<ComplexTextValue>;
  /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
  sku?: Maybe<Scalars['String']['output']>;
  /** The relative path to the small image, which is used on catalog pages. */
  small_image?: Maybe<ProductImage>;
  /**
   * The beginning date that a product has a special price.
   * @deprecated The field should not be used on the storefront.
   */
  special_from_date?: Maybe<Scalars['String']['output']>;
  /** The discounted price of the product. */
  special_price?: Maybe<Scalars['Float']['output']>;
  /** The end date for a product with a special price. */
  special_to_date?: Maybe<Scalars['String']['output']>;
  /** Stock status of the product */
  stock_status?: Maybe<ProductStockStatus>;
  /** The file name of a swatch image. */
  swatch_image?: Maybe<Scalars['String']['output']>;
  /** The relative path to the product's thumbnail image. */
  thumbnail?: Maybe<ProductImage>;
  /**
   * The price when tier pricing is in effect and the items purchased threshold has been reached.
   * @deprecated Use `price_tiers` for product tier price information.
   */
  tier_price?: Maybe<Scalars['Float']['output']>;
  /**
   * An array of ProductTierPrices objects.
   * @deprecated Use `price_tiers` for product tier price information.
   */
  tier_prices?: Maybe<Array<Maybe<ProductTierPrices>>>;
  /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
  type?: Maybe<UrlRewriteEntityTypeEnum>;
  /**
   * One of simple, virtual, bundle, downloadable, grouped, or configurable.
   * @deprecated Use `__typename` instead.
   */
  type_id?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `ProductInterface` object. */
  uid: Scalars['ID']['output'];
  /**
   * Timestamp indicating when the product was updated.
   * @deprecated The field should not be used on the storefront.
   */
  updated_at?: Maybe<Scalars['String']['output']>;
  /** Upsell Products */
  upsell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The part of the URL that identifies the product */
  url_key?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use product's `canonical_url` or url rewrites instead */
  url_path?: Maybe<Scalars['String']['output']>;
  /** URL rewrites list */
  url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>;
  /** The part of the product URL that is appended after the url key */
  url_suffix?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  voguish_featured?: Maybe<Scalars['String']['output']>;
  /**
   * An array of websites in which the product is available.
   * @deprecated The field should not be used on the storefront.
   */
  websites?: Maybe<Array<Maybe<Website>>>;
};


/** Defines a virtual product, which is a non-tangible product that does not require shipping and is not kept in inventory. */
export type VirtualProductAttributeValuesArgs = {
  attributeCode?: InputMaybe<Array<InputMaybe<AttributeCodeInput>>>;
};


/** Defines a virtual product, which is a non-tangible product that does not require shipping and is not kept in inventory. */
export type VirtualProductCustom_AttributesV2Args = {
  filters?: InputMaybe<AttributeFilterInput>;
};


/** Defines a virtual product, which is a non-tangible product that does not require shipping and is not kept in inventory. */
export type VirtualProductReviewsArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

/** Defines a single product to add to the cart. */
export type VirtualProductCartItemInput = {
  /** An array that defines customizable options for the product. */
  customizable_options?: InputMaybe<Array<InputMaybe<CustomizableOptionInput>>>;
  /** An object containing the `sku`, `quantity`, and other relevant information about the product. */
  data: CartItemInput;
};

/** Contains a virtual product wish list item. */
export type VirtualWishlistItem = WishlistItemInterface & {
  __typename?: 'VirtualWishlistItem';
  /** The date and time the item was added to the wish list. */
  added_at: Scalars['String']['output'];
  /** Custom options selected for the wish list item. */
  customizable_options: Array<Maybe<SelectedCustomizableOption>>;
  /** The description of the item. */
  description?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `WishlistItemInterface` object. */
  id: Scalars['ID']['output'];
  /** Product details of the wish list item. */
  product?: Maybe<ProductInterface>;
  /** The quantity of this wish list item. */
  quantity: Scalars['Float']['output'];
};

export type VoguishCheckoutConfig = {
  __typename?: 'VoguishCheckoutConfig';
  /** Indicates whether guest checkout is disabled when the cart contains downloadable items. */
  downloadable_disable_guest_checkout?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether guest checkout is enabled. */
  is_guest_checkout_enabled?: Maybe<Scalars['Boolean']['output']>;
};

/** Deprecated. It should not be used on the storefront. Contains information about a website. */
export type Website = {
  __typename?: 'Website';
  /**
   * A code assigned to the website to identify it.
   * @deprecated The field should not be used on the storefront.
   */
  code?: Maybe<Scalars['String']['output']>;
  /**
   * The default group ID of the website.
   * @deprecated The field should not be used on the storefront.
   */
  default_group_id?: Maybe<Scalars['String']['output']>;
  /**
   * The ID number assigned to the website.
   * @deprecated The field should not be used on the storefront.
   */
  id?: Maybe<Scalars['Int']['output']>;
  /**
   * Indicates whether this is the default website.
   * @deprecated The field should not be used on the storefront.
   */
  is_default?: Maybe<Scalars['Boolean']['output']>;
  /**
   * The website name. Websites use this name to identify it easier.
   * @deprecated The field should not be used on the storefront.
   */
  name?: Maybe<Scalars['String']['output']>;
  /**
   * The attribute to use for sorting websites.
   * @deprecated The field should not be used on the storefront.
   */
  sort_order?: Maybe<Scalars['Int']['output']>;
};

/** An error encountered while performing operations with WishList. */
export type WishListUserInputError = {
  __typename?: 'WishListUserInputError';
  /** A wish list-specific error code. */
  code: WishListUserInputErrorType;
  /** A localized error message. */
  message: Scalars['String']['output'];
};

/** A list of possible error types. */
export enum WishListUserInputErrorType {
  ProductNotFound = 'PRODUCT_NOT_FOUND',
  Undefined = 'UNDEFINED'
}

/** Contains a customer wish list. */
export type Wishlist = {
  __typename?: 'Wishlist';
  /** The unique ID for a `Wishlist` object. */
  id?: Maybe<Scalars['ID']['output']>;
  /** @deprecated Use the `items_v2` field instead. */
  items?: Maybe<Array<Maybe<WishlistItem>>>;
  /** The number of items in the wish list. */
  items_count?: Maybe<Scalars['Int']['output']>;
  /** An array of items in the customer's wish list. */
  items_v2?: Maybe<WishlistItems>;
  /** An encrypted code that Magento uses to link to the wish list. */
  sharing_code?: Maybe<Scalars['String']['output']>;
  /** The time of the last modification to the wish list. */
  updated_at?: Maybe<Scalars['String']['output']>;
};


/** Contains a customer wish list. */
export type WishlistItems_V2Args = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

/** Contains details about errors encountered when a customer added wish list items to the cart. */
export type WishlistCartUserInputError = {
  __typename?: 'WishlistCartUserInputError';
  /** An error code that describes the error encountered. */
  code: WishlistCartUserInputErrorType;
  /** A localized error message. */
  message: Scalars['String']['output'];
  /** The unique ID of the `Wishlist` object containing an error. */
  wishlistId: Scalars['ID']['output'];
  /** The unique ID of the wish list item containing an error. */
  wishlistItemId: Scalars['ID']['output'];
};

/** A list of possible error types. */
export enum WishlistCartUserInputErrorType {
  InsufficientStock = 'INSUFFICIENT_STOCK',
  NotSalable = 'NOT_SALABLE',
  ProductNotFound = 'PRODUCT_NOT_FOUND',
  Undefined = 'UNDEFINED'
}

/** Contains details about a wish list item. */
export type WishlistItem = {
  __typename?: 'WishlistItem';
  /** The time when the customer added the item to the wish list. */
  added_at?: Maybe<Scalars['String']['output']>;
  /** The customer's comment about this item. */
  description?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `WishlistItem` object. */
  id?: Maybe<Scalars['Int']['output']>;
  /** Details about the wish list item. */
  product?: Maybe<ProductInterface>;
  /** The quantity of this wish list item */
  qty?: Maybe<Scalars['Float']['output']>;
};

/** Defines the items to add to a wish list. */
export type WishlistItemInput = {
  /** An array of options that the customer entered. */
  entered_options?: InputMaybe<Array<InputMaybe<EnteredOptionInput>>>;
  /** For complex product types, the SKU of the parent product. */
  parent_sku?: InputMaybe<Scalars['String']['input']>;
  /** The amount or number of items to add. */
  quantity: Scalars['Float']['input'];
  /** An array of strings corresponding to options the customer selected. */
  selected_options?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** The SKU of the product to add. For complex product types, specify the child product SKU. */
  sku: Scalars['String']['input'];
};

/** The interface for wish list items. */
export type WishlistItemInterface = {
  /** The date and time the item was added to the wish list. */
  added_at: Scalars['String']['output'];
  /** Custom options selected for the wish list item. */
  customizable_options: Array<Maybe<SelectedCustomizableOption>>;
  /** The description of the item. */
  description?: Maybe<Scalars['String']['output']>;
  /** The unique ID for a `WishlistItemInterface` object. */
  id: Scalars['ID']['output'];
  /** Product details of the wish list item. */
  product?: Maybe<ProductInterface>;
  /** The quantity of this wish list item. */
  quantity: Scalars['Float']['output'];
};

/** Defines updates to items in a wish list. */
export type WishlistItemUpdateInput = {
  /** Customer-entered comments about the item. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** An array of options that the customer entered. */
  entered_options?: InputMaybe<Array<InputMaybe<EnteredOptionInput>>>;
  /** The new amount or number of this item. */
  quantity?: InputMaybe<Scalars['Float']['input']>;
  /** An array of strings corresponding to options the customer selected. */
  selected_options?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** The unique ID for a `WishlistItemInterface` object. */
  wishlist_item_id: Scalars['ID']['input'];
};

/** Contains an array of items in a wish list. */
export type WishlistItems = {
  __typename?: 'WishlistItems';
  /** A list of items in the wish list. */
  items: Array<Maybe<WishlistItemInterface>>;
  /** Contains pagination metadata. */
  page_info?: Maybe<SearchResultPageInfo>;
};

/** Deprecated: Use the `Wishlist` type instead. */
export type WishlistOutput = {
  __typename?: 'WishlistOutput';
  /**
   * An array of items in the customer's wish list
   * @deprecated Use the `Wishlist.items` field instead.
   */
  items?: Maybe<Array<Maybe<WishlistItem>>>;
  /**
   * The number of items in the wish list.
   * @deprecated Use the `Wishlist.items_count` field instead.
   */
  items_count?: Maybe<Scalars['Int']['output']>;
  /**
   * When multiple wish lists are enabled, the name the customer assigns to the wishlist.
   * @deprecated This field is related to Commerce functionality and is always `null` in Open Source.
   */
  name?: Maybe<Scalars['String']['output']>;
  /**
   * An encrypted code that links to the wish list.
   * @deprecated Use the `Wishlist.sharing_code` field instead.
   */
  sharing_code?: Maybe<Scalars['String']['output']>;
  /**
   * The time of the last modification to the wish list.
   * @deprecated Use the `Wishlist.updated_at` field instead.
   */
  updated_at?: Maybe<Scalars['String']['output']>;
};

export type AttributeCodeInput = {
  /** product attribute codes */
  code?: InputMaybe<Scalars['String']['input']>;
};

/** Assigns a specific `cart_id` to the empty cart. */
export type CreateEmptyCartInput = {
  /** The ID to assign to the cart. */
  cart_id?: InputMaybe<Scalars['String']['input']>;
};

export type SellerEarningFilter = {
  cur_page?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  page_size?: InputMaybe<Scalars['Int']['input']>;
  period: Scalars['String']['input'];
  to?: InputMaybe<Scalars['String']['input']>;
};

/** Seller shop URL data for various shop sections */
export type SellerShopUrlInput = {
  /** URL for the seller's product collection page */
  collection_request_url?: InputMaybe<Scalars['String']['input']>;
  /** URL for the seller's location page */
  location_request_url?: InputMaybe<Scalars['String']['input']>;
  /** URL for the seller's policy page */
  policy_request_url?: InputMaybe<Scalars['String']['input']>;
  /** URL for the seller's profile page */
  profile_request_url?: InputMaybe<Scalars['String']['input']>;
  /** URL for the seller's review page */
  review_request_url?: InputMaybe<Scalars['String']['input']>;
};
