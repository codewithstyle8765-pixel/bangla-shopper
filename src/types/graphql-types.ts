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

export type AccountInfoData = {
  __typename?: 'AccountInfoData';
  DOBValue?: Maybe<Scalars['String']['output']>;
  dateFormat?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  genderValue?: Maybe<Scalars['String']['output']>;
  isDOBRequired?: Maybe<Scalars['Boolean']['output']>;
  isDOBVisible?: Maybe<Scalars['Boolean']['output']>;
  isFaxRequired?: Maybe<Scalars['Boolean']['output']>;
  isFaxVisible?: Maybe<Scalars['Boolean']['output']>;
  isGenderRequired?: Maybe<Scalars['Boolean']['output']>;
  isGenderVisible?: Maybe<Scalars['Boolean']['output']>;
  isMiddlenameVisible?: Maybe<Scalars['Boolean']['output']>;
  isMobileRequired?: Maybe<Scalars['Boolean']['output']>;
  isMobileVisible?: Maybe<Scalars['Boolean']['output']>;
  isPrefixRequired?: Maybe<Scalars['Boolean']['output']>;
  isPrefixVisible?: Maybe<Scalars['Boolean']['output']>;
  isSuffixRequired?: Maybe<Scalars['Boolean']['output']>;
  isSuffixVisible?: Maybe<Scalars['Boolean']['output']>;
  isTaxRequired?: Maybe<Scalars['Boolean']['output']>;
  isTaxVisible?: Maybe<Scalars['Boolean']['output']>;
  isTelephoneRequired?: Maybe<Scalars['Boolean']['output']>;
  isTelephoneVisible?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  middleName?: Maybe<Scalars['String']['output']>;
  prefixHasOptions?: Maybe<Scalars['Boolean']['output']>;
  prefixOptions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  prefixValue?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  suffixHasOptions?: Maybe<Scalars['Boolean']['output']>;
  suffixOptions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  suffixValue?: Maybe<Scalars['String']['output']>;
  taxValue?: Maybe<Scalars['String']['output']>;
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

export type AddToCart = {
  __typename?: 'AddToCart';
  canGuestCheckoutDownloadable?: Maybe<Scalars['Boolean']['output']>;
  cartCount?: Maybe<Scalars['Int']['output']>;
  cartTotal?: Maybe<Scalars['Float']['output']>;
  cartTotalFormattedAmount?: Maybe<Scalars['String']['output']>;
  descriptionMessage?: Maybe<Scalars['String']['output']>;
  isAllowedGuestCheckout?: Maybe<Scalars['Boolean']['output']>;
  isCheckoutAllowed?: Maybe<Scalars['Boolean']['output']>;
  isVirtual?: Maybe<Scalars['Boolean']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  minimumAmount?: Maybe<Scalars['Int']['output']>;
  minimumFormattedAmount?: Maybe<Scalars['String']['output']>;
  quoteId?: Maybe<Scalars['Int']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AddToWishlist = {
  __typename?: 'AddToWishlist';
  itemId?: Maybe<Scalars['Int']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
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

export type AddressBookData = {
  __typename?: 'AddressBookData';
  additionalAddress?: Maybe<Array<Maybe<Addresses>>>;
  addressCount?: Maybe<Scalars['Int']['output']>;
  billingAddress?: Maybe<Addresses>;
  message?: Maybe<Scalars['String']['output']>;
  otherError?: Maybe<Scalars['String']['output']>;
  shippingAddress?: Maybe<Addresses>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AddressData = {
  __typename?: 'AddressData';
  city?: Maybe<Scalars['String']['output']>;
  company?: Maybe<Scalars['String']['output']>;
  country_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['String']['output']>;
  entity_id?: Maybe<Scalars['String']['output']>;
  fax?: Maybe<Scalars['String']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  increment_id?: Maybe<Scalars['String']['output']>;
  isDefaultBilling?: Maybe<Scalars['Boolean']['output']>;
  isDefaultShipping?: Maybe<Scalars['Boolean']['output']>;
  is_active?: Maybe<Scalars['String']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  middlename?: Maybe<Scalars['String']['output']>;
  parent_id?: Maybe<Scalars['String']['output']>;
  postcode?: Maybe<Scalars['String']['output']>;
  prefix?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Scalars['String']['output']>;
  region_id?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  suffix?: Maybe<Scalars['String']['output']>;
  telephone?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['String']['output']>;
  vat_id?: Maybe<Scalars['String']['output']>;
  vat_is_valid?: Maybe<Scalars['String']['output']>;
  vat_request_date?: Maybe<Scalars['String']['output']>;
  vat_request_id?: Maybe<Scalars['String']['output']>;
  vat_request_success?: Maybe<Scalars['String']['output']>;
};

export type AddressFormData = {
  __typename?: 'AddressFormData';
  city?: Maybe<Scalars['String']['output']>;
  company?: Maybe<Scalars['String']['output']>;
  country_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['String']['output']>;
  entity_id?: Maybe<Scalars['String']['output']>;
  fax?: Maybe<Scalars['String']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  increment_id?: Maybe<Scalars['String']['output']>;
  isDefaultBilling?: Maybe<Scalars['Boolean']['output']>;
  isDefualtShipping?: Maybe<Scalars['Boolean']['output']>;
  is_active?: Maybe<Scalars['String']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  middlename?: Maybe<Scalars['String']['output']>;
  parent_id?: Maybe<Scalars['String']['output']>;
  postcode?: Maybe<Scalars['String']['output']>;
  prifix?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Scalars['String']['output']>;
  region_id?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  suffix?: Maybe<Scalars['String']['output']>;
  telephone?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['String']['output']>;
  var_request_success?: Maybe<Scalars['String']['output']>;
  vat_id?: Maybe<Scalars['String']['output']>;
  vat_is_valid?: Maybe<Scalars['String']['output']>;
  vat_request_date?: Maybe<Scalars['String']['output']>;
  vat_request_id?: Maybe<Scalars['String']['output']>;
};

export type AddressFormDataRequest = {
  __typename?: 'AddressFormDataRequest';
  addressData?: Maybe<AddressData>;
  allowToChooseState?: Maybe<Scalars['Boolean']['output']>;
  countryData?: Maybe<Array<Maybe<CountryData>>>;
  defaultCountry?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  isAddressTitleRequired?: Maybe<Scalars['Boolean']['output']>;
  isAddressTitleVisible?: Maybe<Scalars['Boolean']['output']>;
  isCompanyRequired?: Maybe<Scalars['Boolean']['output']>;
  isCompanyVisible?: Maybe<Scalars['Boolean']['output']>;
  isDOBVisible?: Maybe<Scalars['Boolean']['output']>;
  isFaxVisible?: Maybe<Scalars['Boolean']['output']>;
  isGenderVisible?: Maybe<Scalars['Boolean']['output']>;
  isMiddlenameVisible?: Maybe<Scalars['Boolean']['output']>;
  isPrefixVisible?: Maybe<Scalars['Boolean']['output']>;
  isSuffixVisible?: Maybe<Scalars['Boolean']['output']>;
  isTaxVisible?: Maybe<Scalars['Boolean']['output']>;
  isTelephoneRequired?: Maybe<Scalars['Boolean']['output']>;
  isTelephoneVisible?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  streetLineCount?: Maybe<Scalars['Int']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type Addresses = {
  __typename?: 'Addresses';
  addressTitle?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type AdvancedSearchFormData = {
  __typename?: 'AdvancedSearchFormData';
  fieldList?: Maybe<Array<Maybe<FieldList>>>;
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
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

export type AllToCart = {
  __typename?: 'AllToCart';
  cartCount?: Maybe<Scalars['Int']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  warning?: Maybe<Scalars['Boolean']['output']>;
};

export type AllowedCurrencies = {
  __typename?: 'AllowedCurrencies';
  code?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
};

/** Top announcement bar (shown on every page) */
export type AnnouncementBar = {
  __typename?: 'AnnouncementBar';
  /** Fixed item on the left, e.g. the support email. Null when not set. */
  left?: Maybe<AnnouncementBarItem>;
  /** Messages that rotate in the middle, one at a time */
  messages: Array<Maybe<HomeAnnouncement>>;
  /** Fixed item on the right, e.g. Customer Support 24/7. Null when not set. */
  right?: Maybe<AnnouncementBarItem>;
};

export type AnnouncementBarItem = {
  __typename?: 'AnnouncementBarItem';
  /** Icon keyword the storefront maps to its own icon: EMAIL | PHONE | SUPPORT | CLOCK | DELIVERY | LOCATION | GIFT. Null = no icon. */
  icon?: Maybe<Scalars['String']['output']>;
  /** Optional: storefront path, absolute URL, mailto: or tel: link */
  link?: Maybe<Scalars['String']['output']>;
  text: Scalars['String']['output'];
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

/** Metadata of EAV attributes associated to form */
export type AttributesFormOutput = {
  __typename?: 'AttributesFormOutput';
  /** Errors of retrieving certain attributes metadata. */
  errors: Array<Maybe<AttributeMetadataError>>;
  /** Requested attributes metadata. */
  items: Array<Maybe<CustomAttributeMetadataInterface>>;
};

/** Metadata of EAV attributes. */
export type AttributesMetadataOutput = {
  __typename?: 'AttributesMetadataOutput';
  /** Errors of retrieving certain attributes metadata. */
  errors: Array<Maybe<AttributeMetadataError>>;
  /** Requested attributes metadata. */
  items: Array<Maybe<CustomAttributeMetadataInterface>>;
};

export type AuthenticationResult = {
  __typename?: 'AuthenticationResult';
  /** Liability Shift */
  liability_shift?: Maybe<LiabilityShift>;
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

export type BannerImages = {
  __typename?: 'BannerImages';
  bannerType?: Maybe<Scalars['String']['output']>;
  dominantColor?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type Banners = {
  __typename?: 'Banners';
  bannerImage?: Maybe<Scalars['String']['output']>;
  dominantColor?: Maybe<Scalars['String']['output']>;
};

export enum BatchMutationStatus {
  Failure = 'FAILURE',
  MixedResults = 'MIXED_RESULTS',
  Success = 'SUCCESS'
}

export type BillingAddress = {
  __typename?: 'BillingAddress';
  city?: Maybe<Scalars['String']['output']>;
  company?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  pincode?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** Defines the billing address. */
export type BillingAddressInput = {
  /** Defines a billing address. */
  address?: InputMaybe<CartAddressInput>;
  /** An ID from the customer's address book that uniquely identifies the address to be used for billing. */
  customer_address_id?: InputMaybe<Scalars['Int']['input']>;
  /** The unique ID from the customer's address book that uniquely identifies the address to be used for billing. */
  customer_address_uid?: InputMaybe<Scalars['ID']['input']>;
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
  /** The unique ID from the customer's address book that uniquely identifies the address. */
  customer_address_uid?: Maybe<Scalars['ID']['output']>;
  /** @deprecated The field is used only in shipping address. */
  customer_notes?: Maybe<Scalars['String']['output']>;
  /** The customer's fax number. */
  fax?: Maybe<Scalars['String']['output']>;
  /** The first name of the customer or guest. */
  firstname: Scalars['String']['output'];
  /**
   * Id of the customer address.
   * @deprecated Use `customer_address_uid` instead.
   */
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
  /** The unique id of the customer cart address. */
  uid: Scalars['ID']['output'];
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

export type BundleOptions = {
  __typename?: 'BundleOptions';
  default_title?: Maybe<Scalars['String']['output']>;
  optionValues?: Maybe<Array<Maybe<GroupedOptionValues>>>;
  option_id?: Maybe<Scalars['String']['output']>;
  parent_id?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['String']['output']>;
  required?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
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
  /** @deprecated Use the `custom_attributes` field instead. */
  as_featured?: Maybe<Scalars['String']['output']>;
  /**
   * The attribute set assigned to the product.
   * @deprecated The field should not be used on the storefront.
   */
  attribute_set_id?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  brand_name?: Maybe<Scalars['Int']['output']>;
  /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled. */
  canonical_url?: Maybe<Scalars['String']['output']>;
  /** The categories assigned to a product. */
  categories?: Maybe<Array<Maybe<CategoryInterface>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  celimax?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  color?: Maybe<Scalars['Int']['output']>;
  /** The product's country of origin. */
  country_of_manufacture?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  cream_type?: Maybe<Scalars['Int']['output']>;
  /**
   * Timestamp indicating when the product was created.
   * @deprecated The field should not be used on the storefront.
   */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Crosssell Products */
  crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** Product custom attributes. */
  custom_attributesV2?: Maybe<ProductCustomAttributes>;
  /** @deprecated Use the `custom_attributes` field instead. */
  custom_tabs?: Maybe<Scalars['String']['output']>;
  /** Detailed information about the product. The value can include simple HTML tags. */
  description?: Maybe<ComplexTextValue>;
  /** @deprecated Use the `custom_attributes` field instead. */
  detail_sidebar?: Maybe<Scalars['String']['output']>;
  /** Indicates whether the bundle product has a dynamic price. */
  dynamic_price?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the bundle product has a dynamic SKU. */
  dynamic_sku?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the bundle product has a dynamically calculated weight. */
  dynamic_weight?: Maybe<Scalars['Boolean']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  expire_date?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  extended_notes?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_age_group?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_age_range?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_baby_food_stage?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_brand?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_capacity?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_color?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_compatible_devices?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_decor_style?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_digital_zoom?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_display_technology?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_finish?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_gemstone?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_gender?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_health_concern?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_ingredients?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_is_assembly_required?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_material?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_maximum_weight?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_megapixels?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_minimum_weight?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_model?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_number_of_licenses?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_operating_system?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_optical_zoom?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_package_quantity?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_pattern?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_depth?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_form?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_height?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_length?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_weight?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_width?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_recommended_use?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_resolution?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_scent?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_screen_size?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_shoe_width?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_size?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_storage_capacity?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_style?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_system_requirements?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_thread_count?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_video_game_platform?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  featured?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  food_type?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  gender?: Maybe<Scalars['Int']['output']>;
  /** Returns a value indicating gift message availability for the product. */
  gift_message_available: Scalars['Boolean']['output'];
  /** @deprecated Use the `custom_attributes` field instead. */
  glass_type?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  hair_type?: Maybe<Scalars['Int']['output']>;
  /**
   * The ID number assigned to the product.
   * @deprecated Use the `uid` field instead.
   */
  id?: Maybe<Scalars['Int']['output']>;
  /** The relative path to the main image on the product page. */
  image?: Maybe<ProductImage>;
  /** An array containing information about individual bundle items. */
  items?: Maybe<Array<Maybe<BundleItem>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  lens_type?: Maybe<Scalars['Int']['output']>;
  /** The Live stock popup: availability per place (the attributes of the attribute group Custom Stock - today Online Stock). */
  live_stock?: Maybe<Array<Maybe<ProductSourceStock>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  manufacture_date?: Maybe<Scalars['String']['output']>;
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
  /** Remaining stock if it is below the value assigned to the Only X Left Threshold option in the Admin. */
  only_x_left_in_stock?: Maybe<Scalars['Float']['output']>;
  /** An array of options for a customizable product. */
  options?: Maybe<Array<Maybe<CustomizableOptionInterface>>>;
  /** If the product has multiple options, determines where they appear on the product page. */
  options_container?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  perfume_type?: Maybe<Scalars['Int']['output']>;
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
  /** @deprecated Use the `custom_attributes` field instead. */
  product_series?: Maybe<Scalars['Int']['output']>;
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
  /** Rating figures of the product for each period (ALL, LAST_30_DAYS, LAST_60_DAYS, LAST_12_MONTHS): average, counts and the 5-to-1 star distribution. Periods are counted from the moment the product response was cached. */
  review_summaries: Array<Maybe<ProductReviewSummary>>;
  /** The list of products reviews. */
  reviews: ProductReviews;
  /** Indicates whether to ship bundle items together or individually. */
  ship_bundle_items?: Maybe<ShipBundleItemsEnum>;
  /** A short description of the product. Its use depends on the theme. */
  short_description?: Maybe<ComplexTextValue>;
  /** @deprecated Use the `custom_attributes` field instead. */
  skin_type?: Maybe<Scalars['Int']['output']>;
  /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
  sku?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  sm_featured?: Maybe<Scalars['Int']['output']>;
  /** The relative path to the small image, which is used on catalog pages. */
  small_image?: Maybe<ProductImage>;
  /** @deprecated Use the `custom_attributes` field instead. */
  solution_type?: Maybe<Scalars['Int']['output']>;
  /**
   * The beginning date that a product has a special price.
   * @deprecated The field should not be used on the storefront.
   */
  special_from_date?: Maybe<Scalars['String']['output']>;
  /** The discounted price of the product. */
  special_price?: Maybe<Scalars['Float']['output']>;
  /** The end date for a product with a special price. */
  special_to_date?: Maybe<Scalars['String']['output']>;
  /** The stock status of the product. */
  stock_status?: Maybe<ProductStockStatus>;
  /** @deprecated Use the `custom_attributes` field instead. */
  sunscreen_type?: Maybe<Scalars['Int']['output']>;
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
  /**
   * An array of websites in which the product is available.
   * @deprecated The field should not be used on the storefront.
   */
  websites?: Maybe<Array<Maybe<Website>>>;
  /** The weight of the item, in units defined by the store. */
  weight?: Maybe<Scalars['Float']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  youtube_video_url?: Maybe<Scalars['String']['output']>;
};


/** Defines basic features of a bundle product and contains multiple BundleItems. */
export type BundleProductCustom_AttributesV2Args = {
  filters?: InputMaybe<AttributeFilterInput>;
};


/** Defines basic features of a bundle product and contains multiple BundleItems. */
export type BundleProductReviewsArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<ProductReviewFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<ProductReviewSortInput>;
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
  /** Authentication result */
  authentication_result?: Maybe<AuthenticationResult>;
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

export type Carousel = {
  __typename?: 'Carousel';
  banners?: Maybe<Array<Maybe<BannerImages>>>;
  color?: Maybe<Scalars['String']['output']>;
  dominantColor?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  productList?: Maybe<Array<Maybe<OneProductList>>>;
  type?: Maybe<Scalars['String']['output']>;
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
  /** #mst Reward points information for cart */
  mstRewardPoints?: Maybe<MstRewardsCartPoints>;
  /** Pricing details for the quote. */
  prices?: Maybe<CartPrices>;
  /** Provides applied cart rules in the current active cart */
  rules?: Maybe<Array<Maybe<CartRuleStorefront>>>;
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
  telephone: Scalars['String']['input'];
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
  /** The unique ID from the customer's address book that uniquely identifies the address. */
  customer_address_uid?: Maybe<Scalars['ID']['output']>;
  /** The customer's fax number. */
  fax?: Maybe<Scalars['String']['output']>;
  /** The first name of the customer or guest. */
  firstname: Scalars['String']['output'];
  /**
   * Id of the customer address.
   * @deprecated Use `customer_address_uid` instead.
   */
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
  /** The unique id of the customer cart address. */
  uid: Scalars['ID']['output'];
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

export type CartCountResponse = {
  __typename?: 'CartCountResponse';
  cartCount?: Maybe<Scalars['Int']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type CartDetails = {
  __typename?: 'CartDetails';
  allowMultipleShipping?: Maybe<Scalars['Boolean']['output']>;
  canGuestCheckoutDownloadable?: Maybe<Scalars['Boolean']['output']>;
  cartCount?: Maybe<Scalars['Int']['output']>;
  cartTotal?: Maybe<Scalars['String']['output']>;
  couponCode?: Maybe<Scalars['String']['output']>;
  crossSellList?: Maybe<Array<Maybe<OneProductList>>>;
  descriptionMessage?: Maybe<Scalars['String']['output']>;
  isAllowedGuestCheckout?: Maybe<Scalars['Boolean']['output']>;
  isCheckoutAllowed?: Maybe<Scalars['Boolean']['output']>;
  isVirtual?: Maybe<Scalars['Boolean']['output']>;
  items?: Maybe<Array<Maybe<MobikulCartItems>>>;
  message?: Maybe<Scalars['String']['output']>;
  minimumAmount?: Maybe<Scalars['Int']['output']>;
  minimumFormattedAmount?: Maybe<Scalars['String']['output']>;
  quoteId?: Maybe<Scalars['Int']['output']>;
  showThreshold?: Maybe<Scalars['Boolean']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalsData?: Maybe<Array<Maybe<CartTotalData>>>;
  unformattedCartTotal?: Maybe<Scalars['Float']['output']>;
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

export type CartItemOptions = {
  __typename?: 'CartItemOptions';
  label?: Maybe<Scalars['String']['output']>;
  optionId?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  valueIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
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

export type CartRuleStorefront = {
  __typename?: 'CartRuleStorefront';
  /** The unique ID for a `CartRule` object. */
  uid: Scalars['ID']['output'];
};

/** Contains tax information about an item in the cart. */
export type CartTaxItem = {
  __typename?: 'CartTaxItem';
  /** The amount of tax applied to the item. */
  amount: Money;
  /** The description of the tax. */
  label: Scalars['String']['output'];
};

export type CartTotalData = {
  __typename?: 'CartTotalData';
  formattedValue?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  unformattedValue?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['String']['output']>;
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

export type Categories = {
  __typename?: 'Categories';
  banner?: Maybe<Scalars['String']['output']>;
  bannerDominantColor?: Maybe<Scalars['String']['output']>;
  hasChildren?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  thumbnailDominantColor?: Maybe<Scalars['String']['output']>;
};

export type CategoryBanners = {
  __typename?: 'CategoryBanners';
  dominantColor?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type CategoryData = {
  __typename?: 'CategoryData';
  dominantColor?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  img_url?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
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

export type CategoryInfo = {
  __typename?: 'CategoryInfo';
  categoryId?: Maybe<Scalars['Int']['output']>;
  categoryName?: Maybe<Scalars['String']['output']>;
  dominantColor?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

/** Contains the full set of attributes that can be returned in a category search. */
export type CategoryInterface = {
  available_sort_by?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** An array of breadcrumb items. */
  breadcrumbs?: Maybe<Array<Maybe<Breadcrumb>>>;
  bs_home_brand_image?: Maybe<Scalars['String']['output']>;
  bs_home_concern_image?: Maybe<Scalars['String']['output']>;
  bs_home_hero_image?: Maybe<Scalars['String']['output']>;
  bs_home_hero_mobile_image?: Maybe<Scalars['String']['output']>;
  bs_home_hero_side_image?: Maybe<Scalars['String']['output']>;
  bs_home_landed_image?: Maybe<Scalars['String']['output']>;
  bs_home_landed_mobile_image?: Maybe<Scalars['String']['output']>;
  bs_home_popup_image?: Maybe<Scalars['String']['output']>;
  bs_home_popup_mobile_image?: Maybe<Scalars['String']['output']>;
  bs_home_round_image?: Maybe<Scalars['String']['output']>;
  bs_home_tile_image?: Maybe<Scalars['String']['output']>;
  bs_home_vip_image?: Maybe<Scalars['String']['output']>;
  bs_home_wide_image?: Maybe<Scalars['String']['output']>;
  bs_home_wide_mobile_image?: Maybe<Scalars['String']['output']>;
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
  magic_image?: Maybe<Scalars['String']['output']>;
  magic_label?: Maybe<Scalars['String']['output']>;
  magic_thumbnail?: Maybe<Scalars['String']['output']>;
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
  sync_to_facebook_catalog?: Maybe<Scalars['Int']['output']>;
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

/** category page all information */
export type CategoryPageData = {
  __typename?: 'CategoryPageData';
  bannerImage?: Maybe<Array<Maybe<CategoryBanners>>>;
  cartCount?: Maybe<Scalars['Int']['output']>;
  categories?: Maybe<Array<Maybe<ParentCategories>>>;
  entityId?: Maybe<Scalars['Int']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  productList?: Maybe<Array<Maybe<OneProductList>>>;
  reviewEnable?: Maybe<Scalars['Boolean']['output']>;
  smallBannerImage?: Maybe<Array<Maybe<CategoryBanners>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
  wishlistEnable?: Maybe<Scalars['String']['output']>;
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
  bs_home_brand_image?: Maybe<Scalars['String']['output']>;
  bs_home_concern_image?: Maybe<Scalars['String']['output']>;
  bs_home_hero_image?: Maybe<Scalars['String']['output']>;
  bs_home_hero_mobile_image?: Maybe<Scalars['String']['output']>;
  bs_home_hero_side_image?: Maybe<Scalars['String']['output']>;
  bs_home_landed_image?: Maybe<Scalars['String']['output']>;
  bs_home_landed_mobile_image?: Maybe<Scalars['String']['output']>;
  bs_home_popup_image?: Maybe<Scalars['String']['output']>;
  bs_home_popup_mobile_image?: Maybe<Scalars['String']['output']>;
  bs_home_round_image?: Maybe<Scalars['String']['output']>;
  bs_home_tile_image?: Maybe<Scalars['String']['output']>;
  bs_home_vip_image?: Maybe<Scalars['String']['output']>;
  bs_home_wide_image?: Maybe<Scalars['String']['output']>;
  bs_home_wide_mobile_image?: Maybe<Scalars['String']['output']>;
  /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Categories' is enabled. */
  canonical_url?: Maybe<Scalars['String']['output']>;
  /** A tree of child categories. */
  children?: Maybe<Array<Maybe<CategoryTree>>>;
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
  magic_image?: Maybe<Scalars['String']['output']>;
  magic_label?: Maybe<Scalars['String']['output']>;
  magic_thumbnail?: Maybe<Scalars['String']['output']>;
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
  sync_to_facebook_catalog?: Maybe<Scalars['Int']['output']>;
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

export type CheckCustomerByEmail = {
  __typename?: 'CheckCustomerByEmail';
  isCustomerExist?: Maybe<Scalars['Boolean']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type CheckoutAddress = {
  __typename?: 'CheckoutAddress';
  SuffixHasOptions?: Maybe<Scalars['Boolean']['output']>;
  SuffixOptions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  address?: Maybe<Array<Maybe<CheckoutAddressData>>>;
  allowToChooseState?: Maybe<Scalars['Boolean']['output']>;
  cartCount?: Maybe<Scalars['Int']['output']>;
  defaultCountry?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  isMiddlenameVisible?: Maybe<Scalars['Boolean']['output']>;
  isPrefixRequired?: Maybe<Scalars['Boolean']['output']>;
  isPrefixVisible?: Maybe<Scalars['Boolean']['output']>;
  isSuffixRequired?: Maybe<Scalars['Boolean']['output']>;
  isSuffixVisible?: Maybe<Scalars['Boolean']['output']>;
  isVirtual?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  middleName?: Maybe<Scalars['String']['output']>;
  prefixHasOptions?: Maybe<Scalars['Boolean']['output']>;
  prefixOptions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  prefixValue?: Maybe<Scalars['String']['output']>;
  streetLineCount?: Maybe<Scalars['Int']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  suffixValue?: Maybe<Scalars['String']['output']>;
};

export type CheckoutAddressData = {
  __typename?: 'CheckoutAddressData';
  id?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type CheckoutAddressFormData = {
  __typename?: 'CheckoutAddressFormData';
  address?: Maybe<Array<Maybe<CheckoutAddressData>>>;
  addressData?: Maybe<AddressFormData>;
  countryData?: Maybe<Array<Maybe<CountryData>>>;
  defaultCountry?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  isAddressTitleRequired?: Maybe<Scalars['Boolean']['output']>;
  isAddressTitleVisible?: Maybe<Scalars['Boolean']['output']>;
  isCompanyRequired?: Maybe<Scalars['Boolean']['output']>;
  isCompanyVisible?: Maybe<Scalars['Boolean']['output']>;
  isDOBRequired?: Maybe<Scalars['Boolean']['output']>;
  isDOBVisible?: Maybe<Scalars['Boolean']['output']>;
  isFaxRequired?: Maybe<Scalars['Boolean']['output']>;
  isFaxVisible?: Maybe<Scalars['Boolean']['output']>;
  isGenderRequired?: Maybe<Scalars['Boolean']['output']>;
  isGenderVisible?: Maybe<Scalars['Boolean']['output']>;
  isGuest?: Maybe<Scalars['Boolean']['output']>;
  isMiddlenameVisible?: Maybe<Scalars['Boolean']['output']>;
  isPrefixRequired?: Maybe<Scalars['Boolean']['output']>;
  isPrefixVisible?: Maybe<Scalars['Boolean']['output']>;
  isSuffixRequired?: Maybe<Scalars['Boolean']['output']>;
  isSuffixVisible?: Maybe<Scalars['Boolean']['output']>;
  isTaxRequired?: Maybe<Scalars['Boolean']['output']>;
  isTaxVisible?: Maybe<Scalars['Boolean']['output']>;
  isTelephoneRequired?: Maybe<Scalars['Boolean']['output']>;
  isTelephoneVisible?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  middleName?: Maybe<Scalars['String']['output']>;
  prefixHasOptions?: Maybe<Scalars['Boolean']['output']>;
  prefixOptions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  prefixValue?: Maybe<Scalars['String']['output']>;
  streetLineCount?: Maybe<Scalars['Int']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  suffixHasOptions?: Maybe<Scalars['Boolean']['output']>;
  suffixOptions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  suffixValue?: Maybe<Scalars['String']['output']>;
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

export type ChildCategories = {
  __typename?: 'ChildCategories';
  hasChildren?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** Contains details about errors encountered when a customer clear cart. */
export type ClearCartError = {
  __typename?: 'ClearCartError';
  /** A localized error message */
  message: Scalars['String']['output'];
  /** A cart-specific error type. */
  type: ClearCartErrorType;
};

export enum ClearCartErrorType {
  Inactive = 'INACTIVE',
  NotFound = 'NOT_FOUND',
  Unauthorised = 'UNAUTHORISED',
  Undefined = 'UNDEFINED'
}

/** Assigns a specific `cart_id` to the empty cart. */
export type ClearCartInput = {
  /** The unique ID of a `Cart` object. */
  uid: Scalars['ID']['input'];
};

/** Output of the request to clear the customer cart. */
export type ClearCartOutput = {
  __typename?: 'ClearCartOutput';
  /** The cart after clear cart items. */
  cart?: Maybe<Cart>;
  /** An array of errors encountered while clearing the cart item */
  errors?: Maybe<Array<Maybe<ClearCartError>>>;
};

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

export type CmsData = {
  __typename?: 'CmsData';
  content?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
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

export type CompareAttributeList = {
  __typename?: 'CompareAttributeList';
  attributeName?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** Contains iterable information such as the array of items, the count, and attributes that represent the compare list. */
export type CompareList = {
  __typename?: 'CompareList';
  attributeValueList?: Maybe<Array<Maybe<CompareAttributeList>>>;
  /** An array of attributes that can be used for comparing products. */
  attributes?: Maybe<Array<Maybe<ComparableAttribute>>>;
  /** The number of items in the compare list. */
  item_count: Scalars['Int']['output'];
  /** An array of products to compare. */
  items?: Maybe<Array<Maybe<ComparableItem>>>;
  message?: Maybe<Scalars['String']['output']>;
  productList?: Maybe<Array<Maybe<OneProductList>>>;
  showSwatchOnCollection?: Maybe<Scalars['Boolean']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
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

export type ConfigOptionPrices = {
  __typename?: 'ConfigOptionPrices';
  basePrice?: Maybe<ConfigPriceAmount>;
  finalPrice?: Maybe<ConfigPriceAmount>;
  msrpPrice?: Maybe<ConfigPriceAmount>;
  oldPrice?: Maybe<ConfigPriceAmount>;
  product?: Maybe<Scalars['Int']['output']>;
  tierPrices?: Maybe<ConfigPriceAmount>;
};

export type ConfigOptions = {
  __typename?: 'ConfigOptions';
  id?: Maybe<Scalars['Int']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  products?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type ConfigPriceAmount = {
  __typename?: 'ConfigPriceAmount';
  amount?: Maybe<Scalars['Float']['output']>;
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

export type ConfigurableAttributes = {
  __typename?: 'ConfigurableAttributes';
  code?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  options?: Maybe<Array<Maybe<ConfigOptions>>>;
  swatchType?: Maybe<Scalars['String']['output']>;
  updateProductPreviewImage?: Maybe<Scalars['Boolean']['output']>;
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

export type ConfigurableData = {
  __typename?: 'ConfigurableData';
  attributes?: Maybe<Array<Maybe<ConfigurableAttributes>>>;
  chooseText?: Maybe<Scalars['String']['output']>;
  images?: Maybe<Scalars['String']['output']>;
  index?: Maybe<Scalars['String']['output']>;
  optionPrices?: Maybe<Array<Maybe<ConfigOptionPrices>>>;
  productId?: Maybe<Scalars['Int']['output']>;
  swatchData?: Maybe<Scalars['String']['output']>;
  template?: Maybe<Scalars['String']['output']>;
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
  /** @deprecated Use the `custom_attributes` field instead. */
  as_featured?: Maybe<Scalars['String']['output']>;
  /**
   * The attribute set assigned to the product.
   * @deprecated The field should not be used on the storefront.
   */
  attribute_set_id?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  brand_name?: Maybe<Scalars['Int']['output']>;
  /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled. */
  canonical_url?: Maybe<Scalars['String']['output']>;
  /** The categories assigned to a product. */
  categories?: Maybe<Array<Maybe<CategoryInterface>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  celimax?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  color?: Maybe<Scalars['Int']['output']>;
  /** An array of options for the configurable product. */
  configurable_options?: Maybe<Array<Maybe<ConfigurableProductOptions>>>;
  /** An array of media gallery items and other details about selected configurable product options as well as details about remaining selectable options. */
  configurable_product_options_selection?: Maybe<ConfigurableProductOptionsSelection>;
  /** The product's country of origin. */
  country_of_manufacture?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  cream_type?: Maybe<Scalars['Int']['output']>;
  /**
   * Timestamp indicating when the product was created.
   * @deprecated The field should not be used on the storefront.
   */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Crosssell Products */
  crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** Product custom attributes. */
  custom_attributesV2?: Maybe<ProductCustomAttributes>;
  /** @deprecated Use the `custom_attributes` field instead. */
  custom_tabs?: Maybe<Scalars['String']['output']>;
  /** Detailed information about the product. The value can include simple HTML tags. */
  description?: Maybe<ComplexTextValue>;
  /** @deprecated Use the `custom_attributes` field instead. */
  detail_sidebar?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  expire_date?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  extended_notes?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_age_group?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_age_range?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_baby_food_stage?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_brand?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_capacity?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_color?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_compatible_devices?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_decor_style?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_digital_zoom?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_display_technology?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_finish?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_gemstone?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_gender?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_health_concern?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_ingredients?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_is_assembly_required?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_material?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_maximum_weight?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_megapixels?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_minimum_weight?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_model?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_number_of_licenses?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_operating_system?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_optical_zoom?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_package_quantity?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_pattern?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_depth?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_form?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_height?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_length?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_weight?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_width?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_recommended_use?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_resolution?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_scent?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_screen_size?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_shoe_width?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_size?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_storage_capacity?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_style?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_system_requirements?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_thread_count?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_video_game_platform?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  featured?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  food_type?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  gender?: Maybe<Scalars['Int']['output']>;
  /** Returns a value indicating gift message availability for the product. */
  gift_message_available: Scalars['Boolean']['output'];
  /** @deprecated Use the `custom_attributes` field instead. */
  glass_type?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  hair_type?: Maybe<Scalars['Int']['output']>;
  /**
   * The ID number assigned to the product.
   * @deprecated Use the `uid` field instead.
   */
  id?: Maybe<Scalars['Int']['output']>;
  /** The relative path to the main image on the product page. */
  image?: Maybe<ProductImage>;
  /** @deprecated Use the `custom_attributes` field instead. */
  lens_type?: Maybe<Scalars['Int']['output']>;
  /** The Live stock popup: availability per place (the attributes of the attribute group Custom Stock - today Online Stock). */
  live_stock?: Maybe<Array<Maybe<ProductSourceStock>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  manufacture_date?: Maybe<Scalars['String']['output']>;
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
  /** Remaining stock if it is below the value assigned to the Only X Left Threshold option in the Admin. */
  only_x_left_in_stock?: Maybe<Scalars['Float']['output']>;
  /** An array of options for a customizable product. */
  options?: Maybe<Array<Maybe<CustomizableOptionInterface>>>;
  /** If the product has multiple options, determines where they appear on the product page. */
  options_container?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  perfume_type?: Maybe<Scalars['Int']['output']>;
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
  /** @deprecated Use the `custom_attributes` field instead. */
  product_series?: Maybe<Scalars['Int']['output']>;
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
  /** Rating figures of the product for each period (ALL, LAST_30_DAYS, LAST_60_DAYS, LAST_12_MONTHS): average, counts and the 5-to-1 star distribution. Periods are counted from the moment the product response was cached. */
  review_summaries: Array<Maybe<ProductReviewSummary>>;
  /** The list of products reviews. */
  reviews: ProductReviews;
  /** A short description of the product. Its use depends on the theme. */
  short_description?: Maybe<ComplexTextValue>;
  /** @deprecated Use the `custom_attributes` field instead. */
  skin_type?: Maybe<Scalars['Int']['output']>;
  /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
  sku?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  sm_featured?: Maybe<Scalars['Int']['output']>;
  /** The relative path to the small image, which is used on catalog pages. */
  small_image?: Maybe<ProductImage>;
  /** @deprecated Use the `custom_attributes` field instead. */
  solution_type?: Maybe<Scalars['Int']['output']>;
  /**
   * The beginning date that a product has a special price.
   * @deprecated The field should not be used on the storefront.
   */
  special_from_date?: Maybe<Scalars['String']['output']>;
  /** The discounted price of the product. */
  special_price?: Maybe<Scalars['Float']['output']>;
  /** The end date for a product with a special price. */
  special_to_date?: Maybe<Scalars['String']['output']>;
  /** The stock status of the product. */
  stock_status?: Maybe<ProductStockStatus>;
  /** @deprecated Use the `custom_attributes` field instead. */
  sunscreen_type?: Maybe<Scalars['Int']['output']>;
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
  /**
   * An array of websites in which the product is available.
   * @deprecated The field should not be used on the storefront.
   */
  websites?: Maybe<Array<Maybe<Website>>>;
  /** The weight of the item, in units defined by the store. */
  weight?: Maybe<Scalars['Float']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  youtube_video_url?: Maybe<Scalars['String']['output']>;
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
  filter?: InputMaybe<ProductReviewFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<ProductReviewSortInput>;
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

export type ContactCards = {
  __typename?: 'ContactCards';
  address: Scalars['String']['output'];
  email: Scalars['String']['output'];
  hotline: Scalars['String']['output'];
  hours: Scalars['String']['output'];
  whatsapp?: Maybe<Scalars['String']['output']>;
};

/** Contact Us page content */
export type ContactPageContent = {
  __typename?: 'ContactPageContent';
  contact_cards: ContactCards;
  form_subtitle?: Maybe<Scalars['String']['output']>;
  form_title: Scalars['String']['output'];
  /** Google Maps embed address for the iframe src */
  map_embed_url?: Maybe<Scalars['String']['output']>;
  meta_description?: Maybe<Scalars['String']['output']>;
  meta_title?: Maybe<Scalars['String']['output']>;
  showroom_cta_label?: Maybe<Scalars['String']['output']>;
  showroom_cta_link?: Maybe<Scalars['String']['output']>;
  social: Array<Maybe<ContactSocialLink>>;
  subtitle?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type ContactSocialLink = {
  __typename?: 'ContactSocialLink';
  href: Scalars['String']['output'];
  /** facebook | youtube | twitter | instagram | tiktok | pinterest | linkedin */
  network: Scalars['String']['output'];
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

export type CountryData = {
  __typename?: 'CountryData';
  country_id?: Maybe<Scalars['String']['output']>;
  isStateRequired?: Maybe<Scalars['Boolean']['output']>;
  isZipOptional?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  states?: Maybe<Array<Maybe<States>>>;
};

export type CreateAccount = {
  __typename?: 'CreateAccount';
  bannerImage?: Maybe<Scalars['String']['output']>;
  bearerToken?: Maybe<Scalars['String']['output']>;
  cartCount?: Maybe<Scalars['Int']['output']>;
  customerEmail?: Maybe<Scalars['String']['output']>;
  customerId?: Maybe<Scalars['String']['output']>;
  customerName?: Maybe<Scalars['String']['output']>;
  customerToken?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  profileImage?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type CreateAccountFormData = {
  __typename?: 'CreateAccountFormData';
  dateFormat?: Maybe<Scalars['String']['output']>;
  isDOBRequired?: Maybe<Scalars['Boolean']['output']>;
  isDOBVisible?: Maybe<Scalars['Boolean']['output']>;
  isGenderRequired?: Maybe<Scalars['Boolean']['output']>;
  isGenderVisible?: Maybe<Scalars['Boolean']['output']>;
  isMiddlenameVisible?: Maybe<Scalars['Boolean']['output']>;
  isMobileRequired?: Maybe<Scalars['Boolean']['output']>;
  isMobileVisible?: Maybe<Scalars['Boolean']['output']>;
  isPrefixRequired?: Maybe<Scalars['Boolean']['output']>;
  isPrefixVisible?: Maybe<Scalars['Boolean']['output']>;
  isSuffixRequired?: Maybe<Scalars['Boolean']['output']>;
  isSuffixVisible?: Maybe<Scalars['Boolean']['output']>;
  isTaxRequired?: Maybe<Scalars['Boolean']['output']>;
  isTaxVisible?: Maybe<Scalars['Boolean']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  prefixHasOptions?: Maybe<Scalars['Boolean']['output']>;
  prefixOptions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
  suffixHasOptions?: Maybe<Scalars['Boolean']['output']>;
  suffixOptions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

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
  /** Up to 5 images as base64 (a data URI such as data:image/jpeg;base64,... or the plain base64 text). JPEG, PNG, GIF or WebP, 2 MB each. */
  photos?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Comment on the price (up to 1000 characters). */
  price?: InputMaybe<Scalars['String']['input']>;
  /** What the customer liked (up to 1000 characters). */
  pros?: InputMaybe<Scalars['String']['input']>;
  /** The ratings details by category. For example, Price: 5 stars, Quality: 4 stars, etc. */
  ratings: Array<InputMaybe<ProductReviewRatingInput>>;
  /** The SKU of the reviewed product. */
  sku: Scalars['String']['input'];
  /** The summary (title) of the review. */
  summary: Scalars['String']['input'];
  /** The review text. */
  text: Scalars['String']['input'];
  /** Comment on the value (up to 1000 characters). */
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Contains the completed product review. */
export type CreateProductReviewOutput = {
  __typename?: 'CreateProductReviewOutput';
  /** Product review details. */
  review: ProductReview;
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

export type CreditMemoList = {
  __typename?: 'CreditMemoList';
  incrementId?: Maybe<Scalars['String']['output']>;
  items?: Maybe<Array<Maybe<CreditMemoProductList>>>;
  totals?: Maybe<Array<Maybe<OrderItemTotals>>>;
};

export type CreditMemoProductList = {
  __typename?: 'CreditMemoProductList';
  discountAmount?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  option?: Maybe<Array<Maybe<ItemListOptions>>>;
  price?: Maybe<Scalars['String']['output']>;
  qty?: Maybe<Scalars['Int']['output']>;
  rowTotal?: Maybe<Scalars['String']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
  subTotal?: Maybe<Scalars['String']['output']>;
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

export type CreditView = {
  __typename?: 'CreditView';
  billingAddress?: Maybe<BillingAddress>;
  itemList?: Maybe<Array<Maybe<InvoiceItemList>>>;
  message?: Maybe<Scalars['String']['output']>;
  orderId?: Maybe<Scalars['Int']['output']>;
  paymentMethod?: Maybe<PaymentMethod>;
  shippingAddress?: Maybe<ShippingAddress>;
  shippingMethod?: Maybe<ShippingMethod>;
  success?: Maybe<Scalars['Boolean']['output']>;
  totals?: Maybe<Array<Maybe<InvoiceTotalsData>>>;
};

export type Currency = {
  __typename?: 'Currency';
  /** An array of three-letter currency codes accepted by the store, such as USD and EUR. */
  available_currency_codes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
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

export type CustomCollection = {
  __typename?: 'CustomCollection';
  cartCount?: Maybe<Scalars['Int']['output']>;
  layeredData?: Maybe<Array<Maybe<LayeredData>>>;
  message?: Maybe<Scalars['String']['output']>;
  productList?: Maybe<Array<Maybe<OneProductList>>>;
  sortingData?: Maybe<Array<Maybe<SortingData>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type CustomOptions = {
  __typename?: 'CustomOptions';
  decorated_is_first?: Maybe<Scalars['String']['output']>;
  decorated_is_last?: Maybe<Scalars['Boolean']['output']>;
  decorated_is_odd?: Maybe<Scalars['Boolean']['output']>;
  default_price?: Maybe<Scalars['String']['output']>;
  default_price_type?: Maybe<Scalars['String']['output']>;
  default_title?: Maybe<Scalars['String']['output']>;
  file_extension?: Maybe<Scalars['String']['output']>;
  formatted_default_price?: Maybe<Scalars['String']['output']>;
  formatted_price?: Maybe<Scalars['String']['output']>;
  image_size_x?: Maybe<Scalars['String']['output']>;
  image_size_y?: Maybe<Scalars['String']['output']>;
  is_require?: Maybe<Scalars['String']['output']>;
  max_characters?: Maybe<Scalars['String']['output']>;
  optionValues?: Maybe<Array<Maybe<OptionValues>>>;
  option_id?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['String']['output']>;
  price_type?: Maybe<Scalars['String']['output']>;
  product_id?: Maybe<Scalars['String']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
  sort_order?: Maybe<Scalars['String']['output']>;
  store_price?: Maybe<Scalars['String']['output']>;
  store_price_type?: Maybe<Scalars['String']['output']>;
  store_title?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  unformatted_default_price?: Maybe<Scalars['String']['output']>;
  unformatted_price?: Maybe<Scalars['String']['output']>;
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
  /** Customer group assigned to the customer */
  group?: Maybe<CustomerGroupStorefront>;
  /** @deprecated Customer group should not be exposed in the storefront scenarios. */
  group_id?: Maybe<Scalars['Int']['output']>;
  /** The unique ID assigned to the customer. */
  id: Scalars['ID']['output'];
  /** Indicates whether the customer is subscribed to the company's newsletter. */
  is_subscribed?: Maybe<Scalars['Boolean']['output']>;
  /** The customer's family name. */
  lastname?: Maybe<Scalars['String']['output']>;
  /** The customer's middle name. */
  middlename?: Maybe<Scalars['String']['output']>;
  /** #mst Reward points information for customer */
  mstRewardPointsBalance?: Maybe<MstRewardsRewardsCustomerInfo>;
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
  /**
   * The ID of a `CustomerAddress` object.
   * @deprecated Use `uid` instead.
   */
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
  /** The unique ID for a `CustomerAddress` object. */
  uid?: Maybe<Scalars['ID']['output']>;
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

export type CustomerDetailsResponse = {
  __typename?: 'CustomerDetailsResponse';
  bannerDominantColor?: Maybe<Scalars['String']['output']>;
  customerBannerImage?: Maybe<Scalars['String']['output']>;
  customerDominantColor?: Maybe<Scalars['String']['output']>;
  customerEmail?: Maybe<Scalars['String']['output']>;
  customerName?: Maybe<Scalars['String']['output']>;
  customerProfileImage?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
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

/** Data of customer group. */
export type CustomerGroupStorefront = {
  __typename?: 'CustomerGroupStorefront';
  /** The unique ID for a `CustomerGroup` object. */
  uid: Scalars['ID']['output'];
};

/** An input object that assigns or updates customer attributes. */
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
  /** #mst Reward points spent and earned on the order, net of cancellations and refunds; null when none are left */
  mstRewardPoints?: Maybe<MstRewardsOrderPoints>;
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

export type CustomerWishlistData = {
  __typename?: 'CustomerWishlistData';
  productId?: Maybe<Scalars['Int']['output']>;
  wishlistItemId?: Maybe<Scalars['Int']['output']>;
};

export type CustomerWishlistItem = {
  __typename?: 'CustomerWishlistItem';
  productId?: Maybe<Scalars['Int']['output']>;
  wishlistItemId?: Maybe<Scalars['Int']['output']>;
};

export type CustomerWishlistResponse = {
  __typename?: 'CustomerWishlistResponse';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  totalCount?: Maybe<Scalars['Int']['output']>;
  wishlist?: Maybe<Array<Maybe<CustomerWishlistItem>>>;
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

export type DefaultResponse = {
  __typename?: 'DefaultResponse';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteAccount = {
  __typename?: 'DeleteAccount';
  message?: Maybe<Scalars['String']['output']>;
  otherError?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/** Contains the results of the request to delete a compare list. */
export type DeleteCompareListOutput = {
  __typename?: 'DeleteCompareListOutput';
  /** Indicates whether the compare list was successfully deleted. */
  result: Scalars['Boolean']['output'];
};

/** Indicates whether the request succeeded and returns the remaining customer payment tokens. */
export type DeletePaymentTokenOutput = {
  __typename?: 'DeletePaymentTokenOutput';
  /** A container for the customer's remaining payment tokens. */
  customerPaymentTokens?: Maybe<CustomerPaymentTokens>;
  /** Indicates whether the request succeeded. */
  result: Scalars['Boolean']['output'];
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

export type DownloadProduct = {
  __typename?: 'DownloadProduct';
  fileName?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  mimeType?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  url?: Maybe<Scalars['String']['output']>;
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

export type DownloadableLinks = {
  __typename?: 'DownloadableLinks';
  linkData?: Maybe<Array<Maybe<LinkData>>>;
  linksPurchasedSeparately?: Maybe<Scalars['Boolean']['output']>;
  title?: Maybe<Scalars['String']['output']>;
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
  /** @deprecated Use the `custom_attributes` field instead. */
  as_featured?: Maybe<Scalars['String']['output']>;
  /**
   * The attribute set assigned to the product.
   * @deprecated The field should not be used on the storefront.
   */
  attribute_set_id?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  brand_name?: Maybe<Scalars['Int']['output']>;
  /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled. */
  canonical_url?: Maybe<Scalars['String']['output']>;
  /** The categories assigned to a product. */
  categories?: Maybe<Array<Maybe<CategoryInterface>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  celimax?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  color?: Maybe<Scalars['Int']['output']>;
  /** The product's country of origin. */
  country_of_manufacture?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  cream_type?: Maybe<Scalars['Int']['output']>;
  /**
   * Timestamp indicating when the product was created.
   * @deprecated The field should not be used on the storefront.
   */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Crosssell Products */
  crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** Product custom attributes. */
  custom_attributesV2?: Maybe<ProductCustomAttributes>;
  /** @deprecated Use the `custom_attributes` field instead. */
  custom_tabs?: Maybe<Scalars['String']['output']>;
  /** Detailed information about the product. The value can include simple HTML tags. */
  description?: Maybe<ComplexTextValue>;
  /** @deprecated Use the `custom_attributes` field instead. */
  detail_sidebar?: Maybe<Scalars['String']['output']>;
  /** An array containing information about the links for this downloadable product. */
  downloadable_product_links?: Maybe<Array<Maybe<DownloadableProductLinks>>>;
  /** An array containing information about samples of this downloadable product. */
  downloadable_product_samples?: Maybe<Array<Maybe<DownloadableProductSamples>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  expire_date?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  extended_notes?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_age_group?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_age_range?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_baby_food_stage?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_brand?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_capacity?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_color?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_compatible_devices?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_decor_style?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_digital_zoom?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_display_technology?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_finish?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_gemstone?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_gender?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_health_concern?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_ingredients?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_is_assembly_required?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_material?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_maximum_weight?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_megapixels?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_minimum_weight?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_model?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_number_of_licenses?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_operating_system?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_optical_zoom?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_package_quantity?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_pattern?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_depth?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_form?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_height?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_length?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_weight?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_width?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_recommended_use?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_resolution?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_scent?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_screen_size?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_shoe_width?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_size?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_storage_capacity?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_style?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_system_requirements?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_thread_count?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_video_game_platform?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  featured?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  food_type?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  gender?: Maybe<Scalars['Int']['output']>;
  /** Returns a value indicating gift message availability for the product. */
  gift_message_available: Scalars['Boolean']['output'];
  /** @deprecated Use the `custom_attributes` field instead. */
  glass_type?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  hair_type?: Maybe<Scalars['Int']['output']>;
  /**
   * The ID number assigned to the product.
   * @deprecated Use the `uid` field instead.
   */
  id?: Maybe<Scalars['Int']['output']>;
  /** The relative path to the main image on the product page. */
  image?: Maybe<ProductImage>;
  /** @deprecated Use the `custom_attributes` field instead. */
  lens_type?: Maybe<Scalars['Int']['output']>;
  /** A value of 1 indicates that each link in the array must be purchased separately. */
  links_purchased_separately?: Maybe<Scalars['Int']['output']>;
  /** The heading above the list of downloadable products. */
  links_title?: Maybe<Scalars['String']['output']>;
  /** The Live stock popup: availability per place (the attributes of the attribute group Custom Stock - today Online Stock). */
  live_stock?: Maybe<Array<Maybe<ProductSourceStock>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  manufacture_date?: Maybe<Scalars['String']['output']>;
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
  /** Remaining stock if it is below the value assigned to the Only X Left Threshold option in the Admin. */
  only_x_left_in_stock?: Maybe<Scalars['Float']['output']>;
  /** An array of options for a customizable product. */
  options?: Maybe<Array<Maybe<CustomizableOptionInterface>>>;
  /** If the product has multiple options, determines where they appear on the product page. */
  options_container?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  perfume_type?: Maybe<Scalars['Int']['output']>;
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
  /** @deprecated Use the `custom_attributes` field instead. */
  product_series?: Maybe<Scalars['Int']['output']>;
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
  /** Rating figures of the product for each period (ALL, LAST_30_DAYS, LAST_60_DAYS, LAST_12_MONTHS): average, counts and the 5-to-1 star distribution. Periods are counted from the moment the product response was cached. */
  review_summaries: Array<Maybe<ProductReviewSummary>>;
  /** The list of products reviews. */
  reviews: ProductReviews;
  /** A short description of the product. Its use depends on the theme. */
  short_description?: Maybe<ComplexTextValue>;
  /** @deprecated Use the `custom_attributes` field instead. */
  skin_type?: Maybe<Scalars['Int']['output']>;
  /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
  sku?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  sm_featured?: Maybe<Scalars['Int']['output']>;
  /** The relative path to the small image, which is used on catalog pages. */
  small_image?: Maybe<ProductImage>;
  /** @deprecated Use the `custom_attributes` field instead. */
  solution_type?: Maybe<Scalars['Int']['output']>;
  /**
   * The beginning date that a product has a special price.
   * @deprecated The field should not be used on the storefront.
   */
  special_from_date?: Maybe<Scalars['String']['output']>;
  /** The discounted price of the product. */
  special_price?: Maybe<Scalars['Float']['output']>;
  /** The end date for a product with a special price. */
  special_to_date?: Maybe<Scalars['String']['output']>;
  /** The stock status of the product. */
  stock_status?: Maybe<ProductStockStatus>;
  /** @deprecated Use the `custom_attributes` field instead. */
  sunscreen_type?: Maybe<Scalars['Int']['output']>;
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
  /**
   * An array of websites in which the product is available.
   * @deprecated The field should not be used on the storefront.
   */
  websites?: Maybe<Array<Maybe<Website>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  youtube_video_url?: Maybe<Scalars['String']['output']>;
};


/** Defines a product that the shopper downloads. */
export type DownloadableProductCustom_AttributesV2Args = {
  filters?: InputMaybe<AttributeFilterInput>;
};


/** Defines a product that the shopper downloads. */
export type DownloadableProductReviewsArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<ProductReviewFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<ProductReviewSortInput>;
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

export type DownloadableSamples = {
  __typename?: 'DownloadableSamples';
  hasSample?: Maybe<Scalars['Boolean']['output']>;
  linkSampleData?: Maybe<Array<Maybe<LinkSampleData>>>;
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

export type DownloadsList = {
  __typename?: 'DownloadsList';
  canReorder?: Maybe<Scalars['Boolean']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  incrementId?: Maybe<Scalars['String']['output']>;
  isOrderExist?: Maybe<Scalars['Boolean']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  proName?: Maybe<Scalars['String']['output']>;
  remainingDownloads?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  statusColorCode?: Maybe<Scalars['String']['output']>;
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

export type FieldList = {
  __typename?: 'FieldList';
  attributeCode?: Maybe<Scalars['String']['output']>;
  fieldList?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  maxQueryLength?: Maybe<Scalars['String']['output']>;
  options?: Maybe<Array<Maybe<FieldListOptions>>>;
  title?: Maybe<Scalars['String']['output']>;
};

export type FieldListOptions = {
  __typename?: 'FieldListOptions';
  label?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
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
  count?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
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

/** Footer of every page, managed in Admin > Webkul BS Theme > Footer. Lists contain only active rows, in admin sort order. */
export type Footer = {
  __typename?: 'Footer';
  /** Mobile app box; null when neither store URL is set */
  apps?: Maybe<FooterApps>;
  /** Footer columns, including the corporate contact column; a column without a valid row is left out */
  columns: Array<Maybe<FooterColumn>>;
  /** Bottom bar text; the year placeholder set in the admin is already replaced by the current year */
  copyright?: Maybe<Scalars['String']['output']>;
  /** Trust badges, e.g. 100% Secure Payments */
  highlights: Array<Maybe<FooterHighlight>>;
  /** Links in the bottom bar */
  legal_links: Array<Maybe<FooterLink>>;
  newsletter_text?: Maybe<Scalars['String']['output']>;
  /** Heading of the footer newsletter box */
  newsletter_title?: Maybe<Scalars['String']['output']>;
  /** Accepted payment methods image; null when none is uploaded */
  payment_banner?: Maybe<FooterPaymentBanner>;
  social: Array<Maybe<FooterSocialLink>>;
};

export type FooterApps = {
  __typename?: 'FooterApps';
  /** Google Play URL */
  android?: Maybe<Scalars['String']['output']>;
  /** App Store URL */
  ios?: Maybe<Scalars['String']['output']>;
  /** Heading of the app box, e.g. Check out our app! */
  title?: Maybe<Scalars['String']['output']>;
};

export type FooterColumn = {
  __typename?: 'FooterColumn';
  links: Array<Maybe<FooterLink>>;
  title: Scalars['String']['output'];
};

export type FooterHighlight = {
  __typename?: 'FooterHighlight';
  /** secure | delivery | support | authentic. Null = no icon. */
  icon?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

/** One row of a footer column or of the bottom bar: a link, or plain text such as an address, phone number, email or opening hours. */
export type FooterLink = {
  __typename?: 'FooterLink';
  /** Storefront path (e.g. /category/makeup-shop, /contact), absolute URL, mailto: or tel:. Null for a text row. */
  href?: Maybe<Scalars['String']['output']>;
  /** Icon keyword the storefront maps to its own icon: EMAIL | PHONE | SUPPORT | CLOCK | DELIVERY | LOCATION | GIFT | WHATSAPP | MAP. Null = no icon. */
  icon?: Maybe<Scalars['String']['output']>;
  /** The link text, or the heading of a text row (e.g. Address, Hotline). */
  label: Scalars['String']['output'];
  /** true = open in a new tab */
  new_tab: Scalars['Boolean']['output'];
  /** The plain text of a text row (e.g. the address). Null for a link. */
  text?: Maybe<Scalars['String']['output']>;
};

export type FooterPaymentBanner = {
  __typename?: 'FooterPaymentBanner';
  /** Alt text set in the admin, default Accepted Payment Methods */
  alt_text?: Maybe<Scalars['String']['output']>;
  /** Full URL of the uploaded image */
  image_url?: Maybe<Scalars['String']['output']>;
};

export type FooterSocialLink = {
  __typename?: 'FooterSocialLink';
  href: Scalars['String']['output'];
  /** facebook | youtube | twitter | instagram | tiktok | pinterest | linkedin */
  network: Scalars['String']['output'];
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

export type GetCategoryList = {
  __typename?: 'GetCategoryList';
  categoryData?: Maybe<Array<Maybe<CategoryData>>>;
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/** Gets the payment SDK URLs and values */
export type GetPaymentSdkOutput = {
  __typename?: 'GetPaymentSDKOutput';
  /** The payment SDK parameters */
  sdkParams?: Maybe<Array<Maybe<PaymentSdkParamsItem>>>;
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
  /** Google Pay mode */
  google_pay_mode?: Maybe<GooglePayMode>;
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

/** Google Pay mode. */
export enum GooglePayMode {
  Production = 'PRODUCTION',
  Test = 'TEST'
}

export type GroupedData = {
  __typename?: 'GroupedData';
  defaultQty?: Maybe<Scalars['Int']['output']>;
  dominantColor?: Maybe<Scalars['String']['output']>;
  foramtedPrice?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isAvailable?: Maybe<Scalars['Boolean']['output']>;
  isInRange?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  specialPrice?: Maybe<Scalars['String']['output']>;
  thumbNail?: Maybe<Scalars['String']['output']>;
};

export type GroupedOptionValues = {
  __typename?: 'GroupedOptionValues';
  defaultQty?: Maybe<Scalars['String']['output']>;
  foramtedPrice?: Maybe<Scalars['String']['output']>;
  isDefault?: Maybe<Scalars['String']['output']>;
  isQtyUserDefined?: Maybe<Scalars['String']['output']>;
  isSingle?: Maybe<Scalars['Boolean']['output']>;
  optionValueId?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** Defines a grouped product, which consists of simple standalone products that are presented as a group. */
export type GroupedProduct = PhysicalProductInterface & ProductInterface & RoutableInterface & {
  __typename?: 'GroupedProduct';
  /** @deprecated Use the `custom_attributes` field instead. */
  as_featured?: Maybe<Scalars['String']['output']>;
  /**
   * The attribute set assigned to the product.
   * @deprecated The field should not be used on the storefront.
   */
  attribute_set_id?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  brand_name?: Maybe<Scalars['Int']['output']>;
  /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled. */
  canonical_url?: Maybe<Scalars['String']['output']>;
  /** The categories assigned to a product. */
  categories?: Maybe<Array<Maybe<CategoryInterface>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  celimax?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  color?: Maybe<Scalars['Int']['output']>;
  /** The product's country of origin. */
  country_of_manufacture?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  cream_type?: Maybe<Scalars['Int']['output']>;
  /**
   * Timestamp indicating when the product was created.
   * @deprecated The field should not be used on the storefront.
   */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Crosssell Products */
  crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** Product custom attributes. */
  custom_attributesV2?: Maybe<ProductCustomAttributes>;
  /** @deprecated Use the `custom_attributes` field instead. */
  custom_tabs?: Maybe<Scalars['String']['output']>;
  /** Detailed information about the product. The value can include simple HTML tags. */
  description?: Maybe<ComplexTextValue>;
  /** @deprecated Use the `custom_attributes` field instead. */
  detail_sidebar?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  expire_date?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  extended_notes?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_age_group?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_age_range?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_baby_food_stage?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_brand?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_capacity?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_color?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_compatible_devices?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_decor_style?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_digital_zoom?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_display_technology?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_finish?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_gemstone?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_gender?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_health_concern?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_ingredients?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_is_assembly_required?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_material?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_maximum_weight?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_megapixels?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_minimum_weight?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_model?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_number_of_licenses?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_operating_system?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_optical_zoom?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_package_quantity?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_pattern?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_depth?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_form?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_height?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_length?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_weight?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_width?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_recommended_use?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_resolution?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_scent?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_screen_size?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_shoe_width?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_size?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_storage_capacity?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_style?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_system_requirements?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_thread_count?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_video_game_platform?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  featured?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  food_type?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  gender?: Maybe<Scalars['Int']['output']>;
  /** Returns a value indicating gift message availability for the product. */
  gift_message_available: Scalars['Boolean']['output'];
  /** @deprecated Use the `custom_attributes` field instead. */
  glass_type?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  hair_type?: Maybe<Scalars['Int']['output']>;
  /**
   * The ID number assigned to the product.
   * @deprecated Use the `uid` field instead.
   */
  id?: Maybe<Scalars['Int']['output']>;
  /** The relative path to the main image on the product page. */
  image?: Maybe<ProductImage>;
  /** An array containing grouped product items. */
  items?: Maybe<Array<Maybe<GroupedProductItem>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  lens_type?: Maybe<Scalars['Int']['output']>;
  /** The Live stock popup: availability per place (the attributes of the attribute group Custom Stock - today Online Stock). */
  live_stock?: Maybe<Array<Maybe<ProductSourceStock>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  manufacture_date?: Maybe<Scalars['String']['output']>;
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
  /** Remaining stock if it is below the value assigned to the Only X Left Threshold option in the Admin. */
  only_x_left_in_stock?: Maybe<Scalars['Float']['output']>;
  /** If the product has multiple options, determines where they appear on the product page. */
  options_container?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  perfume_type?: Maybe<Scalars['Int']['output']>;
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
  /** @deprecated Use the `custom_attributes` field instead. */
  product_series?: Maybe<Scalars['Int']['output']>;
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
  /** Rating figures of the product for each period (ALL, LAST_30_DAYS, LAST_60_DAYS, LAST_12_MONTHS): average, counts and the 5-to-1 star distribution. Periods are counted from the moment the product response was cached. */
  review_summaries: Array<Maybe<ProductReviewSummary>>;
  /** The list of products reviews. */
  reviews: ProductReviews;
  /** A short description of the product. Its use depends on the theme. */
  short_description?: Maybe<ComplexTextValue>;
  /** @deprecated Use the `custom_attributes` field instead. */
  skin_type?: Maybe<Scalars['Int']['output']>;
  /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
  sku?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  sm_featured?: Maybe<Scalars['Int']['output']>;
  /** The relative path to the small image, which is used on catalog pages. */
  small_image?: Maybe<ProductImage>;
  /** @deprecated Use the `custom_attributes` field instead. */
  solution_type?: Maybe<Scalars['Int']['output']>;
  /**
   * The beginning date that a product has a special price.
   * @deprecated The field should not be used on the storefront.
   */
  special_from_date?: Maybe<Scalars['String']['output']>;
  /** The discounted price of the product. */
  special_price?: Maybe<Scalars['Float']['output']>;
  /** The end date for a product with a special price. */
  special_to_date?: Maybe<Scalars['String']['output']>;
  /** The stock status of the product. */
  stock_status?: Maybe<ProductStockStatus>;
  /** @deprecated Use the `custom_attributes` field instead. */
  sunscreen_type?: Maybe<Scalars['Int']['output']>;
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
  /**
   * An array of websites in which the product is available.
   * @deprecated The field should not be used on the storefront.
   */
  websites?: Maybe<Array<Maybe<Website>>>;
  /** The weight of the item, in units defined by the store. */
  weight?: Maybe<Scalars['Float']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  youtube_video_url?: Maybe<Scalars['String']['output']>;
};


/** Defines a grouped product, which consists of simple standalone products that are presented as a group. */
export type GroupedProductCustom_AttributesV2Args = {
  filters?: InputMaybe<AttributeFilterInput>;
};


/** Defines a grouped product, which consists of simple standalone products that are presented as a group. */
export type GroupedProductReviewsArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<ProductReviewFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<ProductReviewSortInput>;
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

export type GuestItemList = {
  __typename?: 'GuestItemList';
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['String']['output']>;
  qty?: Maybe<Scalars['Int']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
  subTotal?: Maybe<Scalars['String']['output']>;
};

/** Input to retrieve a guest order based on token. */
export type GuestOrderCancelInput = {
  /** Cancellation reason. */
  reason: Scalars['String']['input'];
  /** Order token. */
  token: Scalars['String']['input'];
};

export type GuestOrderData = {
  __typename?: 'GuestOrderData';
  itemList?: Maybe<Array<Maybe<GuestItemList>>>;
  orderInfo?: Maybe<Array<Maybe<OrderInfo>>>;
  totals?: Maybe<Array<Maybe<OrderItemTotals>>>;
};

/** Input to retrieve an order based on details. */
export type GuestOrderInformationInput = {
  /** Order billing address email. */
  email: Scalars['String']['input'];
  /** Order billing address lastname. */
  lastname: Scalars['String']['input'];
  /** Order number. */
  number: Scalars['String']['input'];
};

export type GuestReOrder = {
  __typename?: 'GuestReOrder';
  cartCount?: Maybe<Scalars['Int']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  quoteId?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type GuestView = {
  __typename?: 'GuestView';
  message?: Maybe<Scalars['String']['output']>;
  orderData?: Maybe<GuestOrderData>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type HomeAnnouncement = {
  __typename?: 'HomeAnnouncement';
  /** optional - makes the message clickable */
  link?: Maybe<Scalars['String']['output']>;
  text: Scalars['String']['output'];
};

export type HomeBanner = {
  __typename?: 'HomeBanner';
  /** alt text for accessibility / SEO */
  alt: Scalars['String']['output'];
  image: Scalars['String']['output'];
  link: Scalars['String']['output'];
  /** optional separate artwork for phones (below 1024px); falls back to `image` */
  mobile_image?: Maybe<Scalars['String']['output']>;
};

export type HomeBeautyTech = {
  __typename?: 'HomeBeautyTech';
  button_label: Scalars['String']['output'];
  button_link: Scalars['String']['output'];
  description: Scalars['String']['output'];
  icon: Scalars['String']['output'];
  /** the products to show, in admin order */
  products: Array<Maybe<ProductInterface>>;
  title: Scalars['String']['output'];
};

export type HomeCategories = {
  __typename?: 'HomeCategories';
  /** POPULAR_CATEGORY or SHOP_BY_CATEGORY */
  layout: HomeSectionLayout;
  /** used when layout = POPULAR_CATEGORY (square image tiles, rows of 4) */
  popular: Array<Maybe<HomeTile>>;
  /** used when layout = SHOP_BY_CATEGORY (round image + name) */
  shop_by_category: Array<Maybe<HomeTile>>;
  /** section title, e.g. SHOP BY POPULAR CATEGORY / SHOP BY CATEGORY */
  title: Scalars['String']['output'];
};

export type HomeHero = {
  __typename?: 'HomeHero';
  /** used when layout = GRID: big rotating banner on the left */
  grid_main: Array<Maybe<HomeBanner>>;
  /** used when layout = GRID: exactly 3 small banners on the right */
  grid_side: Array<Maybe<HomeBanner>>;
  /** GRID or SLIDER */
  layout: HomeSectionLayout;
  /** used when layout = SLIDER */
  slides: Array<Maybe<HomeBanner>>;
};

export type HomeLandedJustNow = {
  __typename?: 'HomeLandedJustNow';
  /** rotating banners on the right */
  banners: Array<Maybe<HomeBanner>>;
  description: Scalars['String']['output'];
  /** e.g. Landed Just Now... */
  eyebrow: Scalars['String']['output'];
  /** small image left of the title */
  icon: Scalars['String']['output'];
  title: Scalars['String']['output'];
  view_all_label: Scalars['String']['output'];
  view_all_link: Scalars['String']['output'];
};

export type HomePage = {
  __typename?: 'HomePage';
  /** Top announcement bar: fixed left item, rotating messages, fixed right item. Null when the bar is disabled. */
  announcement_bar?: Maybe<AnnouncementBar>;
  /**
   * Rotating messages of the top bar
   * @deprecated Use `announcement_bar.messages`.
   */
  announcements: Array<Maybe<HomeAnnouncement>>;
  /** Popup shown once per browser session on the home page */
  promo_popup?: Maybe<HomePromoPopup>;
  /** Home sections in admin order; each carries its own content in `configurations` (only enabled sections are rendered) */
  sections: Array<Maybe<HomeSection>>;
};

export type HomePageCmsData = {
  __typename?: 'HomePageCmsData';
  id?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** home page all information */
export type HomePageData = {
  __typename?: 'HomePageData';
  allowAndroidDownload?: Maybe<Scalars['String']['output']>;
  allowIosDownload?: Maybe<Scalars['String']['output']>;
  /** allowedCurrencies Data Information */
  allowedCurrencies?: Maybe<Array<Maybe<AllowedCurrencies>>>;
  androidDownloadLink?: Maybe<Scalars['String']['output']>;
  appButtonColor?: Maybe<Scalars['String']['output']>;
  appLogo?: Maybe<Scalars['String']['output']>;
  appLogoDominantColor?: Maybe<Scalars['String']['output']>;
  appThemeColor?: Maybe<Scalars['String']['output']>;
  appThemeTextColor?: Maybe<Scalars['String']['output']>;
  bannerDominantColor?: Maybe<Scalars['String']['output']>;
  /** Banner information */
  bannerImages?: Maybe<Array<Maybe<BannerImages>>>;
  buttonTextColor?: Maybe<Scalars['String']['output']>;
  /** Carousel information */
  carousel?: Maybe<Array<Maybe<Carousel>>>;
  cartCount?: Maybe<Scalars['Int']['output']>;
  /** category information */
  categories?: Maybe<Array<Maybe<Categories>>>;
  /** Cms Data Information */
  cmsData?: Maybe<Array<Maybe<HomePageCmsData>>>;
  currentCurrency?: Maybe<Scalars['String']['output']>;
  customerBannerImage?: Maybe<Scalars['String']['output']>;
  customerDominantColor?: Maybe<Scalars['String']['output']>;
  customerEmail?: Maybe<Scalars['String']['output']>;
  customerName?: Maybe<Scalars['String']['output']>;
  customerProfileImage?: Maybe<Scalars['String']['output']>;
  customerWishlist?: Maybe<Array<Maybe<CustomerWishlistData>>>;
  darkAppButtonColor?: Maybe<Scalars['String']['output']>;
  darkAppLogo?: Maybe<Scalars['String']['output']>;
  darkAppLogoDominantColor?: Maybe<Scalars['String']['output']>;
  darkAppThemeColor?: Maybe<Scalars['String']['output']>;
  darkAppThemeTextColor?: Maybe<Scalars['String']['output']>;
  darkButtonTextColor?: Maybe<Scalars['String']['output']>;
  darkSplashImage?: Maybe<Scalars['String']['output']>;
  defaultCurrency?: Maybe<Scalars['String']['output']>;
  /** featuredCategories category information */
  featuredCategories?: Maybe<Array<Maybe<CategoryInfo>>>;
  iosDownloadLink?: Maybe<Scalars['String']['output']>;
  launcherIconType?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  notificationCount?: Maybe<Scalars['Int']['output']>;
  otherError?: Maybe<Scalars['String']['output']>;
  priceFormat?: Maybe<PriceFormat>;
  reviewEnable?: Maybe<Scalars['Boolean']['output']>;
  showSwatchOnCollection?: Maybe<Scalars['String']['output']>;
  sortOrder?: Maybe<Array<Maybe<SortOrder>>>;
  splashImage?: Maybe<Scalars['String']['output']>;
  /** storeData Data Information */
  storeData?: Maybe<Array<Maybe<StoreData>>>;
  storeId?: Maybe<Scalars['Int']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  tabCategoryView?: Maybe<Scalars['String']['output']>;
  themeCode?: Maybe<Scalars['String']['output']>;
  themeType?: Maybe<Scalars['Int']['output']>;
  walkthroughVersion?: Maybe<Scalars['String']['output']>;
  watchEnabled?: Maybe<Scalars['Boolean']['output']>;
  websiteData?: Maybe<Array<Maybe<WebsitesData>>>;
  websiteId?: Maybe<Scalars['Int']['output']>;
  wishlistEnable?: Maybe<Scalars['String']['output']>;
};

export type HomeProductSection = {
  __typename?: 'HomeProductSection';
  /** the products to show, in admin order */
  products: Array<Maybe<ProductInterface>>;
  /** e.g. TRENDING NOW > */
  title: Scalars['String']['output'];
  /** where 'View all' goes, e.g. /category/hot-offers */
  view_all_link: Scalars['String']['output'];
};

export type HomePromoPerk = {
  __typename?: 'HomePromoPerk';
  icon: Scalars['String']['output'];
  label: Scalars['String']['output'];
};

export type HomePromoPopup = {
  __typename?: 'HomePromoPopup';
  alt: Scalars['String']['output'];
  button_label?: Maybe<Scalars['String']['output']>;
  /** text of the 'don't show again for this session' link */
  dismiss_label?: Maybe<Scalars['String']['output']>;
  enabled: Scalars['Boolean']['output'];
  heading?: Maybe<Scalars['String']['output']>;
  /** part of the heading drawn in the brand colour */
  heading_highlight?: Maybe<Scalars['String']['output']>;
  /** change this id to show a new campaign again to visitors who closed the previous one */
  id: Scalars['String']['output'];
  image: Scalars['String']['output'];
  link: Scalars['String']['output'];
  mobile_image?: Maybe<Scalars['String']['output']>;
  /** up to 3 small benefits under the heading; icon is one of AUTHENTIC | OFFERS | REWARDS */
  perks: Array<Maybe<HomePromoPerk>>;
  privacy_note?: Maybe<Scalars['String']['output']>;
  /** true = image + newsletter signup panel; false = image only */
  show_newsletter: Scalars['Boolean']['output'];
  subheading?: Maybe<Scalars['String']['output']>;
};

export type HomeSection = {
  __typename?: 'HomeSection';
  /** The section's content; its type depends on `id`. Null when the section is disabled. */
  configurations?: Maybe<HomeSectionConfiguration>;
  enabled: Scalars['Boolean']['output'];
  id: HomeSectionId;
  sort_order: Scalars['Int']['output'];
};

/** Content of one home section. HERO: HomeHero, WIDE_BANNER: HomeBanner, VIP_OFFERS / PREMIUM_BRANDS / SHOP_BY_CONCERN: HomeTileSection, CATEGORIES: HomeCategories, SHOPPERS_TRENDS / DOUBLE_CASHBACK: HomeProductSection, BEAUTY_TECH: HomeBeautyTech, LANDED_JUST_NOW: HomeLandedJustNow, SEO_ABOUT: HomeSeoAbout */
export type HomeSectionConfiguration = HomeBanner | HomeBeautyTech | HomeCategories | HomeHero | HomeLandedJustNow | HomeProductSection | HomeSeoAbout | HomeTileSection;

export enum HomeSectionId {
  BeautyTech = 'BEAUTY_TECH',
  Categories = 'CATEGORIES',
  DoubleCashback = 'DOUBLE_CASHBACK',
  Hero = 'HERO',
  LandedJustNow = 'LANDED_JUST_NOW',
  PremiumBrands = 'PREMIUM_BRANDS',
  SeoAbout = 'SEO_ABOUT',
  ShoppersTrends = 'SHOPPERS_TRENDS',
  ShopByConcern = 'SHOP_BY_CONCERN',
  VipOffers = 'VIP_OFFERS',
  WideBanner = 'WIDE_BANNER'
}

/** Layout variant of a section. HERO uses GRID | SLIDER, CATEGORIES uses POPULAR_CATEGORY | SHOP_BY_CATEGORY. One shared enum so `layout` can be selected in both union fragments without aliases. */
export enum HomeSectionLayout {
  Grid = 'GRID',
  PopularCategory = 'POPULAR_CATEGORY',
  ShopByCategory = 'SHOP_BY_CATEGORY',
  Slider = 'SLIDER'
}

export type HomeSeoAbout = {
  __typename?: 'HomeSeoAbout';
  /** paragraphs as simple HTML (<p>, <strong>, <a>, <ul><li> only) */
  content_html: Scalars['String']['output'];
  /** e.g. Who Are We? */
  title: Scalars['String']['output'];
};

export type HomeTile = {
  __typename?: 'HomeTile';
  image: Scalars['String']['output'];
  link: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type HomeTileSection = {
  __typename?: 'HomeTileSection';
  tiles: Array<Maybe<HomeTile>>;
  /** e.g. DEALS FOR VIP CUSTOMER */
  title: Scalars['String']['output'];
  /** optional word(s) of the title drawn in the brand colour */
  title_highlight?: Maybe<Scalars['String']['output']>;
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

export type ImageSwatchData = SwatchDataInterface & {
  __typename?: 'ImageSwatchData';
  /** The URL assigned to the thumbnail of the swatch image. */
  thumbnail?: Maybe<Scalars['String']['output']>;
  /** The value can be represented as color (HEX code), image link, or text. */
  value?: Maybe<Scalars['String']['output']>;
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

export type InvoiceItemList = {
  __typename?: 'InvoiceItemList';
  discountAmount?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  option?: Maybe<Array<Maybe<ItemListOptions>>>;
  orderedQty?: Maybe<Scalars['Int']['output']>;
  price?: Maybe<Scalars['String']['output']>;
  productId?: Maybe<Scalars['String']['output']>;
  qty?: Maybe<Scalars['Int']['output']>;
  rowTotal?: Maybe<Scalars['String']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
  subTotal?: Maybe<Scalars['String']['output']>;
  taxAmount?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
};

export type InvoiceList = {
  __typename?: 'InvoiceList';
  id?: Maybe<Scalars['String']['output']>;
  incrementId?: Maybe<Scalars['String']['output']>;
  items?: Maybe<Array<Maybe<InvoiceProductItems>>>;
  price?: Maybe<Scalars['String']['output']>;
  qty?: Maybe<Scalars['Int']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
  subTotal?: Maybe<Scalars['String']['output']>;
  totals?: Maybe<Array<Maybe<OrderItemTotals>>>;
};

export type InvoiceProductItems = {
  __typename?: 'InvoiceProductItems';
  name?: Maybe<Scalars['String']['output']>;
  options?: Maybe<Array<Maybe<ItemListOptions>>>;
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

export type InvoiceTotalsData = {
  __typename?: 'InvoiceTotalsData';
  formattedValue?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type InvoiceView = {
  __typename?: 'InvoiceView';
  billingAddress?: Maybe<BillingAddress>;
  invoiceDate?: Maybe<Scalars['String']['output']>;
  invoiceStatus?: Maybe<Scalars['String']['output']>;
  itemList?: Maybe<Array<Maybe<InvoiceItemList>>>;
  message?: Maybe<Scalars['String']['output']>;
  orderDate?: Maybe<Scalars['String']['output']>;
  orderId?: Maybe<Scalars['Int']['output']>;
  orderStatus?: Maybe<Scalars['String']['output']>;
  paymentMethod?: Maybe<PaymentMethod>;
  shippingAddress?: Maybe<ShippingAddress>;
  shippingMethod?: Maybe<ShippingMethod>;
  success?: Maybe<Scalars['Boolean']['output']>;
  totals?: Maybe<Array<Maybe<InvoiceTotalsData>>>;
};

/** Contains the result of the `isEmailAvailable` query. */
export type IsEmailAvailableOutput = {
  __typename?: 'IsEmailAvailableOutput';
  /** Indicates whether the specified email address can be used to create a customer. */
  is_email_available?: Maybe<Scalars['Boolean']['output']>;
};

export type ItemList = {
  __typename?: 'ItemList';
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  options?: Maybe<Array<Maybe<ItemListOptions>>>;
  price?: Maybe<Scalars['String']['output']>;
  productId?: Maybe<Scalars['String']['output']>;
  qty?: Maybe<ListQty>;
  sku?: Maybe<Scalars['String']['output']>;
  subTotal?: Maybe<Scalars['String']['output']>;
};

export type ItemListOptions = {
  __typename?: 'ItemListOptions';
  label?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
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

/** Contains a key-value pair. */
export type KeyValue = {
  __typename?: 'KeyValue';
  /** The name part of the key/value pair. */
  name?: Maybe<Scalars['String']['output']>;
  /** The value part of the key/value pair. */
  value?: Maybe<Scalars['String']['output']>;
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

export type LayeredData = {
  __typename?: 'LayeredData';
  code?: Maybe<Scalars['String']['output']>;
  is_filterable?: Maybe<Scalars['Boolean']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  options?: Maybe<Array<Maybe<FilterOptions>>>;
};

/** Defines the possible values of liability shift */
export enum LiabilityShift {
  No = 'NO',
  Possible = 'POSSIBLE',
  Unknown = 'UNKNOWN'
}

export type LinkData = {
  __typename?: 'LinkData';
  fileName?: Maybe<Scalars['String']['output']>;
  formattedPrice?: Maybe<Scalars['String']['output']>;
  haveLinkSample?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  linkSampleTitle?: Maybe<Scalars['String']['output']>;
  linkTitle?: Maybe<Scalars['String']['output']>;
  mimeType?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type LinkSampleData = {
  __typename?: 'LinkSampleData';
  fileName?: Maybe<Scalars['String']['output']>;
  mimeType?: Maybe<Scalars['String']['output']>;
  sampleTitle?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type ListQty = {
  __typename?: 'ListQty';
  Canceled?: Maybe<Scalars['Int']['output']>;
  Invoiced?: Maybe<Scalars['Int']['output']>;
  Ordered?: Maybe<Scalars['Int']['output']>;
  Refunded?: Maybe<Scalars['Int']['output']>;
  Shipped?: Maybe<Scalars['Int']['output']>;
};

export type Login = {
  __typename?: 'Login';
  bannerImage?: Maybe<Scalars['String']['output']>;
  bearerToken?: Maybe<Scalars['String']['output']>;
  cartCount?: Maybe<Scalars['Int']['output']>;
  customerEmail?: Maybe<Scalars['String']['output']>;
  customerId?: Maybe<Scalars['String']['output']>;
  customerName?: Maybe<Scalars['String']['output']>;
  customerToken?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  profileImage?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
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

/** Contains basic information about a product image or video. */
export type MediaGalleryInterface = {
  /** Indicates whether the image is hidden from view. */
  disabled?: Maybe<Scalars['Boolean']['output']>;
  /** The label of the product image or video. */
  label?: Maybe<Scalars['String']['output']>;
  /** The media item's position after it has been sorted. */
  position?: Maybe<Scalars['Int']['output']>;
  /** Array of image types. It can have the following values: image, small_image, thumbnail. */
  types?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** The URL of the product image or video. */
  url?: Maybe<Scalars['String']['output']>;
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

export type Method = {
  __typename?: 'Method';
  code?: Maybe<Scalars['String']['output']>;
  isSelected?: Maybe<Scalars['Boolean']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['String']['output']>;
};

export type MobikulCartItems = {
  __typename?: 'MobikulCartItems';
  canMoveToWishlist?: Maybe<Scalars['Boolean']['output']>;
  dominantColor?: Maybe<Scalars['String']['output']>;
  finalPrice?: Maybe<Scalars['Float']['output']>;
  formattedFinalPrice?: Maybe<Scalars['String']['output']>;
  formattedPrice?: Maybe<Scalars['String']['output']>;
  groupedProductId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  isInRange?: Maybe<Scalars['Boolean']['output']>;
  message?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  name?: Maybe<Scalars['String']['output']>;
  options?: Maybe<Array<Maybe<CartItemOptions>>>;
  price?: Maybe<Scalars['Float']['output']>;
  productId?: Maybe<Scalars['String']['output']>;
  qty?: Maybe<Scalars['Int']['output']>;
  remainingQty?: Maybe<Scalars['Int']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
  subTotal?: Maybe<Scalars['String']['output']>;
  thresholdQty?: Maybe<Scalars['String']['output']>;
  typeId?: Maybe<Scalars['String']['output']>;
};

export type MobikulWishlist = {
  __typename?: 'MobikulWishlist';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  totalCount?: Maybe<Scalars['Int']['output']>;
  wishList?: Maybe<Array<Maybe<WishlistItems>>>;
};

/** Defines a monetary value, including a numeric value and a currency code. */
export type Money = {
  __typename?: 'Money';
  /** A three-letter currency code, such as USD or EUR. */
  currency?: Maybe<CurrencyEnum>;
  /** A number expressing a monetary value. */
  value?: Maybe<Scalars['Float']['output']>;
};

/** #mst Defines the input to the run applyPointsToCart mutation */
export type MstRewardsApplyPointsToCartInput = {
  /** #mst The amount of reward points */
  amount: Scalars['Int']['input'];
  /** #mst The unique ID that identifies the customer's cart */
  cart_id: Scalars['String']['input'];
};

/** #mst Defines the output for the applyPointsToCart mutation */
export type MstRewardsApplyPointsToCartOutput = {
  __typename?: 'MstRewardsApplyPointsToCartOutput';
  /** #mst Describes the contents of the specified shopping cart */
  cart: Cart;
};

/** #mst Defines reward points information for cart */
export type MstRewardsCartPoints = {
  __typename?: 'MstRewardsCartPoints';
  /** #mst Base amount of money that were applied to the cart */
  base_spend_amount?: Maybe<Money>;
  /** #mst Amount of points that were earned to the cart */
  earn_points?: Maybe<Scalars['Int']['output']>;
  /** #mst */
  is_applied?: Maybe<Scalars['Boolean']['output']>;
  /** #mst Amount of money that were applied to the cart */
  spend_amount?: Maybe<Money>;
  /** #mst Max amount of points that were applied to the cart */
  spend_max_points?: Maybe<Scalars['Int']['output']>;
  /** #mst Min amount of points that were applied to the cart */
  spend_min_points?: Maybe<Scalars['Int']['output']>;
  /** #mst Amount of points that were applied to the cart */
  spend_points?: Maybe<Scalars['Int']['output']>;
};

/** #mst Defines reward points information for a placed order */
export type MstRewardsOrderPoints = {
  __typename?: 'MstRewardsOrderPoints';
  /** #mst Day (midnight UTC) the earned points become available when their activation is delayed; null when they were available at once */
  earn_activated_at?: Maybe<Scalars['String']['output']>;
  /** #mst Amount of points earned for the order, minus the points a refund cancelled. Until the points are credited (on invoice or shipment) the points the order will earn; 0 once the order is cancelled or closed without them */
  earn_points?: Maybe<Scalars['Int']['output']>;
  /** #mst Whether the earned points can be spent already */
  is_earn_activated?: Maybe<Scalars['Boolean']['output']>;
  /** #mst Discount the spent points gave when the order was placed, in the order currency; null when it is not known or all spent points were given back */
  spend_amount?: Maybe<Money>;
  /** #mst Amount of points spent on the order, minus the points a cancellation or refund gave back */
  spend_points?: Maybe<Scalars['Int']['output']>;
};

/** #mst Defines reward points transaction information */
export type MstRewardsPointsTransaction = {
  __typename?: 'MstRewardsPointsTransaction';
  /** #mst Time when transaction will be activated */
  activated_at?: Maybe<Scalars['String']['output']>;
  /** #mst Amount of earned points */
  amount?: Maybe<Scalars['Int']['output']>;
  /** #mst Amount of spent points */
  amount_used?: Maybe<Scalars['Int']['output']>;
  /** #mst Transaction code */
  code?: Maybe<Scalars['String']['output']>;
  /** #mst Transaction description */
  comment?: Maybe<Scalars['String']['output']>;
  /** #mst Time when transaction was created */
  created_at?: Maybe<Scalars['String']['output']>;
  /** #mst Is transaction activated */
  is_activated?: Maybe<Scalars['Boolean']['output']>;
  /** #mst Is expiration email was sent to customer */
  is_expiration_email_sent?: Maybe<Scalars['Boolean']['output']>;
  /** #mst Is transaction expired */
  is_expired?: Maybe<Scalars['Boolean']['output']>;
  /** #mst ID */
  transaction_id?: Maybe<Scalars['Int']['output']>;
};

export type MstRewardsRemainingPoints = {
  __typename?: 'MstRewardsRemainingPoints';
  money?: Maybe<Money>;
  points?: Maybe<Scalars['String']['output']>;
};

/** #mst Defines reward points information for cart */
export type MstRewardsRewardsCustomerInfo = {
  __typename?: 'MstRewardsRewardsCustomerInfo';
  /** #mst Amount of points available for customer */
  balance?: Maybe<Scalars['Int']['output']>;
  /** #mst Customer's tier */
  tier_id?: Maybe<Scalars['Int']['output']>;
  /** #mst List of transactions */
  transactions: Array<Maybe<MstRewardsPointsTransaction>>;
};

export type MstRewardsTier = {
  __typename?: 'MstRewardsTier';
  description?: Maybe<Scalars['String']['output']>;
  is_active?: Maybe<Scalars['Boolean']['output']>;
  is_current_tier?: Maybe<Scalars['Boolean']['output']>;
  min_earn_points?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  remaining?: Maybe<MstRewardsRemainingPoints>;
  tier_logo?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Remove from compare request */
  accountCreate?: Maybe<DefaultResponse>;
  /** Add one or more bundle products to the specified cart. We recommend using `addProductsToCart` instead. */
  addBundleProductsToCart?: Maybe<AddBundleProductsToCartOutput>;
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
  /** Add to cart request */
  addToCart?: Maybe<AddToCart>;
  /** Add to compare request */
  addToCompare?: Maybe<DefaultResponse>;
  /** Add to wishlist request */
  addToWishlist?: Maybe<AddToWishlist>;
  /** Add one or more virtual products to the specified cart. We recommend using `addProductsToCart` instead. */
  addVirtualProductsToCart?: Maybe<AddVirtualProductsToCartOutput>;
  /** Add items in the specified wishlist to the customer's cart. */
  addWishlistItemsToCart?: Maybe<AddWishlistItemsToCartOutput>;
  /** wishlist all to cart request */
  allToCart?: Maybe<AllToCart>;
  /** Apply coupon code request */
  applyCoupon?: Maybe<DefaultResponse>;
  /** Apply a pre-defined coupon code to the specified cart. */
  applyCouponToCart?: Maybe<ApplyCouponToCartOutput>;
  /** Ask a question about a product (guests and customers). It is listed once an admin answers it. */
  askProductQuestion?: Maybe<Scalars['Boolean']['output']>;
  /** Assign the specified compare list to the logged in customer. */
  assignCompareListToCustomer?: Maybe<AssignCompareListToCustomerOutput>;
  /** Assign a logged-in customer to the specified guest shopping cart. */
  assignCustomerToGuestCart: Cart;
  /** Cancel the specified customer order. */
  cancelOrder?: Maybe<CancelOrderOutput>;
  /** Change the password for the logged-in customer. */
  changeCustomerPassword?: Maybe<Customer>;
  /** change order status request */
  changeOrderStatus?: Maybe<DefaultResponse>;
  /** Remove all items from the specified cart. */
  clearCart: ClearCartOutput;
  /** Remove all the products from the specified wish list. */
  clearWishlist?: Maybe<RemoveProductsFromWishlistOutput>;
  /** Synchronizes order details and place the order */
  completeOrder?: Maybe<PlaceOrderOutput>;
  /** Cancel the specified guest customer order. */
  confirmCancelOrder?: Maybe<CancelOrderOutput>;
  /** Confirms the email address for a customer. */
  confirmEmail?: Maybe<CustomerOutput>;
  /** contact admin request */
  contact?: Maybe<DefaultResponse>;
  /** Send a 'Contact Us' email to the merchant. */
  contactUs?: Maybe<ContactUsOutput>;
  /** create account request */
  createAccount?: Maybe<CreateAccount>;
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
  /** Creates a vault payment token */
  createVaultCardPaymentToken?: Maybe<CreateVaultCardPaymentTokenOutput>;
  /** Creates a vault card setup token */
  createVaultCardSetupToken?: Maybe<CreateVaultCardSetupTokenOutput>;
  /** Delete customer account */
  deleteAccount?: Maybe<DeleteAccount>;
  /** delete address request */
  deleteAddress?: Maybe<DefaultResponse>;
  /** Delete the specified compare list. */
  deleteCompareList?: Maybe<DeleteCompareListOutput>;
  /** Delete customer account */
  deleteCustomer?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Delete the billing or shipping address of a customer.
   * @deprecated Use `deleteCustomerAddressV2` instead.
   */
  deleteCustomerAddress?: Maybe<Scalars['Boolean']['output']>;
  /** Delete the billing or shipping address of a customer. */
  deleteCustomerAddressV2?: Maybe<Scalars['Boolean']['output']>;
  /** Delete a customer's payment token. */
  deletePaymentToken?: Maybe<DeletePaymentTokenOutput>;
  /** cart empty request */
  emptyCart?: Maybe<DefaultResponse>;
  /** Estimate shipping method(s) for cart based on address */
  estimateShippingMethods?: Maybe<Array<Maybe<AvailableShippingMethod>>>;
  /** Estimate totals for cart based on the address */
  estimateTotals: EstimateTotalsOutput;
  /** forgot password request */
  forgotPassword?: Maybe<DefaultResponse>;
  /** Generate a token for specified customer. */
  generateCustomerToken?: Maybe<CustomerToken>;
  /** Request a customer token so that an administrator can perform remote shopping assistance. */
  generateCustomerTokenAsAdmin?: Maybe<GenerateCustomerTokenAsAdminOutput>;
  /** guest re order request */
  guestReOrder?: Maybe<GuestReOrder>;
  /** Handle a payment response and save the payment in Quote. Use this mutation for Payflow Pro and Payments Pro payment methods. */
  handlePayflowProResponse?: Maybe<PayflowProResponseOutput>;
  /** customer login request */
  login?: Maybe<Login>;
  /** logout request */
  logout?: Maybe<DefaultResponse>;
  /** Mark customer order notification(s) as read */
  markNotificationAsRead?: Maybe<DefaultResponse>;
  /** Mark an approved review as helpful. One vote per customer, or per IP address for guests. */
  markProductReviewHelpful: ProductReviewHelpfulOutput;
  /** Mark all notifications as read for customer */
  massReadNotification?: Maybe<ReadNotificationResponse>;
  /** Transfer the contents of a guest cart into the cart of a logged-in customer. */
  mergeCarts: Cart;
  /** place order request */
  mobikulPlaceOrder?: Maybe<PlaceOrder>;
  /** update wishlist request */
  mobikulUpdateWishlist?: Maybe<DefaultResponse>;
  /** #mst Apply reward points to the cart */
  mstRewardsApplyPointsToCart?: Maybe<MstRewardsApplyPointsToCartOutput>;
  /** Convert the quote into an order. */
  placeOrder?: Maybe<PlaceOrderOutput>;
  /** re order request */
  reOrder?: Maybe<ReOrder>;
  /** Mark a single notification as read */
  readNotification?: Maybe<ReadNotificationResponse>;
  /** register device request */
  registerDevice?: Maybe<DefaultResponse>;
  /** remove cart item request */
  removeCartItem?: Maybe<RemoveCartItem>;
  /** Remove a previously-applied coupon from the cart. The cart must contain at least one item in order to remove the coupon. */
  removeCouponFromCart?: Maybe<RemoveCouponFromCartOutput>;
  /** Remove from compare request */
  removeFromCompare?: Maybe<DefaultResponse>;
  /** remove from wishlist request */
  removeFromWishlist?: Maybe<RemoveFromWishlist>;
  /** Delete the entire quantity of a specified item from the cart. If you remove all items from the cart, the cart continues to exist. */
  removeItemFromCart?: Maybe<RemoveItemFromCartOutput>;
  /** Remove products from the specified compare list. */
  removeProductsFromCompareList?: Maybe<CompareList>;
  /** Remove one or more products from the specified wish list. */
  removeProductsFromWishlist?: Maybe<RemoveProductsFromWishlistOutput>;
  /** Add all products from a customer's previous order to the cart. */
  reorderItems?: Maybe<ReorderItemsOutput>;
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
  /** save account info request */
  saveAccountInfo?: Maybe<SaveAccountInfo>;
  /** save address request */
  saveAddress?: Maybe<DefaultResponse>;
  /** save review request */
  saveReview?: Maybe<DefaultResponse>;
  /** Send a message on behalf of a customer to the specified email addresses. */
  sendEmailToFriend?: Maybe<SendEmailToFriendOutput>;
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
  /** share wishlist request */
  shareWishlist?: Maybe<ShareWishlist>;
  /** Subscribe the specified email to the store's newsletter. */
  subscribeEmailToNewsletter?: Maybe<SubscribeEmailToNewsletterOutput>;
  /** Synchronizes the payment order details for further payment processing */
  syncPaymentOrder?: Maybe<Scalars['Boolean']['output']>;
  /** update cart request */
  updateCart?: Maybe<UpdateCart>;
  /** Modify items in the cart. */
  updateCartItems?: Maybe<UpdateCartItemsOutput>;
  /** @deprecated Use `updateCustomerV2` instead. */
  updateCustomer?: Maybe<CustomerOutput>;
  /**
   * Update the billing or shipping address of a customer or guest.
   * @deprecated Use `updateCustomerAddressV2` instead.
   */
  updateCustomerAddress?: Maybe<CustomerAddress>;
  /** Update the billing or shipping address of a customer or guest. */
  updateCustomerAddressV2?: Maybe<CustomerAddress>;
  /** Change the email address for the logged-in customer. */
  updateCustomerEmail?: Maybe<CustomerOutput>;
  /** Update the customer's personal information. */
  updateCustomerV2?: Maybe<CustomerOutput>;
  /** update cart item options request */
  updateItemOptions?: Maybe<UpdateItemOptions>;
  /** Update one or more products in the specified wish list. */
  updateProductsInWishlist?: Maybe<UpdateProductsInWishlistOutput>;
  /** Upload banner image for customer */
  uploadBannerPic?: Maybe<UploadBannerPic>;
  /** Upload banner image for customer */
  uploadProfilePic?: Maybe<UploadBannerPic>;
  /** Login customer in Watch App */
  watchLogin?: Maybe<WatchLogin>;
  /** wishlist from cart request */
  wishlistFromCart?: Maybe<WishlistFromCart>;
  /** wishlist to cart request */
  wishlistToCart?: Maybe<WishlistToCart>;
};


export type MutationAccountCreateArgs = {
  orderId?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationAddBundleProductsToCartArgs = {
  input?: InputMaybe<AddBundleProductsToCartInput>;
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


export type MutationAddToCartArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  params?: InputMaybe<AddToCartParams>;
  productId?: InputMaybe<Scalars['Int']['input']>;
  qty?: InputMaybe<Scalars['Int']['input']>;
  quoteId?: InputMaybe<Scalars['Int']['input']>;
  relatedProducts?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationAddToCompareArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['Int']['input'];
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationAddToWishlistArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  params?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['Int']['input'];
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationAddVirtualProductsToCartArgs = {
  input?: InputMaybe<AddVirtualProductsToCartInput>;
};


export type MutationAddWishlistItemsToCartArgs = {
  wishlistId: Scalars['ID']['input'];
  wishlistItemIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationAllToCartArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  itemData?: InputMaybe<Array<InputMaybe<CartItemData>>>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  websiteId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationApplyCouponArgs = {
  couponCode?: InputMaybe<Scalars['String']['input']>;
  customerToken?: InputMaybe<Scalars['String']['input']>;
  quoteId?: InputMaybe<Scalars['Int']['input']>;
  removeCoupon?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationApplyCouponToCartArgs = {
  input?: InputMaybe<ApplyCouponToCartInput>;
};


export type MutationAskProductQuestionArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  question: Scalars['String']['input'];
  sku: Scalars['String']['input'];
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


export type MutationChangeOrderStatusArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  incrementId?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  transactionId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationClearCartArgs = {
  input: ClearCartInput;
};


export type MutationClearWishlistArgs = {
  wishlistId: Scalars['ID']['input'];
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


export type MutationContactArgs = {
  comment?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  telephone?: InputMaybe<Scalars['String']['input']>;
};


export type MutationContactUsArgs = {
  input: ContactUsInput;
};


export type MutationCreateAccountArgs = {
  dob?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  isSocial?: InputMaybe<Scalars['Int']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  mFactor?: InputMaybe<Scalars['Int']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  mobile?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['Int']['input']>;
  os?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  pictureUrl?: InputMaybe<Scalars['String']['input']>;
  prefix?: InputMaybe<Scalars['String']['input']>;
  quoteId?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  suffix?: InputMaybe<Scalars['String']['input']>;
  taxvat?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  websiteId?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['String']['input']>;
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


export type MutationCreateVaultCardPaymentTokenArgs = {
  input: CreateVaultCardPaymentTokenInput;
};


export type MutationCreateVaultCardSetupTokenArgs = {
  input: CreateVaultCardSetupTokenInput;
};


export type MutationDeleteAccountArgs = {
  confirmPassword?: InputMaybe<Scalars['String']['input']>;
  customerToken?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  websiteId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDeleteAddressArgs = {
  addressId?: InputMaybe<Scalars['Int']['input']>;
  customerToken?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteCompareListArgs = {
  uid: Scalars['ID']['input'];
};


export type MutationDeleteCustomerAddressArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteCustomerAddressV2Args = {
  uid: Scalars['ID']['input'];
};


export type MutationDeletePaymentTokenArgs = {
  public_hash: Scalars['String']['input'];
};


export type MutationEmptyCartArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  quoteId?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationEstimateShippingMethodsArgs = {
  input: EstimateTotalsInput;
};


export type MutationEstimateTotalsArgs = {
  input: EstimateTotalsInput;
};


export type MutationForgotPasswordArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  websiteId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationGenerateCustomerTokenArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationGenerateCustomerTokenAsAdminArgs = {
  input: GenerateCustomerTokenAsAdminInput;
};


export type MutationGuestReOrderArgs = {
  incrementId?: InputMaybe<Scalars['String']['input']>;
  quoteId?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationHandlePayflowProResponseArgs = {
  input: PayflowProResponseInput;
};


export type MutationLoginArgs = {
  mFactor?: InputMaybe<Scalars['Int']['input']>;
  mobile?: InputMaybe<Scalars['String']['input']>;
  os?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  quoteId?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  websiteId?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['String']['input']>;
};


export type MutationLogoutArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};


export type MutationMarkNotificationAsReadArgs = {
  customerToken: Scalars['String']['input'];
  markAll?: InputMaybe<Scalars['Boolean']['input']>;
  notificationId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationMarkProductReviewHelpfulArgs = {
  review_id: Scalars['Int']['input'];
};


export type MutationMassReadNotificationArgs = {
  customerToken: Scalars['String']['input'];
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationMergeCartsArgs = {
  destination_cart_id?: InputMaybe<Scalars['String']['input']>;
  source_cart_id: Scalars['String']['input'];
};


export type MutationMobikulPlaceOrderArgs = {
  billingData?: InputMaybe<ShippingDataInput>;
  ccCid?: InputMaybe<Scalars['Int']['input']>;
  ccExpMonth?: InputMaybe<Scalars['Int']['input']>;
  ccExpYear?: InputMaybe<Scalars['Int']['input']>;
  ccNumber?: InputMaybe<Scalars['Int']['input']>;
  ccType?: InputMaybe<Scalars['String']['input']>;
  checkoutMethod?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  customerToken?: InputMaybe<Scalars['String']['input']>;
  paymentMethod?: InputMaybe<Scalars['String']['input']>;
  purchasePoint?: InputMaybe<Scalars['String']['input']>;
  quoteId?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};


export type MutationMobikulUpdateWishlistArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  itemData?: InputMaybe<Scalars['String']['input']>;
};


export type MutationMstRewardsApplyPointsToCartArgs = {
  input: MstRewardsApplyPointsToCartInput;
};


export type MutationPlaceOrderArgs = {
  input?: InputMaybe<PlaceOrderInput>;
};


export type MutationReOrderArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  incrementId?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationReadNotificationArgs = {
  customerToken: Scalars['String']['input'];
  notificationId: Scalars['Int']['input'];
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationRegisterDeviceArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  os?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRemoveCartItemArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  itemId?: InputMaybe<Scalars['Int']['input']>;
  quoteId?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationRemoveCouponFromCartArgs = {
  input?: InputMaybe<RemoveCouponFromCartInput>;
};


export type MutationRemoveFromCompareArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['Int']['input'];
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationRemoveFromWishlistArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  itemId?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
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


export type MutationSaveAccountInfoArgs = {
  confirmPassword?: InputMaybe<Scalars['String']['input']>;
  currentPassword?: InputMaybe<Scalars['String']['input']>;
  customerToken?: InputMaybe<Scalars['String']['input']>;
  doChangeEmail?: InputMaybe<Scalars['Boolean']['input']>;
  doChangePassword?: InputMaybe<Scalars['Int']['input']>;
  dob?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['Int']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  mobile?: InputMaybe<Scalars['String']['input']>;
  newPassword?: InputMaybe<Scalars['String']['input']>;
  prefix?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  suffix?: InputMaybe<Scalars['String']['input']>;
  taxvat?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSaveAddressArgs = {
  addressData?: InputMaybe<SaveAddressDataInput>;
  addressId?: InputMaybe<Scalars['Int']['input']>;
  customerToken?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationSaveReviewArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  detail?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['Int']['input']>;
  ratings?: InputMaybe<Array<InputMaybe<ReviewRatings>>>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSendEmailToFriendArgs = {
  input?: InputMaybe<SendEmailToFriendInput>;
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


export type MutationShareWishlistArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  emails?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  websiteId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationSubscribeEmailToNewsletterArgs = {
  email: Scalars['String']['input'];
};


export type MutationSyncPaymentOrderArgs = {
  input?: InputMaybe<SyncPaymentOrderInput>;
};


export type MutationUpdateCartArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  itemData?: InputMaybe<Array<InputMaybe<CartItemData>>>;
  quoteId?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
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


export type MutationUpdateCustomerAddressV2Args = {
  input?: InputMaybe<CustomerAddressInput>;
  uid: Scalars['ID']['input'];
};


export type MutationUpdateCustomerEmailArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateCustomerV2Args = {
  input: CustomerUpdateInput;
};


export type MutationUpdateItemOptionsArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  itemId?: InputMaybe<Scalars['Int']['input']>;
  params?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  productId?: InputMaybe<Scalars['Int']['input']>;
  qty?: InputMaybe<Scalars['Int']['input']>;
  quoteId?: InputMaybe<Scalars['Int']['input']>;
  relatedProducts?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateProductsInWishlistArgs = {
  wishlistId: Scalars['ID']['input'];
  wishlistItems: Array<WishlistItemUpdateInput>;
};


export type MutationUploadBannerPicArgs = {
  customerToken: Scalars['String']['input'];
  imageEncoded: Scalars['String']['input'];
  imageName: Scalars['String']['input'];
  mFactor?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUploadProfilePicArgs = {
  customerToken: Scalars['String']['input'];
  imageEncoded: Scalars['String']['input'];
  imageName: Scalars['String']['input'];
  mFactor?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['String']['input']>;
};


export type MutationWatchLoginArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  firebaseId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationWishlistFromCartArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  itemId?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationWishlistToCartArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  itemId?: InputMaybe<Scalars['Int']['input']>;
  productId?: InputMaybe<Scalars['Int']['input']>;
  qty?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};

export type MyDownloadsList = {
  __typename?: 'MyDownloadsList';
  downloadsList?: Maybe<Array<Maybe<DownloadsList>>>;
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** Contains an error message when an invalid UID was specified. */
export type NoSuchEntityUidError = ErrorInterface & {
  __typename?: 'NoSuchEntityUidError';
  /** The returned error message. */
  message: Scalars['String']['output'];
  /** The specified invalid unique ID of an object. */
  uid: Scalars['ID']['output'];
};

export type NotificationCountResponse = {
  __typename?: 'NotificationCountResponse';
  message?: Maybe<Scalars['String']['output']>;
  notificationCount?: Maybe<Scalars['Int']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type NotificationList = {
  __typename?: 'NotificationList';
  message?: Maybe<Scalars['String']['output']>;
  notificationList?: Maybe<Array<Maybe<NotificationListItems>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
  unreadCount?: Maybe<Scalars['Int']['output']>;
};

export type NotificationListItems = {
  __typename?: 'NotificationListItems';
  banner?: Maybe<Scalars['String']['output']>;
  categoryId?: Maybe<Scalars['String']['output']>;
  categoryName?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  dominantColor?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  incrementId?: Maybe<Scalars['String']['output']>;
  isRead?: Maybe<Scalars['Boolean']['output']>;
  notificationType?: Maybe<Scalars['String']['output']>;
  orderId?: Maybe<Scalars['String']['output']>;
  productId?: Maybe<Scalars['String']['output']>;
  productName?: Maybe<Scalars['String']['output']>;
  productType?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type OneProductList = {
  __typename?: 'OneProductList';
  arTextureImages?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  arType?: Maybe<Scalars['String']['output']>;
  arUrl?: Maybe<Scalars['String']['output']>;
  availability?: Maybe<Scalars['String']['output']>;
  categoryId?: Maybe<Scalars['Int']['output']>;
  configurableData?: Maybe<ConfigurableData>;
  dominantColor?: Maybe<Scalars['String']['output']>;
  entityId?: Maybe<Scalars['Int']['output']>;
  finalPrice?: Maybe<Scalars['String']['output']>;
  formattedFinalPrice?: Maybe<Scalars['String']['output']>;
  formattedMaxPrice?: Maybe<Scalars['String']['output']>;
  formattedMinPrice?: Maybe<Scalars['String']['output']>;
  formattedPrice?: Maybe<Scalars['String']['output']>;
  formattedTierPrice?: Maybe<Scalars['String']['output']>;
  groupedPrice?: Maybe<Scalars['String']['output']>;
  hasRequiredOptions?: Maybe<Scalars['Boolean']['output']>;
  isAvailable?: Maybe<Scalars['Boolean']['output']>;
  isInRange?: Maybe<Scalars['Boolean']['output']>;
  isInWishlist?: Maybe<Scalars['Boolean']['output']>;
  isNew?: Maybe<Scalars['Boolean']['output']>;
  linksPurchasedSeparately?: Maybe<Scalars['Boolean']['output']>;
  maxPrice?: Maybe<Scalars['String']['output']>;
  minAddToCartQty?: Maybe<Scalars['Int']['output']>;
  minPrice?: Maybe<Scalars['String']['output']>;
  msrpDisplayActualPriceType?: Maybe<Scalars['String']['output']>;
  msrpEnabled?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['String']['output']>;
  priceView?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['String']['output']>;
  reviewCount?: Maybe<Scalars['Int']['output']>;
  reviewEnable?: Maybe<Scalars['Boolean']['output']>;
  thumbNail?: Maybe<Scalars['String']['output']>;
  tierPrice?: Maybe<Scalars['String']['output']>;
  typeId?: Maybe<Scalars['String']['output']>;
  wishlistEnable?: Maybe<Scalars['String']['output']>;
  wishlistItemId?: Maybe<Scalars['Int']['output']>;
};

export type OptionValues = {
  __typename?: 'OptionValues';
  default_price?: Maybe<Scalars['String']['output']>;
  default_price_type?: Maybe<Scalars['String']['output']>;
  default_title?: Maybe<Scalars['String']['output']>;
  formatted_default_price?: Maybe<Scalars['String']['output']>;
  formatted_price?: Maybe<Scalars['String']['output']>;
  option_id?: Maybe<Scalars['String']['output']>;
  option_type_id?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['String']['output']>;
  price_type?: Maybe<Scalars['String']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
  sort_order?: Maybe<Scalars['String']['output']>;
  store_price?: Maybe<Scalars['String']['output']>;
  store_price_type?: Maybe<Scalars['String']['output']>;
  store_title?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
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

export type OrderCustomerDetails = {
  __typename?: 'OrderCustomerDetails';
  email?: Maybe<Scalars['String']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  groupId?: Maybe<Scalars['String']['output']>;
  guestCustomer?: Maybe<Scalars['Boolean']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  middlename?: Maybe<Scalars['String']['output']>;
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

export type OrderData = {
  __typename?: 'OrderData';
  itemList?: Maybe<Array<Maybe<ItemList>>>;
  totals?: Maybe<Array<Maybe<OrderItemTotals>>>;
};

export type OrderDetails = {
  __typename?: 'OrderDetails';
  billingAddress?: Maybe<Scalars['String']['output']>;
  canReorder?: Maybe<Scalars['Boolean']['output']>;
  creditmemoList?: Maybe<Array<Maybe<CreditMemoList>>>;
  customerEmail?: Maybe<Scalars['String']['output']>;
  customerName?: Maybe<Scalars['String']['output']>;
  hasCreditmemo?: Maybe<Scalars['Boolean']['output']>;
  hasInvoices?: Maybe<Scalars['Boolean']['output']>;
  hasShipments?: Maybe<Scalars['Boolean']['output']>;
  incrementId?: Maybe<Scalars['String']['output']>;
  invoiceList?: Maybe<Array<Maybe<InvoiceList>>>;
  message?: Maybe<Scalars['String']['output']>;
  orderData?: Maybe<OrderData>;
  orderDate?: Maybe<Scalars['String']['output']>;
  paymentMethod?: Maybe<Scalars['String']['output']>;
  shipmentList?: Maybe<Array<Maybe<ShipmentList>>>;
  shippingAddress?: Maybe<Scalars['String']['output']>;
  shippingMethod?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  statusColorCode?: Maybe<Scalars['String']['output']>;
  statusLabel?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type OrderInfo = {
  __typename?: 'OrderInfo';
  billingAddress?: Maybe<Scalars['String']['output']>;
  paymentMethod?: Maybe<Scalars['String']['output']>;
  shippingAddress?: Maybe<Scalars['String']['output']>;
  shippingMethod?: Maybe<Scalars['String']['output']>;
};

/** Input to retrieve an order based on details. */
export type OrderInformationInput = {
  /** Order billing address email. */
  email: Scalars['String']['input'];
  /** Order billing address lastname. */
  lastname: Scalars['String']['input'];
  /** Order number. */
  number: Scalars['String']['input'];
  /** Order billing address postcode */
  postcode?: InputMaybe<Scalars['String']['input']>;
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

export type OrderItemTotals = {
  __typename?: 'OrderItemTotals';
  code?: Maybe<Scalars['String']['output']>;
  formattedValue?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type OrderList = {
  __typename?: 'OrderList';
  message?: Maybe<Scalars['String']['output']>;
  orderList?: Maybe<Array<Maybe<OrderListItems>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type OrderListItems = {
  __typename?: 'OrderListItems';
  canReorder?: Maybe<Scalars['Boolean']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  item_count?: Maybe<Scalars['String']['output']>;
  item_image_url?: Maybe<Scalars['String']['output']>;
  order_id?: Maybe<Scalars['String']['output']>;
  order_total?: Maybe<Scalars['String']['output']>;
  ship_to?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  statusColorCode?: Maybe<Scalars['String']['output']>;
};

/** Contains details about the payment method used to pay for the order. */
export type OrderPaymentMethod = {
  __typename?: 'OrderPaymentMethod';
  /** Additional data per payment method type. */
  additional_data?: Maybe<Array<Maybe<KeyValue>>>;
  /** The label that describes the payment method. */
  name: Scalars['String']['output'];
  /** The payment method code that indicates how the order was paid for. */
  type: Scalars['String']['output'];
};

export type OrderReviewData = {
  __typename?: 'OrderReviewData';
  cartTotal?: Maybe<Scalars['Int']['output']>;
  items?: Maybe<Array<Maybe<ReviewItems>>>;
  totals?: Maybe<Array<Maybe<CartTotalData>>>;
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
  /** The grand total of the order, excluding taxes. */
  grand_total_excl_tax: Money;
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

export type OtherNotificationData = {
  __typename?: 'OtherNotificationData';
  content?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ParentCategories = {
  __typename?: 'ParentCategories';
  banner?: Maybe<Scalars['String']['output']>;
  bannerDominantColor?: Maybe<Scalars['String']['output']>;
  childCategories?: Maybe<Array<Maybe<Categories>>>;
  hasChildren?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  thumbnailDominantColor?: Maybe<Scalars['String']['output']>;
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

export type PaymentMethod = {
  __typename?: 'PaymentMethod';
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

export type PaymentMethods = {
  __typename?: 'PaymentMethods';
  code?: Maybe<Scalars['String']['output']>;
  extraInformation?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
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

export type PlaceOrder = {
  __typename?: 'PlaceOrder';
  canReorder?: Maybe<Scalars['Boolean']['output']>;
  cartCount?: Maybe<Scalars['Int']['output']>;
  customerDetails?: Maybe<OrderCustomerDetails>;
  email?: Maybe<Scalars['String']['output']>;
  incrementId?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  orderId?: Maybe<Scalars['String']['output']>;
  showCreateAccountLink?: Maybe<Scalars['Boolean']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
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
  errors?: Maybe<Array<Maybe<PlaceOrderError>>>;
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

export type PriceFormat = {
  __typename?: 'PriceFormat';
  decimalSymbol?: Maybe<Scalars['String']['output']>;
  groupLength?: Maybe<Scalars['Int']['output']>;
  groupSymbol?: Maybe<Scalars['String']['output']>;
  integerRequired?: Maybe<Scalars['Boolean']['output']>;
  pattern?: Maybe<Scalars['String']['output']>;
  precision?: Maybe<Scalars['Int']['output']>;
  requiredPrecision?: Maybe<Scalars['Int']['output']>;
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

export type PrintInvoice = {
  __typename?: 'PrintInvoice';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type ProductAdditionalInfo = {
  __typename?: 'ProductAdditionalInfo';
  label?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

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
  /** Attribute label: Brand Name */
  brand_name?: InputMaybe<FilterEqualTypeInput>;
  /** Deprecated: use `category_uid` to filter product by category ID. */
  category_id?: InputMaybe<FilterEqualTypeInput>;
  /** Filter product by the unique ID for a `CategoryInterface` object. */
  category_uid?: InputMaybe<FilterEqualTypeInput>;
  /** Filter product by category URL path. */
  category_url_path?: InputMaybe<FilterEqualTypeInput>;
  /** Attribute label: Color */
  color?: InputMaybe<FilterEqualTypeInput>;
  /** Attribute label: Cream Type */
  cream_type?: InputMaybe<FilterEqualTypeInput>;
  /** Attribute label: Custom Tabs */
  custom_tabs?: InputMaybe<FilterMatchTypeInput>;
  /** Attribute label: Description */
  description?: InputMaybe<FilterMatchTypeInput>;
  /** Attribute label: Food Type */
  food_type?: InputMaybe<FilterEqualTypeInput>;
  /** Attribute label: Gender */
  gender?: InputMaybe<FilterEqualTypeInput>;
  /** Attribute label: Glass Type */
  glass_type?: InputMaybe<FilterEqualTypeInput>;
  /** Attribute label: Hair Type */
  hair_type?: InputMaybe<FilterEqualTypeInput>;
  /** Attribute label: Lens Type */
  lens_type?: InputMaybe<FilterEqualTypeInput>;
  /** Attribute label: Manufacturer */
  manufacturer?: InputMaybe<FilterEqualTypeInput>;
  /** Attribute label: Product Name */
  name?: InputMaybe<FilterMatchTypeInput>;
  /** Attribute label: Perfume Type */
  perfume_type?: InputMaybe<FilterEqualTypeInput>;
  /** Attribute label: Price */
  price?: InputMaybe<FilterRangeTypeInput>;
  /** Attribute label: Product Series */
  product_series?: InputMaybe<FilterEqualTypeInput>;
  /** Whole-star product rating, 1 to 5. Use from = 4 to get products rated 4 stars and up. */
  rating?: InputMaybe<FilterRangeTypeInput>;
  /** Attribute label: Short Description */
  short_description?: InputMaybe<FilterMatchTypeInput>;
  /** Attribute label: Skin Type */
  skin_type?: InputMaybe<FilterEqualTypeInput>;
  /** Attribute label: SKU */
  sku?: InputMaybe<FilterEqualTypeInput>;
  /** Attribute label: Solution Type */
  solution_type?: InputMaybe<FilterEqualTypeInput>;
  /** Attribute label: Sunscreen Type */
  sunscreen_type?: InputMaybe<FilterEqualTypeInput>;
  /** Attribute label: Product Type */
  type?: InputMaybe<FilterEqualTypeInput>;
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

/** product collection data */
export type ProductCollection = {
  __typename?: 'ProductCollection';
  banners?: Maybe<Array<Maybe<Banners>>>;
  cartCount?: Maybe<Scalars['Int']['output']>;
  childCategories?: Maybe<Array<Maybe<ChildCategories>>>;
  criteriaData?: Maybe<Scalars['String']['output']>;
  layeredData?: Maybe<Array<Maybe<LayeredData>>>;
  message?: Maybe<Scalars['String']['output']>;
  productList?: Maybe<Array<Maybe<OneProductList>>>;
  reviewEnable?: Maybe<Scalars['Boolean']['output']>;
  sortingData?: Maybe<Array<Maybe<SortingData>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
  totalCount?: Maybe<Scalars['Int']['output']>;
  wishlistEnable?: Maybe<Scalars['String']['output']>;
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
  /** The label of the product image or video. */
  label?: Maybe<Scalars['String']['output']>;
  /** The media item's position after it has been sorted. */
  position?: Maybe<Scalars['Int']['output']>;
  /** Array of image types. It can have the following values: image, small_image, thumbnail. */
  types?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** The URL of the product image or video. */
  url?: Maybe<Scalars['String']['output']>;
};

export type ProductImageGallery = {
  __typename?: 'ProductImageGallery';
  dominantColor?: Maybe<Scalars['String']['output']>;
  isVideo?: Maybe<Scalars['Boolean']['output']>;
  largeImage?: Maybe<Scalars['String']['output']>;
  smallImage?: Maybe<Scalars['String']['output']>;
  videoUrl?: Maybe<Scalars['String']['output']>;
};

export enum ProductImageThumbnail {
  /** Use thumbnail of product as image. */
  Itself = 'ITSELF',
  /** Use thumbnail of product's parent as image. */
  Parent = 'PARENT'
}

/** Contains fields that are common to all types of products. */
export type ProductInterface = {
  /** @deprecated Use the `custom_attributes` field instead. */
  as_featured?: Maybe<Scalars['String']['output']>;
  /**
   * The attribute set assigned to the product.
   * @deprecated The field should not be used on the storefront.
   */
  attribute_set_id?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  brand_name?: Maybe<Scalars['Int']['output']>;
  /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled. */
  canonical_url?: Maybe<Scalars['String']['output']>;
  /** The categories assigned to a product. */
  categories?: Maybe<Array<Maybe<CategoryInterface>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  celimax?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  color?: Maybe<Scalars['Int']['output']>;
  /** The product's country of origin. */
  country_of_manufacture?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  cream_type?: Maybe<Scalars['Int']['output']>;
  /**
   * Timestamp indicating when the product was created.
   * @deprecated The field should not be used on the storefront.
   */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Crosssell Products */
  crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** Product custom attributes. */
  custom_attributesV2?: Maybe<ProductCustomAttributes>;
  /** @deprecated Use the `custom_attributes` field instead. */
  custom_tabs?: Maybe<Scalars['String']['output']>;
  /** Detailed information about the product. The value can include simple HTML tags. */
  description?: Maybe<ComplexTextValue>;
  /** @deprecated Use the `custom_attributes` field instead. */
  detail_sidebar?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  expire_date?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  extended_notes?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_age_group?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_age_range?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_baby_food_stage?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_brand?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_capacity?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_color?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_compatible_devices?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_decor_style?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_digital_zoom?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_display_technology?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_finish?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_gemstone?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_gender?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_health_concern?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_ingredients?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_is_assembly_required?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_material?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_maximum_weight?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_megapixels?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_minimum_weight?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_model?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_number_of_licenses?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_operating_system?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_optical_zoom?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_package_quantity?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_pattern?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_depth?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_form?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_height?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_length?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_weight?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_width?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_recommended_use?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_resolution?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_scent?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_screen_size?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_shoe_width?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_size?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_storage_capacity?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_style?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_system_requirements?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_thread_count?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_video_game_platform?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  featured?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  food_type?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  gender?: Maybe<Scalars['Int']['output']>;
  /** Returns a value indicating gift message availability for the product. */
  gift_message_available: Scalars['Boolean']['output'];
  /** @deprecated Use the `custom_attributes` field instead. */
  glass_type?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  hair_type?: Maybe<Scalars['Int']['output']>;
  /**
   * The ID number assigned to the product.
   * @deprecated Use the `uid` field instead.
   */
  id?: Maybe<Scalars['Int']['output']>;
  /** The relative path to the main image on the product page. */
  image?: Maybe<ProductImage>;
  /** @deprecated Use the `custom_attributes` field instead. */
  lens_type?: Maybe<Scalars['Int']['output']>;
  /** The Live stock popup: availability per place (the attributes of the attribute group Custom Stock - today Online Stock). */
  live_stock?: Maybe<Array<Maybe<ProductSourceStock>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  manufacture_date?: Maybe<Scalars['String']['output']>;
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
  /** Remaining stock if it is below the value assigned to the Only X Left Threshold option in the Admin. */
  only_x_left_in_stock?: Maybe<Scalars['Float']['output']>;
  /** If the product has multiple options, determines where they appear on the product page. */
  options_container?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  perfume_type?: Maybe<Scalars['Int']['output']>;
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
  /** @deprecated Use the `custom_attributes` field instead. */
  product_series?: Maybe<Scalars['Int']['output']>;
  /** Amount of available stock */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** The average of all the ratings given to the product. */
  rating_summary: Scalars['Float']['output'];
  /** An array of products to be displayed in a Related Products block. */
  related_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The total count of all the reviews given to the product. */
  review_count: Scalars['Int']['output'];
  /** Rating figures of the product for each period (ALL, LAST_30_DAYS, LAST_60_DAYS, LAST_12_MONTHS): average, counts and the 5-to-1 star distribution. Periods are counted from the moment the product response was cached. */
  review_summaries: Array<Maybe<ProductReviewSummary>>;
  /** The list of products reviews. */
  reviews: ProductReviews;
  /** A short description of the product. Its use depends on the theme. */
  short_description?: Maybe<ComplexTextValue>;
  /** @deprecated Use the `custom_attributes` field instead. */
  skin_type?: Maybe<Scalars['Int']['output']>;
  /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
  sku?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  sm_featured?: Maybe<Scalars['Int']['output']>;
  /** The relative path to the small image, which is used on catalog pages. */
  small_image?: Maybe<ProductImage>;
  /** @deprecated Use the `custom_attributes` field instead. */
  solution_type?: Maybe<Scalars['Int']['output']>;
  /**
   * The beginning date that a product has a special price.
   * @deprecated The field should not be used on the storefront.
   */
  special_from_date?: Maybe<Scalars['String']['output']>;
  /** The discounted price of the product. */
  special_price?: Maybe<Scalars['Float']['output']>;
  /** The end date for a product with a special price. */
  special_to_date?: Maybe<Scalars['String']['output']>;
  /** The stock status of the product. */
  stock_status?: Maybe<ProductStockStatus>;
  /** @deprecated Use the `custom_attributes` field instead. */
  sunscreen_type?: Maybe<Scalars['Int']['output']>;
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
  /**
   * An array of websites in which the product is available.
   * @deprecated The field should not be used on the storefront.
   */
  websites?: Maybe<Array<Maybe<Website>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  youtube_video_url?: Maybe<Scalars['String']['output']>;
};


/** Contains fields that are common to all types of products. */
export type ProductInterfaceCustom_AttributesV2Args = {
  filters?: InputMaybe<AttributeFilterInput>;
};


/** Contains fields that are common to all types of products. */
export type ProductInterfaceReviewsArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<ProductReviewFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<ProductReviewSortInput>;
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

/** product page all information */
export type ProductPageData = {
  __typename?: 'ProductPageData';
  additionalInformation?: Maybe<Array<Maybe<ProductAdditionalInfo>>>;
  arTextureImages?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  arType?: Maybe<Scalars['String']['output']>;
  arUrl?: Maybe<Scalars['String']['output']>;
  availability?: Maybe<Scalars['String']['output']>;
  bundleOptions?: Maybe<Array<Maybe<BundleOptions>>>;
  canGuestCheckoutDownloadable?: Maybe<Scalars['Boolean']['output']>;
  cartCount?: Maybe<Scalars['Int']['output']>;
  configurableData?: Maybe<ConfigurableData>;
  customOptions?: Maybe<Array<Maybe<CustomOptions>>>;
  description?: Maybe<Scalars['String']['output']>;
  dominantColor?: Maybe<Scalars['String']['output']>;
  finalPrice?: Maybe<Scalars['Float']['output']>;
  formattedFinalPrice?: Maybe<Scalars['String']['output']>;
  formattedMaxPrice?: Maybe<Scalars['String']['output']>;
  formattedMinPrice?: Maybe<Scalars['String']['output']>;
  formattedMsrp?: Maybe<Scalars['String']['output']>;
  formattedPrice?: Maybe<Scalars['String']['output']>;
  formattedSpecialPrice?: Maybe<Scalars['String']['output']>;
  groupedData?: Maybe<Array<Maybe<GroupedData>>>;
  groupedPrice?: Maybe<Scalars['String']['output']>;
  guestCanReview?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  imageGallery?: Maybe<Array<Maybe<ProductImageGallery>>>;
  isAllowedGuestCheckout?: Maybe<Scalars['Boolean']['output']>;
  isCheckoutAllowed?: Maybe<Scalars['Boolean']['output']>;
  isInWishlist?: Maybe<Scalars['Boolean']['output']>;
  isThresholdVisible?: Maybe<Scalars['Boolean']['output']>;
  is_new?: Maybe<Scalars['Boolean']['output']>;
  links?: Maybe<DownloadableLinks>;
  maxPrice?: Maybe<Scalars['Float']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  minAddToCartQty?: Maybe<Scalars['Int']['output']>;
  minPrice?: Maybe<Scalars['Float']['output']>;
  msrp?: Maybe<Scalars['Float']['output']>;
  msrpDisplayActualPriceType?: Maybe<Scalars['String']['output']>;
  msrpEnabled?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  priceFormat?: Maybe<PriceFormat>;
  priceView?: Maybe<Scalars['String']['output']>;
  productUrl?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  ratingArray?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  ratingData?: Maybe<Array<Maybe<RatingData>>>;
  ratingFormData?: Maybe<Array<Maybe<RatingFormData>>>;
  relatedProductList?: Maybe<Array<Maybe<OneProductList>>>;
  reviewCount?: Maybe<Scalars['Int']['output']>;
  reviewEnable?: Maybe<Scalars['Boolean']['output']>;
  reviewList?: Maybe<Array<Maybe<ReviewList>>>;
  samples?: Maybe<DownloadableSamples>;
  shortDescription?: Maybe<Scalars['String']['output']>;
  showBackInStockAlert?: Maybe<Scalars['Boolean']['output']>;
  showPriceDropAlert?: Maybe<Scalars['Boolean']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
  specialPrice?: Maybe<Scalars['Float']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  thresholdQtyLeft?: Maybe<Scalars['Int']['output']>;
  thumbNail?: Maybe<Scalars['String']['output']>;
  tierPrices?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  typeId?: Maybe<Scalars['String']['output']>;
  upsellProductList?: Maybe<Array<Maybe<OneProductList>>>;
  wishlistEnable?: Maybe<Scalars['String']['output']>;
  wishlistItemId?: Maybe<Scalars['Int']['output']>;
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

/** A question with the shop's answer. */
export type ProductQuestion = {
  __typename?: 'ProductQuestion';
  /** The answer. */
  answer?: Maybe<Scalars['String']['output']>;
  /** Name of the person who asked. */
  author?: Maybe<Scalars['String']['output']>;
  /** When the question was asked. */
  created_at: Scalars['String']['output'];
  /** The question. */
  question: Scalars['String']['output'];
};

/** A page of product questions. */
export type ProductQuestions = {
  __typename?: 'ProductQuestions';
  /** The questions on this page. */
  items: Array<Maybe<ProductQuestion>>;
  /** Number of answered questions of the product. */
  total_count: Scalars['Int']['output'];
};

/** Contains details of a product review. */
export type ProductReview = {
  __typename?: 'ProductReview';
  /** The average of all ratings for this product. */
  average_rating: Scalars['Float']['output'];
  /** The date the review was created. */
  created_at: Scalars['String']['output'];
  /** Date of the customer's first order of this product. */
  first_purchase_at?: Maybe<Scalars['String']['output']>;
  /** Number of customers who found the review helpful. */
  helpful_count: Scalars['Int']['output'];
  /** The customer's nickname. Defaults to the customer name, if logged in. */
  nickname: Scalars['String']['output'];
  /** URLs of the customer photos (up to 5). */
  photos: Array<Maybe<Scalars['String']['output']>>;
  /** The Price text. */
  price?: Maybe<Scalars['String']['output']>;
  /** The reviewed product. */
  product: ProductInterface;
  /** The Pros text. */
  pros?: Maybe<Scalars['String']['output']>;
  /** An array of ratings by rating category, such as quality, price, and value. */
  ratings_breakdown: Array<Maybe<ProductReviewRating>>;
  /** The review ID (use it with markProductReviewHelpful). */
  review_id: Scalars['Int']['output'];
  /** The shop's reply to the review. */
  store_reply?: Maybe<Scalars['String']['output']>;
  /** The summary (title) of the review. */
  summary: Scalars['String']['output'];
  /** The review text. */
  text: Scalars['String']['output'];
  /** How many orders the customer placed for this product. */
  total_purchased: Scalars['Int']['output'];
  /** The Value text. */
  value?: Maybe<Scalars['String']['output']>;
  /** True when the customer who wrote the review bought this product. */
  verified_buyer: Scalars['Boolean']['output'];
};

/** Review filters. Boolean filters narrow the list only when true; false or unset means no restriction. */
export type ProductReviewFilterInput = {
  /** true = only reviews written by guests (not logged in). */
  guest?: InputMaybe<Scalars['Boolean']['input']>;
  /** true = only reviews the shop has replied to. */
  has_store_reply?: InputMaybe<Scalars['Boolean']['input']>;
  /** Words to search for. Every word must appear in the review title, text, Pros, Value, Price or the reviewer name. */
  keyword?: InputMaybe<Scalars['String']['input']>;
  /** Only reviews written in this period. */
  period?: InputMaybe<ProductReviewPeriod>;
  /** Only reviews with this star rating (1-5; the stars of a review are the rounded average of its rating votes). */
  rating?: InputMaybe<Scalars['Int']['input']>;
  /** true = only reviews by customers who bought the product. */
  verified_buyer?: InputMaybe<Scalars['Boolean']['input']>;
  /** true = only reviews with photos. */
  with_photos?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Result of a helpful vote. */
export type ProductReviewHelpfulOutput = {
  __typename?: 'ProductReviewHelpfulOutput';
  /** Helpful votes after this request. */
  helpful_count: Scalars['Int']['output'];
  /** The review ID. */
  review_id: Scalars['Int']['output'];
  /** False when this voter had already voted. */
  voted: Scalars['Boolean']['output'];
};

/** Review date range. */
export enum ProductReviewPeriod {
  All = 'ALL',
  Last_12Months = 'LAST_12_MONTHS',
  Last_30Days = 'LAST_30_DAYS',
  Last_60Days = 'LAST_60_DAYS'
}

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

/** Sort order of product reviews. Set one field; helpful and rating are followed by newest first. */
export type ProductReviewSortInput = {
  /** Order by review date. */
  created_at?: InputMaybe<SortEnum>;
  /** Order by helpful votes. DESC = Most Helpful first. */
  helpful?: InputMaybe<SortEnum>;
  /** Order by star rating (DESC = Highest Rating first), then newest. */
  rating?: InputMaybe<SortEnum>;
};

export type ProductReviewStarCount = {
  __typename?: 'ProductReviewStarCount';
  /** Rated reviews with this star rating. */
  count: Scalars['Int']['output'];
  /** Share of the rated reviews, rounded to a whole percent. */
  percent: Scalars['Int']['output'];
  stars: Scalars['Int']['output'];
};

/** Rating figures of one period. */
export type ProductReviewSummary = {
  __typename?: 'ProductReviewSummary';
  /** Average stars (0-5, one decimal) of the rated reviews; 0 when there are none. */
  average_rating: Scalars['Float']['output'];
  /** 5, 4, 3, 2, 1 stars, in that order. */
  distribution: Array<Maybe<ProductReviewStarCount>>;
  period: ProductReviewPeriod;
  /** Reviews that carry a star rating (the ratings). */
  ratings_count: Scalars['Int']['output'];
  /** Reviews with written text (the with reviews figure). */
  reviews_count: Scalars['Int']['output'];
};

/** Contains an array of product reviews. */
export type ProductReviews = {
  __typename?: 'ProductReviews';
  /** An array of product reviews. */
  items: Array<Maybe<ProductReview>>;
  /** Metadata for pagination rendering. */
  page_info: SearchResultPageInfo;
  /** Number of reviews matching the filter (all pages). */
  total_count: Scalars['Int']['output'];
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

/** Availability of a product in one place. */
export type ProductSourceStock = {
  __typename?: 'ProductSourceStock';
  /** True when the place has the product in stock; false is shown as Sold Out. */
  available: Scalars['Boolean']['output'];
  /** Name of the place, such as Online Stock or a branch. */
  location: Scalars['String']['output'];
  /** Quantity in the place. Only given to the customer groups allowed in Stores > Configuration > Live stock (stock_live/config/allowed_group); null for everyone else. */
  quantity?: Maybe<Scalars['Int']['output']>;
};

/** States whether a product stock status is in stock or out of stock. */
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
  /** The label of the product image or video. */
  label?: Maybe<Scalars['String']['output']>;
  /** The media item's position after it has been sorted. */
  position?: Maybe<Scalars['Int']['output']>;
  /** Array of image types. It can have the following values: image, small_image, thumbnail. */
  types?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** The URL of the product image or video. */
  url?: Maybe<Scalars['String']['output']>;
  /** Contains a `ProductMediaGalleryEntriesVideoContent` object. */
  video_content?: Maybe<ProductMediaGalleryEntriesVideoContent>;
};

/** Contains the results of a `products` query. */
export type Products = {
  __typename?: 'Products';
  /** A bucket that contains the attribute code and label for each filterable option. */
  aggregations?: Maybe<Array<Maybe<Aggregation>>>;
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


/** Contains the results of a `products` query. */
export type ProductsAggregationsArgs = {
  filter?: InputMaybe<AggregationsFilterInput>;
};

export type Query = {
  __typename?: 'Query';
  /** customer account information */
  accountInfoData?: Maybe<AccountInfoData>;
  /** address book information */
  addressBookData?: Maybe<AddressBookData>;
  /** address form information */
  addressFormData?: Maybe<AddressFormDataRequest>;
  /** advanced search form data information */
  advancedSearchFormData?: Maybe<AdvancedSearchFormData>;
  /** Retrieve EAV attributes associated to a frontend form. Use countries query provided by DirectoryGraphQl module to retrieve region_id and country_id attribute options. */
  attributesForm: AttributesFormOutput;
  /** Returns a list of attributes metadata for a given entity type. */
  attributesList?: Maybe<AttributesMetadataOutput>;
  /** Get a list of available store views and their config information. */
  availableStores?: Maybe<Array<Maybe<StoreConfig>>>;
  /** Return information about the specified shopping cart. */
  cart?: Maybe<Cart>;
  /** cart information */
  cartDetails?: Maybe<CartDetails>;
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
  /** category page all information */
  categoryPageData?: Maybe<CategoryPageData>;
  /** public cacheable category page information */
  categoryPageDataPublic?: Maybe<CategoryPageData>;
  /** check customer by email information */
  checkCustomerByEmail?: Maybe<CheckCustomerByEmail>;
  /** checkout address information */
  checkoutAddress?: Maybe<CheckoutAddress>;
  /** checkout address form data information */
  checkoutAddressFormData?: Maybe<CheckoutAddressFormData>;
  /** Return Terms and Conditions configuration information. */
  checkoutAgreements?: Maybe<Array<Maybe<CheckoutAgreement>>>;
  /** Return information about CMS blocks. */
  cmsBlocks?: Maybe<CmsBlocks>;
  /** cms data information */
  cmsData?: Maybe<CmsData>;
  /** Return details about a CMS page. */
  cmsPage?: Maybe<CmsPage>;
  /** Return products that have been added to the specified compare list. */
  compareList?: Maybe<CompareList>;
  /** Content of the Contact Us page, managed in Admin > Webkul BS Theme > Contact Page Configuration. */
  contactPage?: Maybe<ContactPageContent>;
  /** The countries query provides information for all countries. */
  countries?: Maybe<Array<Maybe<Country>>>;
  /** The countries query provides information for a single country. */
  country?: Maybe<Country>;
  /** create account form data information */
  createAccountFormData?: Maybe<CreateAccountFormData>;
  /** customer credit memo view information */
  creditView?: Maybe<CreditView>;
  /** Return information about the store's currency. */
  currency?: Maybe<Currency>;
  /**
   * Return the attribute type, given an attribute code and entity type.
   * @deprecated Use `customAttributeMetadataV2` query instead.
   */
  customAttributeMetadata?: Maybe<CustomAttributeMetadata>;
  /** Retrieve EAV attributes metadata. */
  customAttributeMetadataV2: AttributesMetadataOutput;
  /** custom collection information */
  customCollection?: Maybe<CustomCollection>;
  /** Return detailed information about a customer account. */
  customer?: Maybe<Customer>;
  /** Return information about the customer's shopping cart. */
  customerCart: Cart;
  /** compare list information */
  customerCompareList?: Maybe<CompareList>;
  /** Return a list of downloadable products the customer has purchased. */
  customerDownloadableProducts?: Maybe<CustomerDownloadableProducts>;
  /** Provides Customer Group assigned to the Customer or Guest. */
  customerGroup: CustomerGroupStorefront;
  /** @deprecated Use the `customer` query instead. */
  customerOrders?: Maybe<CustomerOrders>;
  /** Return a list of customer payment tokens stored in the vault. */
  customerPaymentTokens?: Maybe<CustomerPaymentTokens>;
  /** download product information */
  downloadProduct?: Maybe<DownloadProduct>;
  /** Website footer for the current store view. Null when no footer is configured or it is disabled. */
  footer?: Maybe<Footer>;
  /** Get real-time customer cart count */
  getCartCount?: Maybe<CartCountResponse>;
  /** category list information */
  getCategoryList?: Maybe<GetCategoryList>;
  /** Get customer name, email and profile images */
  getCustomerDetails?: Maybe<CustomerDetailsResponse>;
  /** Get customer wishlist item product IDs */
  getCustomerWishlist?: Maybe<CustomerWishlistResponse>;
  /** Retrieve the secure PayPal URL for a Payments Pro Hosted Solution transaction. */
  getHostedProUrl?: Maybe<HostedProUrl>;
  /** Get real-time unread notification count */
  getNotificationCount?: Maybe<NotificationCountResponse>;
  /** Retrieve payment credentials for a transaction. Use this query for Payflow Link and Payments Advanced payment methods. */
  getPayflowLinkToken?: Maybe<PayflowLinkToken>;
  /** Retrieves the payment configuration for a given location */
  getPaymentConfig?: Maybe<PaymentConfigOutput>;
  /** Retrieves the payment details for the order */
  getPaymentOrder?: Maybe<PaymentOrderOutput>;
  /** Gets the payment SDK urls and values */
  getPaymentSDK?: Maybe<GetPaymentSdkOutput>;
  /** Retrieves the vault configuration */
  getVaultConfig?: Maybe<VaultConfigOutput>;
  /** get Qr URL for Watch App */
  getWatchQr?: Maybe<WatchQr>;
  /** Retrieve guest order details based on number, email and billing last name. */
  guestOrder: CustomerOrder;
  /** Retrieve guest order details based on token. */
  guestOrderByToken: CustomerOrder;
  /** guest order view information */
  guestView?: Maybe<GuestView>;
  /** Website home page content for the current store view */
  homePage?: Maybe<HomePage>;
  /** home page all information */
  homePageData?: Maybe<HomePageData>;
  /** public cacheable home page information */
  homePageDataPublic?: Maybe<HomePageData>;
  /** customer invoice view information */
  invoiceView?: Maybe<InvoiceView>;
  /** Check whether the specified email has already been used to create a customer account. */
  isEmailAvailable?: Maybe<IsEmailAvailableOutput>;
  /** List of tiers */
  mstRewardsTiers: Array<Maybe<MstRewardsTier>>;
  /** download list information */
  myDownloadsList?: Maybe<MyDownloadsList>;
  /** custom collection information */
  notificationList?: Maybe<NotificationList>;
  /** order details information */
  orderDetails?: Maybe<OrderDetails>;
  /** order list information */
  orderList?: Maybe<OrderList>;
  /** other notification information */
  otherNotificationData?: Maybe<OtherNotificationData>;
  /** price alert information */
  price?: Maybe<DefaultResponse>;
  /** Download Invoice */
  printInvoice?: Maybe<PrintInvoice>;
  /** product collection all information */
  productCollection?: Maybe<ProductCollection>;
  /** public cacheable product collection information */
  productCollectionPublic?: Maybe<ProductCollection>;
  /** product page all information */
  productPageData?: Maybe<ProductPageData>;
  /** public cacheable product page information */
  productPageDataPublic?: Maybe<ProductPageData>;
  /** The answered questions of a product, newest first. */
  productQuestions?: Maybe<ProductQuestions>;
  /** Return the active ratings attributes and the values each rating can have. */
  productReviewRatingsMetadata: ProductReviewRatingsMetadata;
  /** share products by mail */
  productShare?: Maybe<DefaultResponse>;
  /** Search for products that match the criteria specified in the `search` and `filter` attributes. */
  products?: Maybe<Products>;
  /** rating form data information */
  ratingFormData?: Maybe<RatingForm>;
  recaptchaFormConfig?: Maybe<ReCaptchaConfigOutput>;
  /** Returns details about Google reCAPTCHA V3-Invisible configuration. */
  recaptchaV3Config?: Maybe<ReCaptchaConfigurationV3>;
  /** review and payment information */
  reviewAndPayment?: Maybe<ReviewAndPayment>;
  /** review details information */
  reviewDetails?: Maybe<ReviewDetails>;
  /** review list information */
  reviewList?: Maybe<ReviewListData>;
  /** reviews And Ratings information */
  reviewsAndRatings?: Maybe<ReviewsAndRatings>;
  /** Return the full details for a specified product, category, or CMS page. */
  route?: Maybe<RoutableInterface>;
  /** search suggestion information */
  searchSuggestion?: Maybe<SearchSuggestion>;
  /** search term list information */
  searchTermList?: Maybe<SearchTermList>;
  /** shipment view information */
  shipmentView?: Maybe<ShipmentView>;
  /** shipping methods information */
  shippingMethods?: Maybe<ShippingMethods>;
  /** stock alert information */
  stock?: Maybe<DefaultResponse>;
  /** Return details about the store's configuration. */
  storeConfig?: Maybe<StoreConfig>;
  /** The Locations page: heading texts and the stores shown on it, in admin sort order. */
  storeLocations?: Maybe<StoreLocationsPage>;
  /** Upsell product list information */
  upsellProductList?: Maybe<UpsellProductList>;
  /**
   * Return the relative URL for a specified product, category or CMS page.
   * @deprecated Use the `route` query instead.
   */
  urlResolver?: Maybe<EntityUrl>;
  /** walkthrough information */
  walkthrough?: Maybe<WalkThrough>;
  /**
   * wishlist information
   * @deprecated Moved under `Customer.wishlist`.
   */
  wishlist?: Maybe<MobikulWishlist>;
};


export type QueryAccountInfoDataArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAddressBookDataArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  forDashboard?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAddressFormDataArgs = {
  addressId?: InputMaybe<Scalars['Int']['input']>;
  customerToken?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAdvancedSearchFormDataArgs = {
  storeId?: InputMaybe<Scalars['Int']['input']>;
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


export type QueryCartDetailsArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  customerToken?: InputMaybe<Scalars['String']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  quoteId?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['String']['input']>;
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


export type QueryCategoryPageDataArgs = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  customerToken?: InputMaybe<Scalars['String']['input']>;
  mFactor?: InputMaybe<Scalars['String']['input']>;
  quoteId?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCategoryPageDataPublicArgs = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  mFactor?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCheckCustomerByEmailArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCheckoutAddressArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  quoteId?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCheckoutAddressFormDataArgs = {
  addressId?: InputMaybe<Scalars['Int']['input']>;
  customerToken?: InputMaybe<Scalars['String']['input']>;
  isGuest?: InputMaybe<Scalars['Boolean']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCmsBlocksArgs = {
  identifiers?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryCmsDataArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
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


export type QueryCreateAccountFormDataArgs = {
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCreditViewArgs = {
  creditMemoId?: InputMaybe<Scalars['String']['input']>;
  customerToken?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCustomAttributeMetadataArgs = {
  attributes: Array<AttributeInput>;
};


export type QueryCustomAttributeMetadataV2Args = {
  attributes?: InputMaybe<Array<AttributeInput>>;
};


export type QueryCustomCollectionArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  filterData?: InputMaybe<Scalars['String']['input']>;
  notificationId?: InputMaybe<Scalars['Int']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  quoteId?: InputMaybe<Scalars['Int']['input']>;
  sortData?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCustomerCompareListArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  customerToken?: InputMaybe<Scalars['String']['input']>;
  mFactor?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['String']['input']>;
};


export type QueryDownloadProductArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetCartCountArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  quoteId?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetCategoryListArgs = {
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetCustomerDetailsArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  mFactor?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetCustomerWishlistArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetHostedProUrlArgs = {
  input: HostedProUrlInput;
};


export type QueryGetNotificationCountArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
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


export type QueryGetWatchQrArgs = {
  firebaseId?: InputMaybe<Scalars['String']['input']>;
  os?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGuestOrderArgs = {
  input: GuestOrderInformationInput;
};


export type QueryGuestOrderByTokenArgs = {
  input: OrderTokenInput;
};


export type QueryGuestViewArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  incrementId?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  zipCode?: InputMaybe<Scalars['String']['input']>;
};


export type QueryHomePageDataArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  customerToken?: InputMaybe<Scalars['String']['input']>;
  isFromUrl?: InputMaybe<Scalars['String']['input']>;
  mFactor?: InputMaybe<Scalars['String']['input']>;
  quoteId?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  websiteId?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['String']['input']>;
};


export type QueryHomePageDataPublicArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  isFromUrl?: InputMaybe<Scalars['String']['input']>;
  mFactor?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  websiteId?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['String']['input']>;
};


export type QueryInvoiceViewArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  invoiceId?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryIsEmailAvailableArgs = {
  email: Scalars['String']['input'];
};


export type QueryMyDownloadsListArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryNotificationListArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  mFactor?: InputMaybe<Scalars['Int']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['String']['input']>;
};


export type QueryOrderDetailsArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  incrementId?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryOrderListArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  forDashboard?: InputMaybe<Scalars['Int']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  requiredCount?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryOtherNotificationDataArgs = {
  notificationId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPriceArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPrintInvoiceArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  incrementId?: InputMaybe<Scalars['String']['input']>;
  invoiceId?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryProductCollectionArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  customerToken?: InputMaybe<Scalars['String']['input']>;
  filterData?: InputMaybe<Array<InputMaybe<CollectionFilter>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  mFactor?: InputMaybe<Scalars['String']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  quoteId?: InputMaybe<Scalars['Int']['input']>;
  sortData?: InputMaybe<CollectionSort>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductCollectionPublicArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  filterData?: InputMaybe<Array<InputMaybe<CollectionFilter>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  mFactor?: InputMaybe<Scalars['String']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  sortData?: InputMaybe<CollectionSort>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductPageDataArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  customerToken?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['Int']['input']>;
  quoteId?: InputMaybe<Scalars['Int']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductPageDataPublicArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['Int']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductQuestionsArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sku: Scalars['String']['input'];
};


export type QueryProductShareArgs = {
  customerEmail?: InputMaybe<Scalars['String']['input']>;
  customerName?: InputMaybe<Scalars['String']['input']>;
  message: Scalars['String']['input'];
  productId: Scalars['Int']['input'];
  recipientEmail?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  recipientName?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryProductsArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<ProductAttributeFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<ProductAttributeSortInput>;
};


export type QueryRatingFormDataArgs = {
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRecaptchaFormConfigArgs = {
  formType: ReCaptchaFormEnum;
};


export type QueryReviewAndPaymentArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  customerToken?: InputMaybe<Scalars['String']['input']>;
  quoteId?: InputMaybe<Scalars['Int']['input']>;
  shippingMethod?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryReviewDetailsArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  reviewId?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryReviewListArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  forDashboard?: InputMaybe<Scalars['Int']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryReviewsAndRatingsArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  productId?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  websiteId?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['String']['input']>;
};


export type QueryRouteArgs = {
  url: Scalars['String']['input'];
};


export type QuerySearchSuggestionArgs = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  customerToken?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySearchTermListArgs = {
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryShipmentViewArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  shipmentId?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryShippingMethodsArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  customerToken?: InputMaybe<Scalars['String']['input']>;
  quoteId?: InputMaybe<Scalars['Int']['input']>;
  shippingData?: InputMaybe<ShippingDataInput>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryStockArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUpsellProductListArgs = {
  customerToken?: InputMaybe<Scalars['String']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  productId?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  websiteId?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUrlResolverArgs = {
  url: Scalars['String']['input'];
};


export type QueryWalkthroughArgs = {
  width?: InputMaybe<Scalars['String']['input']>;
};


export type QueryWishlistArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  customerToken?: InputMaybe<Scalars['String']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['String']['input']>;
};

/** Specifies the field to use for sorting quote items */
export type QuoteItemsSortInput = {
  /** Specifies the quote items field to sort by */
  field: SortQuoteItemsEnum;
  /** Specifies the order of quote items' sorting */
  order: SortEnum;
};

export type RatingData = {
  __typename?: 'RatingData';
  ratingCode?: Maybe<Scalars['String']['output']>;
  ratingValue?: Maybe<Scalars['Float']['output']>;
};

export type RatingDataForm = {
  __typename?: 'RatingDataForm';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  values?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type RatingForm = {
  __typename?: 'RatingForm';
  message?: Maybe<Scalars['String']['output']>;
  ratingFormData?: Maybe<Array<Maybe<RatingDataForm>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type RatingFormData = {
  __typename?: 'RatingFormData';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  values?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type Ratings = {
  __typename?: 'Ratings';
  label?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
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

export type ReOrder = {
  __typename?: 'ReOrder';
  cartCount?: Maybe<Scalars['Int']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type ReadNotificationResponse = {
  __typename?: 'ReadNotificationResponse';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  unreadCount?: Maybe<Scalars['Int']['output']>;
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

export type RemoveCartItem = {
  __typename?: 'RemoveCartItem';
  cartCount?: Maybe<Scalars['Int']['output']>;
  discount?: Maybe<CartTotalData>;
  grandtotal?: Maybe<CartTotalData>;
  message?: Maybe<Scalars['String']['output']>;
  shipping?: Maybe<CartTotalData>;
  subtotal?: Maybe<CartTotalData>;
  success?: Maybe<Scalars['Boolean']['output']>;
  tax?: Maybe<CartTotalData>;
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

export type RemoveFromWishlist = {
  __typename?: 'RemoveFromWishlist';
  alreadyDeleted?: Maybe<Scalars['Boolean']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
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

export type ReviewAndPayment = {
  __typename?: 'ReviewAndPayment';
  billingAddress?: Maybe<Scalars['String']['output']>;
  cartCount?: Maybe<Scalars['Int']['output']>;
  cartTotal?: Maybe<Scalars['String']['output']>;
  couponCode?: Maybe<Scalars['String']['output']>;
  currencyCode?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  orderReviewData?: Maybe<OrderReviewData>;
  paymentMethods?: Maybe<Array<Maybe<PaymentMethods>>>;
  quoteId?: Maybe<Scalars['Int']['output']>;
  shippingAddress?: Maybe<Scalars['String']['output']>;
  shippingMethod?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type ReviewDetails = {
  __typename?: 'ReviewDetails';
  averageRating?: Maybe<Scalars['Float']['output']>;
  dominantColor?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  productId?: Maybe<Scalars['String']['output']>;
  productName?: Maybe<Scalars['String']['output']>;
  ratingData?: Maybe<Array<Maybe<RatingData>>>;
  reviewDate?: Maybe<Scalars['String']['output']>;
  reviewDetail?: Maybe<Scalars['String']['output']>;
  reviewTitle?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  thumbNail?: Maybe<Scalars['String']['output']>;
  totalProductReviews?: Maybe<Scalars['Int']['output']>;
};

export type ReviewItems = {
  __typename?: 'ReviewItems';
  dominantColor?: Maybe<Scalars['String']['output']>;
  options?: Maybe<Array<Maybe<CartItemOptions>>>;
  originalPrice?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['String']['output']>;
  productName?: Maybe<Scalars['String']['output']>;
  qty?: Maybe<Scalars['Int']['output']>;
  subTotal?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  unformattedOriginalPrice?: Maybe<Scalars['Float']['output']>;
  unformattedPrice?: Maybe<Scalars['Float']['output']>;
};

export type ReviewList = {
  __typename?: 'ReviewList';
  avgRatings?: Maybe<Scalars['Float']['output']>;
  details?: Maybe<Scalars['String']['output']>;
  ratings?: Maybe<Array<Maybe<Ratings>>>;
  reviewBy?: Maybe<Scalars['String']['output']>;
  reviewOn?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ReviewListData = {
  __typename?: 'ReviewListData';
  message?: Maybe<Scalars['String']['output']>;
  reviewList?: Maybe<Array<Maybe<ReviewListItems>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type ReviewListItems = {
  __typename?: 'ReviewListItems';
  customerRating?: Maybe<Scalars['Float']['output']>;
  dominantColor?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  productId?: Maybe<Scalars['String']['output']>;
  productName?: Maybe<Scalars['String']['output']>;
  thumbNail?: Maybe<Scalars['String']['output']>;
};

export type ReviewsAndRatings = {
  __typename?: 'ReviewsAndRatings';
  message?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['String']['output']>;
  ratingData?: Maybe<Array<Maybe<RatingData>>>;
  ratingFormData?: Maybe<Array<Maybe<RatingDataForm>>>;
  reviewList?: Maybe<Array<Maybe<ReviewList>>>;
  showRatings?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  totalCount?: Maybe<Scalars['Int']['output']>;
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

export type SaveAccountInfo = {
  __typename?: 'SaveAccountInfo';
  customerName?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/** This enumeration defines the scope type for customer orders. */
export enum ScopeTypeEnum {
  Global = 'GLOBAL',
  Store = 'STORE',
  Website = 'WEBSITE'
}

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
  message?: Maybe<Scalars['String']['output']>;
  /** The search suggestion of existing product. */
  search: Scalars['String']['output'];
  success?: Maybe<Scalars['Boolean']['output']>;
  suggestProductArray?: Maybe<SuggestProductArray>;
};

export type SearchTermList = {
  __typename?: 'SearchTermList';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  termList?: Maybe<Array<Maybe<TermList>>>;
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

export type ShareWishlist = {
  __typename?: 'ShareWishlist';
  message?: Maybe<Scalars['String']['output']>;
  sentTo?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
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

export type ShipmentList = {
  __typename?: 'ShipmentList';
  id?: Maybe<Scalars['String']['output']>;
  incrementId?: Maybe<Scalars['String']['output']>;
  items?: Maybe<Array<Maybe<ShipmentProductItems>>>;
};

export type ShipmentProductItems = {
  __typename?: 'ShipmentProductItems';
  name?: Maybe<Scalars['String']['output']>;
  option?: Maybe<Array<Maybe<ItemListOptions>>>;
  qty?: Maybe<Scalars['Int']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
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

export type ShipmentView = {
  __typename?: 'ShipmentView';
  itemList?: Maybe<Array<Maybe<ShipmnetItemList>>>;
  message?: Maybe<Scalars['String']['output']>;
  orderId?: Maybe<Scalars['Int']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  trackingData?: Maybe<Array<Maybe<TrackingData>>>;
};

export type ShipmnetItemList = {
  __typename?: 'ShipmnetItemList';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  option?: Maybe<Array<Maybe<WishlistOptions>>>;
  productId?: Maybe<Scalars['String']['output']>;
  qty?: Maybe<Scalars['Int']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
};

export type ShippingAddress = {
  __typename?: 'ShippingAddress';
  city?: Maybe<Scalars['String']['output']>;
  company?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  pincode?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** Defines a single shipping address. */
export type ShippingAddressInput = {
  /** Defines a shipping address. */
  address?: InputMaybe<CartAddressInput>;
  /** An ID from the customer's address book that uniquely identifies the address to be used for shipping. */
  customer_address_id?: InputMaybe<Scalars['Int']['input']>;
  /** The unique ID from the customer's address book that uniquely identifies the address to be used for shipping. */
  customer_address_uid?: InputMaybe<Scalars['ID']['input']>;
  /** Text provided by the shopper. */
  customer_notes?: InputMaybe<Scalars['String']['input']>;
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
  /** The unique ID from the customer's address book that uniquely identifies the address. */
  customer_address_uid?: Maybe<Scalars['ID']['output']>;
  /** Text provided by the shopper. */
  customer_notes?: Maybe<Scalars['String']['output']>;
  /** The customer's fax number. */
  fax?: Maybe<Scalars['String']['output']>;
  /** The first name of the customer or guest. */
  firstname: Scalars['String']['output'];
  /**
   * Id of the customer address.
   * @deprecated Use `customer_address_uid` instead.
   */
  id?: Maybe<Scalars['Int']['output']>;
  /** @deprecated This information should not be exposed on the frontend. */
  items_weight?: Maybe<Scalars['Float']['output']>;
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
  /** The unique id of the customer cart address. */
  uid: Scalars['ID']['output'];
  /** The VAT company number for billing or shipping address. */
  vat_id?: Maybe<Scalars['String']['output']>;
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

export type ShippingMethod = {
  __typename?: 'ShippingMethod';
  title?: Maybe<Scalars['String']['output']>;
};

/** Defines the shipping carrier and method. */
export type ShippingMethodInput = {
  /** A string that identifies a commercial carrier or an offline delivery method. */
  carrier_code: Scalars['String']['input'];
  /** A string that indicates which service a commercial carrier will use to ship items. For offline delivery methods, this value is similar to the label displayed on the checkout page. */
  method_code: Scalars['String']['input'];
};

export type ShippingMethodList = {
  __typename?: 'ShippingMethodList';
  isSelected?: Maybe<Scalars['Boolean']['output']>;
  method?: Maybe<Array<Maybe<Method>>>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ShippingMethods = {
  __typename?: 'ShippingMethods';
  cartCount?: Maybe<Scalars['Int']['output']>;
  cartTotal?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  shippingMethods?: Maybe<Array<Maybe<ShippingMethodList>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
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
  /** @deprecated Use the `custom_attributes` field instead. */
  as_featured?: Maybe<Scalars['String']['output']>;
  /**
   * The attribute set assigned to the product.
   * @deprecated The field should not be used on the storefront.
   */
  attribute_set_id?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  brand_name?: Maybe<Scalars['Int']['output']>;
  /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled. */
  canonical_url?: Maybe<Scalars['String']['output']>;
  /** The categories assigned to a product. */
  categories?: Maybe<Array<Maybe<CategoryInterface>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  celimax?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  color?: Maybe<Scalars['Int']['output']>;
  /** The product's country of origin. */
  country_of_manufacture?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  cream_type?: Maybe<Scalars['Int']['output']>;
  /**
   * Timestamp indicating when the product was created.
   * @deprecated The field should not be used on the storefront.
   */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Crosssell Products */
  crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** Product custom attributes. */
  custom_attributesV2?: Maybe<ProductCustomAttributes>;
  /** @deprecated Use the `custom_attributes` field instead. */
  custom_tabs?: Maybe<Scalars['String']['output']>;
  /** Detailed information about the product. The value can include simple HTML tags. */
  description?: Maybe<ComplexTextValue>;
  /** @deprecated Use the `custom_attributes` field instead. */
  detail_sidebar?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  expire_date?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  extended_notes?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_age_group?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_age_range?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_baby_food_stage?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_brand?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_capacity?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_color?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_compatible_devices?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_decor_style?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_digital_zoom?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_display_technology?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_finish?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_gemstone?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_gender?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_health_concern?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_ingredients?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_is_assembly_required?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_material?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_maximum_weight?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_megapixels?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_minimum_weight?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_model?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_number_of_licenses?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_operating_system?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_optical_zoom?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_package_quantity?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_pattern?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_depth?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_form?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_height?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_length?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_weight?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_width?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_recommended_use?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_resolution?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_scent?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_screen_size?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_shoe_width?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_size?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_storage_capacity?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_style?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_system_requirements?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_thread_count?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_video_game_platform?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  featured?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  food_type?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  gender?: Maybe<Scalars['Int']['output']>;
  /** Returns a value indicating gift message availability for the product. */
  gift_message_available: Scalars['Boolean']['output'];
  /** @deprecated Use the `custom_attributes` field instead. */
  glass_type?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  hair_type?: Maybe<Scalars['Int']['output']>;
  /**
   * The ID number assigned to the product.
   * @deprecated Use the `uid` field instead.
   */
  id?: Maybe<Scalars['Int']['output']>;
  /** The relative path to the main image on the product page. */
  image?: Maybe<ProductImage>;
  /** @deprecated Use the `custom_attributes` field instead. */
  lens_type?: Maybe<Scalars['Int']['output']>;
  /** The Live stock popup: availability per place (the attributes of the attribute group Custom Stock - today Online Stock). */
  live_stock?: Maybe<Array<Maybe<ProductSourceStock>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  manufacture_date?: Maybe<Scalars['String']['output']>;
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
  /** Remaining stock if it is below the value assigned to the Only X Left Threshold option in the Admin. */
  only_x_left_in_stock?: Maybe<Scalars['Float']['output']>;
  /** An array of options for a customizable product. */
  options?: Maybe<Array<Maybe<CustomizableOptionInterface>>>;
  /** If the product has multiple options, determines where they appear on the product page. */
  options_container?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  perfume_type?: Maybe<Scalars['Int']['output']>;
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
  /** @deprecated Use the `custom_attributes` field instead. */
  product_series?: Maybe<Scalars['Int']['output']>;
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
  /** Rating figures of the product for each period (ALL, LAST_30_DAYS, LAST_60_DAYS, LAST_12_MONTHS): average, counts and the 5-to-1 star distribution. Periods are counted from the moment the product response was cached. */
  review_summaries: Array<Maybe<ProductReviewSummary>>;
  /** The list of products reviews. */
  reviews: ProductReviews;
  /** A short description of the product. Its use depends on the theme. */
  short_description?: Maybe<ComplexTextValue>;
  /** @deprecated Use the `custom_attributes` field instead. */
  skin_type?: Maybe<Scalars['Int']['output']>;
  /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
  sku?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  sm_featured?: Maybe<Scalars['Int']['output']>;
  /** The relative path to the small image, which is used on catalog pages. */
  small_image?: Maybe<ProductImage>;
  /** @deprecated Use the `custom_attributes` field instead. */
  solution_type?: Maybe<Scalars['Int']['output']>;
  /**
   * The beginning date that a product has a special price.
   * @deprecated The field should not be used on the storefront.
   */
  special_from_date?: Maybe<Scalars['String']['output']>;
  /** The discounted price of the product. */
  special_price?: Maybe<Scalars['Float']['output']>;
  /** The end date for a product with a special price. */
  special_to_date?: Maybe<Scalars['String']['output']>;
  /** The stock status of the product. */
  stock_status?: Maybe<ProductStockStatus>;
  /** @deprecated Use the `custom_attributes` field instead. */
  sunscreen_type?: Maybe<Scalars['Int']['output']>;
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
  /**
   * An array of websites in which the product is available.
   * @deprecated The field should not be used on the storefront.
   */
  websites?: Maybe<Array<Maybe<Website>>>;
  /** The weight of the item, in units defined by the store. */
  weight?: Maybe<Scalars['Float']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  youtube_video_url?: Maybe<Scalars['String']['output']>;
};


/** Defines a simple product, which is tangible and is usually sold in single units or in fixed quantities. */
export type SimpleProductCustom_AttributesV2Args = {
  filters?: InputMaybe<AttributeFilterInput>;
};


/** Defines a simple product, which is tangible and is usually sold in single units or in fixed quantities. */
export type SimpleProductReviewsArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<ProductReviewFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<ProductReviewSortInput>;
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

/** home page configurator sort order */
export type SortOrder = {
  __typename?: 'SortOrder';
  id?: Maybe<Scalars['Int']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  layoutId?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
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

export type SortingData = {
  __typename?: 'SortingData';
  code?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
};

export type States = {
  __typename?: 'States';
  code?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  region_id?: Maybe<Scalars['String']['output']>;
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
  /** Configuration data from checkout/cart/cart_merge_preference */
  cart_merge_preference: Scalars['String']['output'];
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
  /** Configuration data from tax/display/type */
  display_product_prices_in_catalog: Scalars['Int']['output'];
  /** Configuration data from tax/display/shipping */
  display_shipping_prices: Scalars['Int']['output'];
  /** Extended Config Data - general/region/display_all */
  display_state_if_optional?: Maybe<Scalars['Boolean']['output']>;
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
  /** Configuration data from customer/account_information/graphql_share_customer_group */
  graphql_share_customer_group?: Maybe<Scalars['Boolean']['output']>;
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
  /** Corresponds to the 'Display Prices On Product View Page' field in the Admin. It indicates how FPT information is displayed on product pages. */
  product_fixed_product_tax_display_setting?: Maybe<FixedProductTaxDisplaySettings>;
  /** Indicates whether product reviews are enabled. Possible values: 1 (Yes) and 0 (No). */
  product_reviews_enabled?: Maybe<Scalars['String']['output']>;
  /** The suffix applied to product pages, such as `.htm` or `.html`. */
  product_url_suffix?: Maybe<Scalars['String']['output']>;
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
  /** Email to a Friend configuration. */
  send_friend?: Maybe<SendFriendConfiguration>;
  /** Configuration data from promo/graphql/share_applied_cart_rule */
  share_applied_cart_rule?: Maybe<Scalars['Boolean']['output']>;
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
  /** The time zone of the store. */
  timezone?: Maybe<Scalars['String']['output']>;
  /** A prefix that appears before the title to create a two- or three-part title. */
  title_prefix?: Maybe<Scalars['String']['output']>;
  /** The character that separates the category name and subcategory in the browser title bar. */
  title_separator?: Maybe<Scalars['String']['output']>;
  /** A suffix that appears after the title to create a two- or three-part title. */
  title_suffix?: Maybe<Scalars['String']['output']>;
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

export type StoreData = {
  __typename?: 'StoreData';
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  stores?: Maybe<Array<Maybe<StoreDataStores>>>;
};

export type StoreDataStores = {
  __typename?: 'StoreDataStores';
  code?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** One store of the Locations page */
export type StoreLocationItem = {
  __typename?: 'StoreLocationItem';
  /** Address lines, one entry per row */
  address: Array<Maybe<Scalars['String']['output']>>;
  /** Line under the name, e.g. Banani, Dhaka */
  area: Scalars['String']['output'];
  /** Weekdays the store is closed, 0 = Sunday to 6 = Saturday. Empty list when open every day. */
  closed_days?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  /** Closing time HH:MM, 24 hours */
  closes: Scalars['String']['output'];
  /** Link of the Get directions button */
  directions_url: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  /** Opening hours as text, shown as written */
  hours: Scalars['String']['output'];
  /** Slug of the store, e.g. banani */
  id: Scalars['ID']['output'];
  /** Full URL of the store photo */
  image: Scalars['String']['output'];
  /** Optional line under the address, e.g. Opposite Fakruddin Restaurant */
  landmark?: Maybe<Scalars['String']['output']>;
  /** Google Maps embed address for the iframe src */
  map_embed_url: Scalars['String']['output'];
  name: Scalars['String']['output'];
  /** Opening time HH:MM, 24 hours, for the Open now badge */
  opens: Scalars['String']['output'];
  phone: Scalars['String']['output'];
};

/** The Locations page, managed in Admin > Webkul BS Theme > Store Locations and Locations Page Settings */
export type StoreLocationsPage = {
  __typename?: 'StoreLocationsPage';
  /** Stores shown on the page, in admin sort order. Empty list = no store. */
  stores: Array<Maybe<StoreLocationItem>>;
  /** Text under the heading */
  subtitle?: Maybe<Scalars['String']['output']>;
  /** Page heading */
  title: Scalars['String']['output'];
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

export type SuggestProduct = {
  __typename?: 'SuggestProduct';
  hasSpecialPrice?: Maybe<Scalars['Boolean']['output']>;
  price?: Maybe<Scalars['String']['output']>;
  productId?: Maybe<Scalars['String']['output']>;
  productName?: Maybe<Scalars['String']['output']>;
  specialPrice?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
};

export type SuggestProductArray = {
  __typename?: 'SuggestProductArray';
  products?: Maybe<Array<Maybe<SuggestProduct>>>;
  tags?: Maybe<Array<Maybe<Suggestionproducttags>>>;
};

export type Suggestionproducttags = {
  __typename?: 'Suggestionproducttags';
  count?: Maybe<Scalars['Int']['output']>;
  label?: Maybe<Scalars['String']['output']>;
};

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

export type TermList = {
  __typename?: 'TermList';
  ratio?: Maybe<Scalars['Int']['output']>;
  term?: Maybe<Scalars['String']['output']>;
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

export type TrackingData = {
  __typename?: 'TrackingData';
  carrier?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type UpdateCart = {
  __typename?: 'UpdateCart';
  cartCount?: Maybe<Scalars['Int']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
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

export type UpdateItemOptions = {
  __typename?: 'UpdateItemOptions';
  cartCount?: Maybe<Scalars['Int']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/** Contains the customer's wish list and any errors encountered. */
export type UpdateProductsInWishlistOutput = {
  __typename?: 'UpdateProductsInWishlistOutput';
  /** An array of errors encountered while updating products in a wish list. */
  user_errors: Array<Maybe<WishListUserInputError>>;
  /** Contains the wish list with all items that were successfully updated. */
  wishlist: Wishlist;
};

export type UploadBannerPic = {
  __typename?: 'UploadBannerPic';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type UpsellProductList = {
  __typename?: 'UpsellProductList';
  message?: Maybe<Scalars['String']['output']>;
  productList?: Maybe<Array<Maybe<OneProductList>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
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
  /** @deprecated Use the `custom_attributes` field instead. */
  as_featured?: Maybe<Scalars['String']['output']>;
  /**
   * The attribute set assigned to the product.
   * @deprecated The field should not be used on the storefront.
   */
  attribute_set_id?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  brand_name?: Maybe<Scalars['Int']['output']>;
  /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled. */
  canonical_url?: Maybe<Scalars['String']['output']>;
  /** The categories assigned to a product. */
  categories?: Maybe<Array<Maybe<CategoryInterface>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  celimax?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  color?: Maybe<Scalars['Int']['output']>;
  /** The product's country of origin. */
  country_of_manufacture?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  cream_type?: Maybe<Scalars['Int']['output']>;
  /**
   * Timestamp indicating when the product was created.
   * @deprecated The field should not be used on the storefront.
   */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Crosssell Products */
  crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** Product custom attributes. */
  custom_attributesV2?: Maybe<ProductCustomAttributes>;
  /** @deprecated Use the `custom_attributes` field instead. */
  custom_tabs?: Maybe<Scalars['String']['output']>;
  /** Detailed information about the product. The value can include simple HTML tags. */
  description?: Maybe<ComplexTextValue>;
  /** @deprecated Use the `custom_attributes` field instead. */
  detail_sidebar?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  expire_date?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  extended_notes?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_age_group?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_age_range?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_baby_food_stage?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_brand?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_capacity?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_color?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_compatible_devices?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_decor_style?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_digital_zoom?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_display_technology?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_finish?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_gemstone?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_gender?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_health_concern?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_ingredients?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_is_assembly_required?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_material?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_maximum_weight?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_megapixels?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_minimum_weight?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_model?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_number_of_licenses?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_operating_system?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_optical_zoom?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_package_quantity?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_pattern?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_depth?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_form?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_height?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_length?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_weight?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_product_width?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_recommended_use?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_resolution?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_scent?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_screen_size?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_shoe_width?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_size?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_storage_capacity?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_style?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_system_requirements?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_thread_count?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  facebook_video_game_platform?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  featured?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  food_type?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  gender?: Maybe<Scalars['Int']['output']>;
  /** Returns a value indicating gift message availability for the product. */
  gift_message_available: Scalars['Boolean']['output'];
  /** @deprecated Use the `custom_attributes` field instead. */
  glass_type?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  hair_type?: Maybe<Scalars['Int']['output']>;
  /**
   * The ID number assigned to the product.
   * @deprecated Use the `uid` field instead.
   */
  id?: Maybe<Scalars['Int']['output']>;
  /** The relative path to the main image on the product page. */
  image?: Maybe<ProductImage>;
  /** @deprecated Use the `custom_attributes` field instead. */
  lens_type?: Maybe<Scalars['Int']['output']>;
  /** The Live stock popup: availability per place (the attributes of the attribute group Custom Stock - today Online Stock). */
  live_stock?: Maybe<Array<Maybe<ProductSourceStock>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  manufacture_date?: Maybe<Scalars['String']['output']>;
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
  /** Remaining stock if it is below the value assigned to the Only X Left Threshold option in the Admin. */
  only_x_left_in_stock?: Maybe<Scalars['Float']['output']>;
  /** An array of options for a customizable product. */
  options?: Maybe<Array<Maybe<CustomizableOptionInterface>>>;
  /** If the product has multiple options, determines where they appear on the product page. */
  options_container?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  perfume_type?: Maybe<Scalars['Int']['output']>;
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
  /** @deprecated Use the `custom_attributes` field instead. */
  product_series?: Maybe<Scalars['Int']['output']>;
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
  /** Rating figures of the product for each period (ALL, LAST_30_DAYS, LAST_60_DAYS, LAST_12_MONTHS): average, counts and the 5-to-1 star distribution. Periods are counted from the moment the product response was cached. */
  review_summaries: Array<Maybe<ProductReviewSummary>>;
  /** The list of products reviews. */
  reviews: ProductReviews;
  /** A short description of the product. Its use depends on the theme. */
  short_description?: Maybe<ComplexTextValue>;
  /** @deprecated Use the `custom_attributes` field instead. */
  skin_type?: Maybe<Scalars['Int']['output']>;
  /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
  sku?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  sm_featured?: Maybe<Scalars['Int']['output']>;
  /** The relative path to the small image, which is used on catalog pages. */
  small_image?: Maybe<ProductImage>;
  /** @deprecated Use the `custom_attributes` field instead. */
  solution_type?: Maybe<Scalars['Int']['output']>;
  /**
   * The beginning date that a product has a special price.
   * @deprecated The field should not be used on the storefront.
   */
  special_from_date?: Maybe<Scalars['String']['output']>;
  /** The discounted price of the product. */
  special_price?: Maybe<Scalars['Float']['output']>;
  /** The end date for a product with a special price. */
  special_to_date?: Maybe<Scalars['String']['output']>;
  /** The stock status of the product. */
  stock_status?: Maybe<ProductStockStatus>;
  /** @deprecated Use the `custom_attributes` field instead. */
  sunscreen_type?: Maybe<Scalars['Int']['output']>;
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
  /**
   * An array of websites in which the product is available.
   * @deprecated The field should not be used on the storefront.
   */
  websites?: Maybe<Array<Maybe<Website>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  youtube_video_url?: Maybe<Scalars['String']['output']>;
};


/** Defines a virtual product, which is a non-tangible product that does not require shipping and is not kept in inventory. */
export type VirtualProductCustom_AttributesV2Args = {
  filters?: InputMaybe<AttributeFilterInput>;
};


/** Defines a virtual product, which is a non-tangible product that does not require shipping and is not kept in inventory. */
export type VirtualProductReviewsArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<ProductReviewFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<ProductReviewSortInput>;
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

export type WalkThrough = {
  __typename?: 'WalkThrough';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  walkthroughData?: Maybe<Array<Maybe<WalkThroughData>>>;
  walkthroughVersion?: Maybe<Scalars['Float']['output']>;
};

export type WalkThroughData = {
  __typename?: 'WalkThroughData';
  colorCode?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  imageDominantColor?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type WatchLogin = {
  __typename?: 'WatchLogin';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type WatchQr = {
  __typename?: 'WatchQr';
  message?: Maybe<Scalars['String']['output']>;
  qr_url?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
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

export type WebsiteData = {
  __typename?: 'WebsiteData';
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type WebsitesData = {
  __typename?: 'WebsitesData';
  baseUrl?: Maybe<Scalars['String']['output']>;
  defaultStoreId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
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
  RequiredParameterMissing = 'REQUIRED_PARAMETER_MISSING',
  Undefined = 'UNDEFINED'
}

export type WishlistFromCart = {
  __typename?: 'WishlistFromCart';
  cartCount?: Maybe<Scalars['Int']['output']>;
  discount?: Maybe<CartTotalData>;
  grandtotal?: Maybe<CartTotalData>;
  message?: Maybe<Scalars['String']['output']>;
  shipping?: Maybe<CartTotalData>;
  subtotal?: Maybe<CartTotalData>;
  success?: Maybe<Scalars['Boolean']['output']>;
  tax?: Maybe<CartTotalData>;
};

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
  arTextureImages?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  arType?: Maybe<Scalars['String']['output']>;
  arUrl?: Maybe<Scalars['String']['output']>;
  availability?: Maybe<Scalars['String']['output']>;
  configurableData?: Maybe<ConfigurableData>;
  description?: Maybe<Scalars['String']['output']>;
  dominantColor?: Maybe<Scalars['String']['output']>;
  entityId?: Maybe<Scalars['Int']['output']>;
  finalPrice?: Maybe<Scalars['String']['output']>;
  formattedFinalPrice?: Maybe<Scalars['String']['output']>;
  formattedMaxPrice?: Maybe<Scalars['String']['output']>;
  formattedMinPrice?: Maybe<Scalars['String']['output']>;
  formattedPrice?: Maybe<Scalars['String']['output']>;
  formattedTierPrice?: Maybe<Scalars['String']['output']>;
  groupedPrice?: Maybe<Scalars['String']['output']>;
  hasRequiredOptions?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isAvailable?: Maybe<Scalars['Boolean']['output']>;
  isInRange?: Maybe<Scalars['Boolean']['output']>;
  isInWishlist?: Maybe<Scalars['Boolean']['output']>;
  isNew?: Maybe<Scalars['Boolean']['output']>;
  /** A list of items in the wish list. */
  items: Array<Maybe<WishlistItemInterface>>;
  linksPurchasedSeparately?: Maybe<Scalars['Boolean']['output']>;
  maxPrice?: Maybe<Scalars['String']['output']>;
  minAddToCartQty?: Maybe<Scalars['Int']['output']>;
  minPrice?: Maybe<Scalars['String']['output']>;
  msrpDisplayActualPriceType?: Maybe<Scalars['String']['output']>;
  msrpEnabled?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  options?: Maybe<Array<Maybe<WishlistOptions>>>;
  /** Contains pagination metadata. */
  page_info?: Maybe<SearchResultPageInfo>;
  price?: Maybe<Scalars['String']['output']>;
  priceView?: Maybe<Scalars['String']['output']>;
  productId?: Maybe<Scalars['String']['output']>;
  qty?: Maybe<Scalars['Int']['output']>;
  rating?: Maybe<Scalars['String']['output']>;
  reviewCount?: Maybe<Scalars['Int']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
  thumbNail?: Maybe<Scalars['String']['output']>;
  tierPrice?: Maybe<Scalars['String']['output']>;
  typeId?: Maybe<Scalars['String']['output']>;
  wishlistItemId?: Maybe<Scalars['Int']['output']>;
};

export type WishlistOptions = {
  __typename?: 'WishlistOptions';
  label?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
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

export type WishlistToCart = {
  __typename?: 'WishlistToCart';
  cartCount?: Maybe<Scalars['Int']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  productId?: Maybe<Scalars['Int']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AddToCartBundleOption = {
  id?: InputMaybe<Scalars['String']['input']>;
  qty?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type AddToCartParams = {
  bundleOption?: InputMaybe<Array<InputMaybe<AddToCartBundleOption>>>;
  links?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  options?: InputMaybe<Array<InputMaybe<AddToCartParamsOptions>>>;
  superAttribute?: InputMaybe<Array<InputMaybe<AddToCartSuperAttribute>>>;
  superGroup?: InputMaybe<Array<InputMaybe<AddToCartSuperGroup>>>;
};

export type AddToCartParamsOptions = {
  id?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type AddToCartSuperAttribute = {
  id?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type AddToCartSuperGroup = {
  id?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type CartItemData = {
  id?: InputMaybe<Scalars['String']['input']>;
  qty?: InputMaybe<Scalars['String']['input']>;
};

export type CollectionFilter = {
  code?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type CollectionSort = {
  code?: InputMaybe<Scalars['String']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
};

/** Assigns a specific `cart_id` to the empty cart. */
export type CreateEmptyCartInput = {
  /** The ID to assign to the cart. */
  cart_id?: InputMaybe<Scalars['String']['input']>;
};

export type NewAddressInput = {
  address_title?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  company?: InputMaybe<Scalars['String']['input']>;
  country_id?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fax?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  postcode?: InputMaybe<Scalars['String']['input']>;
  prefix?: InputMaybe<Scalars['String']['input']>;
  region?: InputMaybe<Scalars['String']['input']>;
  region_id?: InputMaybe<Scalars['String']['input']>;
  saveInAddressBook?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  suffix?: InputMaybe<Scalars['String']['input']>;
  telephone?: InputMaybe<Scalars['String']['input']>;
};

export type ReviewRatings = {
  optionId?: InputMaybe<Scalars['Int']['input']>;
  ratingId?: InputMaybe<Scalars['Int']['input']>;
};

export type SaveAddressDataInput = {
  address_title?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  company?: InputMaybe<Scalars['String']['input']>;
  country_id?: InputMaybe<Scalars['String']['input']>;
  default_billing?: InputMaybe<Scalars['String']['input']>;
  default_shipping?: InputMaybe<Scalars['String']['input']>;
  fax?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  postcode?: InputMaybe<Scalars['String']['input']>;
  prefix?: InputMaybe<Scalars['String']['input']>;
  region?: InputMaybe<Scalars['String']['input']>;
  region_id?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  suffix?: InputMaybe<Scalars['String']['input']>;
  telephone?: InputMaybe<Scalars['String']['input']>;
};

export type ShippingDataInput = {
  addressId?: InputMaybe<Scalars['String']['input']>;
  newAddress?: InputMaybe<NewAddressInput>;
  sameAsShipping?: InputMaybe<Scalars['String']['input']>;
};
