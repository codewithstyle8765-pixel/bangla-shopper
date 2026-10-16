import { gql } from "@apollo/client";

/** Home page API: hero template + banners and the category / concern tiles, managed in Magento admin. */
export const HOME_PAGE_QUERY = gql`
  query HomePage {
    homePage {
      hero_layout
      hero_slides { image mobile_image alt link }
      hero_grid_main_banners { image mobile_image alt link }
      hero_grid_side_banners { image mobile_image alt link }
      category_layout
      shop_by_category { name image link }
      popular_categories { name image link }
      shop_by_concern { name image link }
      sort_order { section_id sort_order }
    }
  }
`;
