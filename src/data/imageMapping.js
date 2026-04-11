// ─── IMAGE MAPPING ──────────────────────────────────────────────
// Maps product IDs to their local image assets.
// Each product can have multiple images (different angles).
// Images are stored in assets/images/ with UUID filenames.
//
// In React Native, local images must use require() which is
// resolved at bundle time. This file centralizes all require()
// calls so the rest of the app can simply reference product IDs.
// ────────────────────────────────────────────────────────────────

// ═══════════════════════════════════════════════════════════════
// OFFICE CHAIRS (c10)
// ═══════════════════════════════════════════════════════════════

const OFFICE_CHAIR_IMAGES = {
  // Executive Boss Chair - Leather with Wooden Arms
  p71: [
    require('../../assets/images/0075162f-58ec-4b5e-8b9e-c88b38c4dfd3.jpg'),
    require('../../assets/images/018b7d4c-c2a6-4dab-babf-d9a5afdc123d.jpg'),
    require('../../assets/images/024bd2bb-866e-460c-bedf-ec37650ab085.jpg'),
    require('../../assets/images/0253e216-869f-45f2-920a-5a0acdbd767c.jpg'),
  ],

  // Ergonomic Mesh Chair (full mesh back, headrest, butterfly lumbar)
  p72: [
    require('../../assets/images/02d07c0b-2c58-4ebc-b2ed-d5b8d4290d78.jpg'),
    require('../../assets/images/02fff6bb-6549-4bb1-a592-6a716b2ea4fe.jpg'),
    require('../../assets/images/03084291-4ff1-45cb-9f3f-1af85a234453.jpg'),
    require('../../assets/images/03252296-de90-46cd-8d92-5ad87c89b096.jpg'),
  ],

  // Staff/Task Chair - Mid Back (orange/fabric)
  p73: [
    require('../../assets/images/04160236-e73c-49c7-aa02-f309b5871e05.jpg'),
    require('../../assets/images/042883e9-2e60-443a-919b-cf79ef236b3b.jpg'),
    require('../../assets/images/04592da4-9d1d-4ee1-9245-a292fa958fe5.jpg'),
    require('../../assets/images/807ee013-4251-42cb-994d-7e88f314a5f0.jpg'),
  ],

  // Visitor Chair - Mesh Back (black sled base)
  p74: [
    require('../../assets/images/05cc4d28-f7b5-49f5-a728-122f066269c2.jpg'),
    require('../../assets/images/069b4a5f-8c33-4222-99a1-2f3f57d42543.jpg'),
    require('../../assets/images/0725592b-ea44-46b6-8ec8-10058848ed67.jpg'),
    require('../../assets/images/3d28af51-2c21-44e9-9af1-58123679e476.jpg'),
  ],

  // Conference Chair - Mesh with Armrests (chrome legs)
  p75: [
    require('../../assets/images/09d4b818-cd2f-4f97-a18d-f703f0152c3d.jpg'),
    require('../../assets/images/09fb7baf-5042-4eb1-810f-f34dfba1ee31.jpg'),
    require('../../assets/images/0a5a108e-4d7c-458c-8137-269ec44b1d3d.jpg'),
    require('../../assets/images/0a800f31-b10c-4925-9d47-ca7e28abbb81.jpg'),
  ],

  // Reception/Waiting Chair (fabric, chrome legs)
  p76: [
    require('../../assets/images/12bb6674-e3de-4a16-9402-d37780b8e415.jpg'),
    require('../../assets/images/1394e49b-27cd-498d-a883-7473e7c54477.jpg'),
    require('../../assets/images/13f17e48-ed63-4af7-8ce5-40632d771293.jpg'),
    require('../../assets/images/14d46955-5106-47cf-b55f-79bdb7e94b97.jpg'),
  ],

  // Office Lounge Chair (fabric, egg-pod style)
  p77: [
    require('../../assets/images/119cc767-1d6f-46d4-baf6-df2a3a9feca8.jpg'),
    require('../../assets/images/126e3ca5-0fba-4c03-bffc-c3cf48d05ed0.jpg'),
    require('../../assets/images/1283a7e6-7049-49df-a516-b29d601e63f7.jpg'),
  ],

  // Drafting Chair - Tall (mesh back, foot ring)
  p78: [
    require('../../assets/images/0f0141fc-f5eb-4827-8d1a-9df5f80ef86f.jpg'),
    require('../../assets/images/0f5ee62d-1b51-4cc7-961b-bf312ae7b93d.jpg'),
    require('../../assets/images/112f6613-8d40-42ff-84a7-4218f879c601.jpg'),
  ],

  // Gaming Chair - Pro (racing style)
  p79: [
    require('../../assets/images/0c127ee2-205a-4123-ac79-002732debfe6.jpg'),
    require('../../assets/images/0d28c521-2e94-4acd-b8b0-24e8a2c85545.jpg'),
    require('../../assets/images/0dbe05a9-0cfc-46ac-a369-a4dbe7a48a54.jpg'),
  ],
};

// Additional Office Chair Variants (more models in the same category)
const OFFICE_CHAIR_VARIANTS = {
  // Executive Chrome-Base Leather Chair
  p71b: [
    require('../../assets/images/c382882b-99d5-4a78-9f12-2e1cee2e400a.jpg'),
    require('../../assets/images/c377c0d0-81c0-4f48-8ccf-ca3a48d5492d.jpg'),
    require('../../assets/images/cb35b4c3-1b94-4654-bbba-a68704fa7ee7.jpg'),
    require('../../assets/images/d795c7c5-fc80-4905-b193-f470c4a5ac52.jpg'),
  ],

  // Executive Reclining Chair with Footrest
  p71c: [
    require('../../assets/images/d3938201-07f9-43b3-8b39-34c58724ce79.jpg'),
    require('../../assets/images/e4549083-7041-4692-b9f6-b205a6f12220.jpg'),
    require('../../assets/images/e4b9bdf7-3d18-4249-b2d6-5dde89bb5be9.jpg'),
  ],

  // Ergonomic Mesh - Black Fabric Task Chair
  p73b: [
    require('../../assets/images/0525e11f-8d21-40da-b362-f30d593e071a.jpg'),
    require('../../assets/images/054b8825-4c46-4bac-ad84-6af6f2028ba0.jpg'),
    require('../../assets/images/d38e35e7-1a79-49bf-a6a2-74202662470c.jpg'),
  ],

  // Visitor Chair - Chrome Frame
  p74b: [
    require('../../assets/images/075ce080-fb30-4f12-993b-b8964fc4c590.jpg'),
    require('../../assets/images/093901ca-c938-4e80-909b-99ca598e1bc2.jpg'),
    require('../../assets/images/d05aa8e5-c5da-4781-ad8e-79f1d065dfb3.jpg'),
  ],
};

// ═══════════════════════════════════════════════════════════════
// OUTDOOR / ROPE CHAIRS (c7)
// ═══════════════════════════════════════════════════════════════

const OUTDOOR_IMAGES = {
  // Outdoor Rope Chair - Black Round Barrel
  p61: [
    require('../../assets/images/1581a7e5-1802-480c-b1d4-24cac39ecdab.jpg'),
    require('../../assets/images/162a5e57-00a2-4a76-af47-10087a11982d.jpg'),
    require('../../assets/images/16a69021-d20b-456c-8f1b-0c215fc4deaf.jpg'),
    require('../../assets/images/4279bb28-2994-4ce7-bc33-6fa70b5fa406.jpg'),
  ],

  // Outdoor Rope Chair - Black Woven Flat Arm
  p62: [
    require('../../assets/images/16dc5e92-9595-4025-9e09-e573ca4e29aa.jpg'),
    require('../../assets/images/17d5c233-4c40-41d9-a8f9-8df6b29c9a06.jpg'),
    require('../../assets/images/185d7b6f-d86c-4b9c-9949-f46fcf77f55b.jpg'),
    require('../../assets/images/b064e592-1430-4c3d-806d-84f79da57c99.jpg'),
  ],

  // Outdoor Rope Chair - Beige/Natural
  p63: [
    require('../../assets/images/18927fb8-6d2a-473f-9213-c481c27e7011.jpg'),
    require('../../assets/images/18ae3a3d-c12c-4346-b1c5-08fd3ef43713.jpg'),
    require('../../assets/images/196e6f13-ced7-443d-8fcb-40d4149fb14c.jpg'),
    require('../../assets/images/1bed8ceb-3bcd-495f-b6f7-1343b1c312cf.jpg'),
  ],

  // Outdoor Rope Chair - Dark Variant
  p64: [
    require('../../assets/images/4e34c35c-a85c-45d9-8e2a-9713db61f0b1.jpg'),
    require('../../assets/images/4e553a19-e163-4f63-b7d6-d7bddeab78a1.jpg'),
    require('../../assets/images/4ea1ff26-79c0-47cb-8743-330d9f9afb83.jpg'),
    require('../../assets/images/4f94c11c-c088-4460-8eab-6e9f3c392fd2.jpg'),
  ],

  // Outdoor Rope Chair - Premium
  p65: [
    require('../../assets/images/720139c4-dacb-4bf3-83b5-9e731a3f39d1.jpg'),
    require('../../assets/images/7229b807-239a-4e5d-b525-17927328b702.jpg'),
    require('../../assets/images/72ff7fcf-eabe-4489-aef4-ca28cc43483b.jpg'),
    require('../../assets/images/73656757-5b58-4fd1-8fa8-955ee55b15ad.jpg'),
  ],

  // Outdoor Chair - Mixed
  p66: [
    require('../../assets/images/9f16a961-3618-41ab-a184-69fc4a9c2e1f.jpg'),
    require('../../assets/images/a11bb1ea-588d-469e-a00f-f4d520ddc553.jpg'),
    require('../../assets/images/a4900369-4169-4862-b9a6-516c5e394d11.jpg'),
    require('../../assets/images/a6280366-77e9-4dc3-9f0c-1f78a72989c5.jpg'),
  ],
};

// ═══════════════════════════════════════════════════════════════
// DINING / ACCENT CHAIRS (c3)
// ═══════════════════════════════════════════════════════════════

const DINING_IMAGES = {
  // Dining Chair - Blue Velvet (metal tapered legs)
  p25: [
    require('../../assets/images/1992fb0c-6ca9-4445-80ac-cff7fac2f87b.jpg'),
    require('../../assets/images/19949fb0-90cf-4267-99ef-b42ba61311d2.jpg'),
    require('../../assets/images/19e05eb8-16f8-491b-b4b5-b4a4fcbe4713.jpg'),
    require('../../assets/images/509d5fed-7e16-49a1-a1d8-3fe5199f2e95.jpg'),
  ],

  // Dining Chair - Modern Shell (Eames style)
  p26: [
    require('../../assets/images/1a29e2fc-2561-4760-b8d1-6746e500631e.jpg'),
    require('../../assets/images/6ef5262b-4f22-4153-a5f9-836585f6358c.jpg'),
  ],
};

// ═══════════════════════════════════════════════════════════════
// RECEPTION / WAITING AREA (c14)
// ═══════════════════════════════════════════════════════════════

const RECEPTION_IMAGES = {
  // Waiting Area Sofa - Two-tone Leather (beige/maroon)
  p113: [
    require('../../assets/images/f115a9ab-194e-4dd5-8800-f5a4662adaea.jpg'),
    require('../../assets/images/f1781f38-27d1-45c4-81e7-1a6c5e316f9c.jpg'),
    require('../../assets/images/f23b1270-7110-4a9b-b938-10f345bf2ff7.jpg'),
    require('../../assets/images/f27bdbec-d1dc-4a20-b5fb-abefb48b1caa.jpg'),
  ],

  // Waiting Area Sofa 3 seater
  p114: [
    require('../../assets/images/b5c933b9-80b5-424b-9545-ac28c32b626a.jpg'),
    require('../../assets/images/b66457bd-5244-4495-a6d2-cfb50befac8d.jpg'),
    require('../../assets/images/b71fb8a0-7e64-4789-859f-2202ebad3916.jpg'),
  ],
};

// ═══════════════════════════════════════════════════════════════
// LIVING ROOM - Tables (c1)
// ═══════════════════════════════════════════════════════════════

const LIVING_ROOM_IMAGES = {
  // Round Side Table - Wood Top, Metal Base
  p10: [
    require('../../assets/images/ffbc7e64-5b98-42c1-8c8d-0d518a53ab5f.jpg'),
    require('../../assets/images/ffb2038e-12aa-4bbb-b84d-b68e5966ca63.jpg'),
  ],
};

// ═══════════════════════════════════════════════════════════════
// CONFERENCE / MEETING (c12)
// ═══════════════════════════════════════════════════════════════

const CONFERENCE_IMAGES = {
  // Conference Chair Set
  p96: [
    require('../../assets/images/92757f4a-54bb-4ce4-a43b-12b38f41b6d6.jpg'),
    require('../../assets/images/9291db63-bcff-42ed-8994-873c613d6d3a.jpg'),
    require('../../assets/images/92d4fb87-4a57-4a72-9a0b-5a1380d76056.jpg'),
  ],
};

// ═══════════════════════════════════════════════════════════════
// ADDITIONAL PRODUCT VARIATIONS
// These are extra photo sets for new products to be added
// ═══════════════════════════════════════════════════════════════

const EXTRA_PRODUCT_IMAGES = {
  // Additional executive chairs
  extra1: [
    require('../../assets/images/80f9afe0-8a2c-4648-a84c-8e47607be629.jpg'),
    require('../../assets/images/814b2a93-b4c8-41f3-b9cc-0a4a88ff97f7.jpg'),
    require('../../assets/images/821c7e15-58c7-465d-b279-8c0bc81abce2.jpg'),
    require('../../assets/images/83bb415b-4160-4106-89b6-610f43b79103.jpg'),
  ],
  extra2: [
    require('../../assets/images/8fe246a4-c57c-4868-a325-294804dc58dd.jpg'),
    require('../../assets/images/901e657a-44d6-4f76-b37b-189ac87e735f.jpg'),
    require('../../assets/images/90be031c-b3fc-405e-9863-c90365c757ba.jpg'),
    require('../../assets/images/917b2a4f-4e42-456f-b1f9-c73fe69c5ffc.jpg'),
  ],
  // Additional mesh chairs
  extra3: [
    require('../../assets/images/3dbe3643-610b-4bfb-9401-c2ed28463726.jpg'),
    require('../../assets/images/3ed48f4e-3fc1-4e74-aaf3-6ca3425ee9d2.jpg'),
    require('../../assets/images/40441658-ae51-41c6-9d2f-7dc7a4725567.jpg'),
    require('../../assets/images/40fd33f0-538a-47e7-b0a4-b34340665b08.jpg'),
  ],
  extra4: [
    require('../../assets/images/8cbcb484-0e2e-42fb-a2a5-74fe133f2fa9.jpg'),
    require('../../assets/images/8e59c780-17be-4da3-9e23-0a9a8d241fab.jpg'),
    require('../../assets/images/8f53c599-1079-45f1-b289-87aabfee936b.jpg'),
    require('../../assets/images/8f602d20-4d03-4b25-8a90-75f7535d127d.jpg'),
  ],
  // Additional task chairs
  extra5: [
    require('../../assets/images/41e5e87b-3d6e-40d5-b34f-8680281bcaa3.jpg'),
    require('../../assets/images/4289e1b1-4ffc-4288-8481-656816029386.jpg'),
    require('../../assets/images/44b23b32-c91c-4584-a7b3-4edd6f03e299.jpg'),
    require('../../assets/images/455e3d38-8963-444a-a90c-1198ab3c7eab.jpg'),
  ],
  extra6: [
    require('../../assets/images/770d37a2-70e8-4d2e-847f-58e6d1de0fa2.jpg'),
    require('../../assets/images/786b50fc-0890-48fc-880b-e5a35e96b507.jpg'),
    require('../../assets/images/787fe48b-b33c-4e48-ad0d-376b99b573bb.jpg'),
    require('../../assets/images/7d0a8608-640c-42fa-b607-382c916b3cfc.jpg'),
  ],
  // Additional visitor chairs
  extra7: [
    require('../../assets/images/46fdacaf-efab-492a-ae7f-87d26d58b24a.jpg'),
    require('../../assets/images/47407ef5-6f64-445c-91d1-5c00e54a8671.jpg'),
    require('../../assets/images/480248a7-0d06-4f03-a32a-ab55f7d3d3f2.jpg'),
    require('../../assets/images/48435925-1fb2-4297-8480-804491ad76fd.jpg'),
  ],
  extra8: [
    require('../../assets/images/736aa6ea-6cad-4182-8140-d92e19157a06.jpg'),
    require('../../assets/images/74f2252e-789f-4aa2-9c26-0e54cd799f34.jpg'),
    require('../../assets/images/7592d03d-1d28-4f6e-a566-4c9dfc633a1f.jpg'),
    require('../../assets/images/76492c52-0f69-4986-b057-174aa3a6a01a.jpg'),
  ],
  // Additional conference chairs
  extra9: [
    require('../../assets/images/49dfc8c5-6bd4-4f7d-9900-64b9dd3a6805.jpg'),
    require('../../assets/images/4c56bbd4-6b32-4031-8893-72fcf3e0ea0c.jpg'),
    require('../../assets/images/4d913760-5182-4131-b610-b610bedd2c0d.jpg'),
    require('../../assets/images/4d9dfc1c-1b92-482c-8972-72548218213d.jpg'),
  ],
  extra10: [
    require('../../assets/images/7d537430-4d8b-407e-8a91-d31e2122dc14.jpg'),
    require('../../assets/images/7d59f9e7-a489-45cc-818c-07b8ee1ecb81.jpg'),
    require('../../assets/images/7dbfe240-c3c4-44ae-a342-c5613b445684.jpg'),
    require('../../assets/images/803d0497-da9a-4585-80ee-062126e668cf.jpg'),
  ],
  // More lounge/reception
  extra11: [
    require('../../assets/images/4fb19aef-3008-4200-b22a-d218fe99e914.jpg'),
    require('../../assets/images/5116379b-3bd5-40ca-a983-65a24531329c.jpg'),
    require('../../assets/images/519a0fa5-d6f3-41c1-b7c2-889e3ca19569.jpg'),
    require('../../assets/images/51ae943b-8c98-4321-be87-acae44fa4e4f.jpg'),
  ],
  extra12: [
    require('../../assets/images/51c8c02e-7de9-4e47-9229-0fc3a28c1525.jpg'),
  ],
  extra13: [
  ],
  extra14: [
  ],
  extra15: [
    require('../../assets/images/6435f813-6fb2-4eb3-bedb-9ed6bfc49c09.jpg'),
    require('../../assets/images/65aac50c-d87f-42c3-8aad-5178b40dc48d.jpg'),
    require('../../assets/images/68912e31-c5b6-4a6e-931f-6da73e2a21ba.jpg'),
    require('../../assets/images/69542cb3-b959-42dc-93d8-37fb00a461e5.jpg'),
  ],
  extra16: [
    require('../../assets/images/6b19ba3f-43c5-4136-82a0-1155a46958b2.jpg'),
    require('../../assets/images/6c7fb021-12c2-45f0-8288-ae451d97c7d7.jpg'),
    require('../../assets/images/6cc03d1c-9d7f-4987-9c7b-c21558ff73ab.jpg'),
    require('../../assets/images/6f4cb84b-e4ff-4e6b-83d7-029c8c10b8f6.jpg'),
  ],
  extra17: [
    require('../../assets/images/85a004a4-2c01-47b9-a6b8-ca22aeaba29f.jpg'),
    require('../../assets/images/86042921-3a34-4f84-bd94-17d4fb035630.jpg'),
    require('../../assets/images/86056b99-0912-49c7-8efe-2ddc4176929c.jpg'),
    require('../../assets/images/86394a02-f776-403d-b70e-4db4ebf37841.jpg'),
  ],
  extra18: [
    require('../../assets/images/866f199b-e30b-4240-a9de-0427566d32d2.jpg'),
    require('../../assets/images/87ff1e15-4487-4aef-a8b3-0242d5c528f0.jpg'),
    require('../../assets/images/889d3946-4801-4244-b470-16a7c3c0d135.jpg'),
    require('../../assets/images/893b2834-db1e-4773-9dd8-a34d845b3aa2.jpg'),
  ],
  extra19: [
    require('../../assets/images/95821412-9c3c-4070-bbd8-b6f1c6ef2e05.jpg'),
    require('../../assets/images/98c6446c-cc75-42ee-a573-205e3fe54874.jpg'),
    require('../../assets/images/99c8d012-28ac-4e5e-b73f-9485d5b60136.jpg'),
    require('../../assets/images/9ae0a0e7-fab1-4e7e-82f7-fbb01943bb44.jpg'),
  ],
  // Dining chair extras
  extra20: [
    require('../../assets/images/adf2542f-5ed6-4460-b8e6-885e94385b30.jpg'),
    require('../../assets/images/ae8ab8cb-b44e-4cc5-99aa-f6dbd8b1cadf.jpg'),
    require('../../assets/images/aea7adeb-83a4-4944-a166-a705bb904b0b.jpg'),
    require('../../assets/images/aeebc315-0222-46db-9e22-838630a838c8.jpg'),
  ],
  // More executive
  extra21: [
    require('../../assets/images/af5228e3-8956-4e3f-b7c0-79f33e87a804.jpg'),
    require('../../assets/images/af52872d-2b52-4619-ba85-2691d4eb61e4.jpg'),
    require('../../assets/images/b0a9b331-af86-4440-8b4b-b23332c8c74d.jpg'),
    require('../../assets/images/b0ce03cb-dd20-4224-8f5f-2a65a36e91bb.jpg'),
  ],
  extra22: [
    require('../../assets/images/b0f324a5-05c8-4a84-8dc5-af7eda5d649d.jpg'),
    require('../../assets/images/b1be8b02-2bdd-43f3-b607-7d248810ef79.jpg'),
    require('../../assets/images/b27c6b50-5df2-4ebe-a8c6-a67974fb6fc4.jpg'),
    require('../../assets/images/b3e8e3f0-b89a-47dd-85f8-580a6fcca692.jpg'),
  ],
  extra23: [
    require('../../assets/images/b43b1ff7-e186-4818-9fd6-bfb13bcc0017.jpg'),
    require('../../assets/images/b4af6f10-ec4c-4a3f-a9c3-acf5ce50b30e.jpg'),
    require('../../assets/images/b597fce4-d0cf-4f24-b09a-472d69f94af5.jpg'),
    require('../../assets/images/b5ac972a-f586-45a8-a4be-367239135b97.jpg'),
  ],
  extra24: [
    require('../../assets/images/b7f3071e-fc7a-4e95-a8ff-ab48a080d28c.jpg'),
    require('../../assets/images/b8eebe45-30bb-4487-9c7a-ca038e8089ea.jpg'),
    require('../../assets/images/ba534693-2973-4143-8d7d-d51a9374db03.jpg'),
    require('../../assets/images/ba89368b-5103-4c7d-9cde-1411030f695d.jpg'),
  ],
  extra25: [
    require('../../assets/images/bb139b40-376f-4c00-85a1-511749096ac4.jpg'),
    require('../../assets/images/bc423b56-fb54-4638-8b13-8c147a0ea63d.jpg'),
    require('../../assets/images/bc717cf0-f354-45a7-8b19-39fcba4728c2.jpg'),
    require('../../assets/images/bcb457b4-16c5-4dca-b148-89e4f42afc55.jpg'),
  ],
  extra26: [
    require('../../assets/images/bdb58d27-ce1a-4b6b-9e8a-2746d56a4eed.jpg'),
    require('../../assets/images/bdcb3b7d-9e2c-4ad0-8336-39a0876c1322.jpg'),
    require('../../assets/images/be2e981c-c395-4967-a1df-78353786507e.jpg'),
    require('../../assets/images/c0687678-84e5-46fc-a90c-bcd2f8df8582.jpg'),
  ],
  extra27: [
    require('../../assets/images/c0f7d673-c835-474d-b88a-f032fc7beace.jpg'),
    require('../../assets/images/c14a868a-1c50-4d62-b5fc-f1517316c059.jpg'),
    require('../../assets/images/c188f4c7-de0d-491b-adcc-099ef92f3944.jpg'),
    require('../../assets/images/c1bbef89-3c59-48b4-8675-6973af186636.jpg'),
  ],
  extra28: [
    require('../../assets/images/c3d13287-bfe9-4509-977e-0f3f4551e286.jpg'),
    require('../../assets/images/c44f5fdb-4d7c-43da-b37c-6e717d50f73e.jpg'),
    require('../../assets/images/c5fc5563-a2db-4964-9360-9716eafd2a7d.jpg'),
    require('../../assets/images/c6b971d9-290f-4ae8-a832-1fb8e0625593.jpg'),
  ],
  extra29: [
    require('../../assets/images/c6db903f-5372-4fd8-bbba-289b6aef165d.jpg'),
    require('../../assets/images/c8770689-abea-4f7c-a5dd-59619cd81dd1.jpg'),
    require('../../assets/images/c88cecd3-6b4e-47e4-b431-80e8f565896d.jpg'),
    require('../../assets/images/c8ef70c3-7e1f-40cc-aac2-626ceeb5c58e.jpg'),
  ],
  extra30: [
    require('../../assets/images/c950e0ee-ad0f-43e6-9741-fcdbbb21602d.jpg'),
    require('../../assets/images/c9c2e892-4008-4a38-8d5b-12f2273be41f.jpg'),
    require('../../assets/images/c9c8368a-a100-4d41-9843-441d71534e80.jpg'),
    require('../../assets/images/ca45ed2d-c136-4e49-bb2c-eed34490ebe6.jpg'),
  ],
  extra31: [
    require('../../assets/images/cbfe24b7-b577-421a-bec3-2283dc343092.jpg'),
    require('../../assets/images/cc1f22da-c7f2-45df-8905-ec45ebbfa379.jpg'),
    require('../../assets/images/cfa9038a-5c37-4b2a-b2dc-45b536d792a8.jpg'),
    require('../../assets/images/d0c32154-cd59-4dd8-a687-82a3f798258b.jpg'),
  ],
  extra32: [
    require('../../assets/images/d13be164-1ff1-4bec-9300-84633aea6c2e.jpg'),
    require('../../assets/images/d195ab9a-2f29-48bd-8435-d042a7a95886.jpg'),
    require('../../assets/images/d27b421f-9f2c-44eb-9f48-c66bf93928f9.jpg'),
    require('../../assets/images/d2ce5704-8972-47c6-b033-ec253499b22d.jpg'),
  ],
  extra33: [
    require('../../assets/images/d55b44ba-ecbb-470a-b97e-b4ac1194d1bf.jpg'),
    require('../../assets/images/d72ae3f7-5880-422d-9330-01ceb5108753.jpg'),
    require('../../assets/images/d8332ed4-7c7d-4771-b6ed-3b863446dea2.jpg'),
    require('../../assets/images/d8f2a238-a943-4846-b9bb-678b6f9dedda.jpg'),
  ],
  extra34: [
    require('../../assets/images/da2ac723-8d8b-4af1-b633-9309afeef156.jpg'),
    require('../../assets/images/db697fbb-49c6-4099-ac47-0ad911a37a56.jpg'),
    require('../../assets/images/db808d18-bce1-42b3-ba35-9505a512118d.jpg'),
    require('../../assets/images/dc545831-6017-4576-b724-8c46421dcbd8.jpg'),
  ],
  extra35: [
    require('../../assets/images/dc679aa0-3908-4e5d-bfb4-fb6c647b5eb4.jpg'),
    require('../../assets/images/dcea7543-c729-48b5-8389-27b6907c26e3.jpg'),
    require('../../assets/images/de38a84a-bdae-4f6c-a9a1-c365383b48d0.jpg'),
    require('../../assets/images/de4332bf-6eeb-4a8d-ab0c-ca6f525a343c.jpg'),
  ],
  extra36: [
    require('../../assets/images/dea90898-cc93-456d-9422-c697b2e3e7ad.jpg'),
    require('../../assets/images/e1b1595a-fe54-4e1e-ad19-97111eec7223.jpg'),
    require('../../assets/images/e207555f-05ce-4df9-920c-3219b45d7f70.jpg'),
    require('../../assets/images/e255fe73-5fd1-4718-a3b9-09a7203b8f75.jpg'),
  ],
  extra37: [
    require('../../assets/images/e2c75663-a9c5-4c84-82e1-f036cc104d4b.jpg'),
    require('../../assets/images/e2f47fff-f3c0-4677-a6e4-7ef188dae2f1.jpg'),
    require('../../assets/images/e335f6d5-2883-46bc-98f8-6d064c1c164f.jpg'),
    require('../../assets/images/e33d5f7f-c70a-4fa8-8e68-068ebe6607ad.jpg'),
  ],
  extra38: [
    require('../../assets/images/e399dc54-fea8-4852-b28b-05a9baacc2c4.jpg'),
    require('../../assets/images/e3bde0ee-58ba-4f51-9ef9-5684243763e0.jpg'),
    require('../../assets/images/e3d79153-2d70-4a93-8880-6643e173c7c8.jpg'),
    require('../../assets/images/e5c7eca4-1d67-4993-b50a-4df7c97431d4.jpg'),
  ],
  extra39: [
    require('../../assets/images/e633ba8f-3d36-498a-a3b4-aea828190cfc.jpg'),
    require('../../assets/images/e63a0d09-171e-4c60-b8ba-271a77e33b51.jpg'),
    require('../../assets/images/e82cfa67-df8b-4275-8cf1-e5a02d0f83d5.jpg'),
    require('../../assets/images/e9378367-56ee-44ea-945c-0477855d122b.jpg'),
  ],
  extra40: [
    require('../../assets/images/e9b92089-a71b-4c0f-b0e0-dfa7bf3cf944.jpg'),
    require('../../assets/images/e9e3c5ec-9a2e-4fe2-876e-7fda20160bd2.jpg'),
    require('../../assets/images/eb37cd4f-86a9-4e36-8994-a07215bef5f6.jpg'),
    require('../../assets/images/eb43db6c-ac4f-4512-beba-538e10d7365f.jpg'),
  ],
  extra41: [
    require('../../assets/images/eb4d86a2-7088-4665-b1c9-dc258ebd0ac1.jpg'),
    require('../../assets/images/eba60c3c-2bd6-4e72-978f-1b7593598cf1.jpg'),
    require('../../assets/images/ebc5e063-478e-4e40-b92f-d3cc2f343a09.jpg'),
    require('../../assets/images/ec0eb0d6-7555-4cc0-9576-4f3544cbd9a7.jpg'),
  ],
  extra42: [
    require('../../assets/images/ec8a3234-68a6-4844-8edd-d68ce4f096c1.jpg'),
    require('../../assets/images/ee601d51-e259-4d75-8aec-5c2a55995a0f.jpg'),
    require('../../assets/images/ef0a5b05-e304-4b56-b795-7ebdd44207a8.jpg'),
  ],
  extra43: [
    require('../../assets/images/f46c95e3-a585-4e03-a99e-36a0599fc6b5.jpg'),
    require('../../assets/images/f46e046c-1d2d-4ecc-b912-cfc24c6d75b7.jpg'),
    require('../../assets/images/f4e68d8c-7ff7-46a2-81a9-8709ced34b48.jpg'),
    require('../../assets/images/f512d206-363e-4217-b4af-6038344aff22.jpg'),
  ],
  extra44: [
    require('../../assets/images/f5140cbe-593f-4d58-8821-c86ec48dabbf.jpg'),
    require('../../assets/images/f51e990d-4f48-4a09-8735-a3126967c4cc.jpg'),
    require('../../assets/images/f6057081-787a-4ebb-aa61-62ab52acc6f3.jpg'),
    require('../../assets/images/f80d278f-ef8c-4b34-bfb1-5135b625ec86.jpg'),
  ],
  extra45: [
    require('../../assets/images/f8e2a841-f3eb-4278-9161-79877e279301.jpg'),
    require('../../assets/images/fe009e13-6dc1-4ba5-9ce8-4ad37c6da36e.jpg'),
  ],
  // Remaining first batch images
  extra46: [
    require('../../assets/images/03d86510-458d-417b-8cf2-1ed78b3e2fa6.jpg'),
    require('../../assets/images/95efdf0e-6a9f-44b4-8612-944787718454.jpg'),
    require('../../assets/images/93c250f7-f64b-431a-b75a-ed640ca4d8cf.jpg'),
    require('../../assets/images/93ed2417-e3de-40b4-9c75-48d82ec9f42f.jpg'),
  ],
  extra47: [
    require('../../assets/images/941e164f-f1e6-4cd8-829e-ce7ae82ecebc.jpg'),
    require('../../assets/images/94c5b759-c283-4e0d-9153-62d6fcf00269.jpg'),
    require('../../assets/images/95608b99-5c06-46cb-9392-de0d8691731b.jpg'),
    require('../../assets/images/a9180f83-fadd-44dc-8ba2-8539ce7c71a5.jpg'),
  ],
  extra48: [
    require('../../assets/images/a9b0e0c7-daac-4acf-af9b-329f5626475a.jpg'),
    require('../../assets/images/ab7153f2-8deb-4872-ae31-72b477b946f4.jpg'),
    require('../../assets/images/acd20375-c358-4e64-9f0b-321b50486371.jpg'),
    require('../../assets/images/e09612aa-0d2a-4c19-99c3-d22f9d33420f.jpg'),
  ],
  extra49: [
    require('../../assets/images/e0aa9f55-5280-4d14-801a-78d006d5ae27.jpg'),
    require('../../assets/images/e0f96ba2-b02b-4fdc-b21c-0aa1e967037e.jpg'),
    require('../../assets/images/e1808ebe-d649-4554-b133-6d63bbd33a31.jpg'),
  ],
};

// ═══════════════════════════════════════════════════════════════
// COMBINED REGISTRY
// ═══════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════
// ADDITIONAL PRODUCTS (from remaining disk files)
// ═══════════════════════════════════════════════════════════════

const REMAINING_IMAGES = {
  p_rem_1: [
    require('../../../assets/images/1d01add8-2d9c-4f37-9d00-d8306fa5bf8b.jpg'),
    require('../../../assets/images/1d59eb98-e35e-4154-9adf-741021eeaa96.jpg'),
    require('../../../assets/images/1ee087ba-d583-448f-8704-c464f3a69488.jpg'),
    require('../../../assets/images/1f21c276-d571-446f-a8b4-25881bfd79b5.jpg'),
  ],
  p_rem_2: [
    require('../../../assets/images/20396432-c8c8-4cdf-80d9-1e55b77fe170.jpg'),
    require('../../../assets/images/20c93071-e310-4661-8038-a4ae76c44b25.jpg'),
    require('../../../assets/images/20fa31bd-f9d3-48ec-a2d8-975073aebca6.jpg'),
    require('../../../assets/images/2264baa7-caee-40fa-9ccb-62c35e535cfa.jpg'),
  ],
  p_rem_3: [
    require('../../../assets/images/234c209d-b77b-4164-9ade-402ce79cfd86.jpg'),
    require('../../../assets/images/23844ddf-5d00-4246-be08-938f91814c48.jpg'),
    require('../../../assets/images/23b96b8f-8de1-4b1a-89d5-ee86fd515d69.jpg'),
    require('../../../assets/images/25a9c574-5389-4b3e-abf2-a3778b6e5b5c.jpg'),
  ],
  p_rem_4: [
    require('../../../assets/images/267d7439-9674-42ba-80ad-e04b8e2dc82f.jpg'),
    require('../../../assets/images/276a456f-901c-449a-8789-346c62de3cea.jpg'),
    require('../../../assets/images/2841738d-8c56-4544-a81b-d232b5cb24f4.jpg'),
    require('../../../assets/images/289e5072-a910-4e90-b185-34f66c8e8f19.jpg'),
  ],
  p_rem_5: [
    require('../../../assets/images/29244692-1203-4246-ab04-058541a6e461.jpg'),
    require('../../../assets/images/29836064-0d36-4778-b668-28172e85e736.jpg'),
    require('../../../assets/images/2b40e868-5d47-4240-a525-adf03ac74817.jpg'),
    require('../../../assets/images/2cdbffeb-32e8-4dcb-bd6b-fc91890ce060.jpg'),
  ],
  p_rem_6: [
    require('../../../assets/images/2d558bb3-1b93-49a7-8b08-375eda843b90.jpg'),
    require('../../../assets/images/2d57559a-de17-459f-af63-996f6c062649.jpg'),
    require('../../../assets/images/2d5b8766-280f-4797-a7dc-d80cad94f680.jpg'),
    require('../../../assets/images/2e2e44e9-a797-4df4-babc-2d90c5372f8b.jpg'),
  ],
  p_rem_7: [
    require('../../../assets/images/2e39506a-c0de-4547-8cfd-1f4e5ffe8915.jpg'),
    require('../../../assets/images/2ee9504e-4880-4de0-82fc-a97882ead7ec.jpg'),
    require('../../../assets/images/303d6da2-f20e-4c3a-819b-43be2448e616.jpg'),
    require('../../../assets/images/31003165-d2e6-4b99-b026-2f1e0be2197c.jpg'),
  ],
  p_rem_8: [
    require('../../../assets/images/310db786-0099-4b5f-8479-a64af23b161b.jpg'),
    require('../../../assets/images/310ea885-72f6-494d-8164-fb47b1bca9f0.jpg'),
    require('../../../assets/images/325429b7-2c84-48ca-b076-ef328b124dff.jpg'),
    require('../../../assets/images/325fc1cf-a7d3-494c-943d-5f8881e3ed93.jpg'),
  ],
  p_rem_9: [
    require('../../../assets/images/33353a68-aed0-4963-b60a-cb1273d7485b.jpg'),
    require('../../../assets/images/33ee7c92-4124-406a-a3ab-633da4298863.jpg'),
    require('../../../assets/images/3557581a-a3df-47bc-af08-cdee9e75e85c.jpg'),
    require('../../../assets/images/35a27e68-28dc-48a2-acdc-d8f19f6f9aef.jpg'),
  ],
  p_rem_10: [
    require('../../../assets/images/361df32b-b7e5-4d43-b83d-e1d68f492a8a.jpg'),
    require('../../../assets/images/37d218b4-1e4e-4e4e-9ec0-5603e0ea0a32.jpg'),
    require('../../../assets/images/387ad3bc-11ff-45ad-9fe7-5a0fca29db0c.jpg'),
    require('../../../assets/images/38eff827-ec49-4b43-93be-99386a894ded.jpg'),
  ],
  p_rem_11: [
    require('../../../assets/images/39579eb1-5f95-472f-a546-5fb145d464ea.jpg'),
    require('../../../assets/images/395a99f6-5161-4d77-b120-8768ee76e66a.jpg'),
    require('../../../assets/images/39a15b1f-d5e0-4e74-b0b0-f9c1e934673b.jpg'),
    require('../../../assets/images/39c9533d-6b21-4cf9-946e-5b53fc6a4f2c.jpg'),
  ],
  p_rem_12: [
    require('../../../assets/images/3a7374d2-1ee0-4ad4-87d0-d040cfbc02e8.jpg'),
    require('../../../assets/images/3b195366-4dd7-4ec2-925d-eee12660629f.jpg'),
    require('../../../assets/images/3b678cae-9be8-4ba3-90a3-97853f5caa3d.jpg'),
    require('../../../assets/images/3b84c963-a98b-4762-806b-d59ec764e81f.jpg'),
  ],
  p_rem_13: [
    require('../../../assets/images/3c7bd56d-a34c-4b1d-9917-c9884d8b4b92.jpg'),
    require('../../../assets/images/3c8826e8-151a-4674-9ced-d990e01db725.jpg'),
    require('../../../assets/images/3d70a02b-1d0e-4f09-818d-6f3783d26b4d.jpg'),
    require('../../../assets/images/3d74b9e0-79a6-45a2-b7ac-9641dd13297d.jpg'),
  ],
  p_rem_14: [
    require('../../../assets/images/569a5d91-fae2-43ee-a44b-844116fd9952.jpg'),
    require('../../../assets/images/57d37671-3b3f-48ac-8769-9abe84235fe4.jpg'),
    require('../../../assets/images/59512847-f45e-4015-ad0d-191f735e8a2b.jpg'),
    require('../../../assets/images/596aa886-b2a1-427c-a9b7-01a99df4a38b.jpg'),
  ],
  p_rem_15: [
    require('../../../assets/images/599af75b-cf94-4e61-97c7-01827f6cf1b6.jpg'),
    require('../../../assets/images/5b9187be-bc40-43ce-8a97-7c31c0563525.jpg'),
    require('../../../assets/images/5d2ddd36-9579-4981-9b25-c0cceaef4382.jpg'),
    require('../../../assets/images/600af15e-5317-4307-bef6-ba0a4b35d06f.jpg'),
  ],
  p_rem_16: [
    require('../../../assets/images/6076cfb7-319e-4553-8fa2-58e1feddf058.jpg'),
    require('../../../assets/images/61c814ca-d808-4280-97a7-3b2f18d0f559.jpg'),
    require('../../../assets/images/6243d5d8-b434-4198-a7d2-af2ba5ffcd13.jpg'),
    require('../../../assets/images/634bba50-e546-42c8-ba82-4447c9fa439f.jpg'),
  ],
  p_rem_17: [
    require('../../../assets/images/63ab87f0-7130-4b3f-b060-47fb4420e3c3.jpg'),
    require('../../../assets/images/74456672-f806-46ee-8235-08b1d4239a4a.jpg'),
    require('../../../assets/images/a357486b-18ca-41ee-b470-9513b390766d.jpg'),
    require('../../../assets/images/b7de4bc9-1f00-4106-96a7-1c321f0efb49.jpg'),
  ],
  p_rem_18: [
    require('../../../assets/images/e4bb6e2f-38c6-4b8d-a24d-c629202b71df.jpg'),
  ],
};

export const LOCAL_PRODUCT_IMAGES = {
  ...REMAINING_IMAGES,
  ...OFFICE_CHAIR_IMAGES,
  ...OFFICE_CHAIR_VARIANTS,
  ...OUTDOOR_IMAGES,
  ...DINING_IMAGES,
  ...RECEPTION_IMAGES,
  ...LIVING_ROOM_IMAGES,
  ...CONFERENCE_IMAGES,
  ...EXTRA_PRODUCT_IMAGES,
};

/**
 * Get local images for a product by its ID.
 * Returns an array of require() results (numbers) that can be
 * used directly with Image source prop.
 *
 * @param {string} productId - e.g. 'p71', 'p72'
 * @returns {number[]|null} - Array of require() image refs, or null
 */
export function getLocalImages(productId) {
  return LOCAL_PRODUCT_IMAGES[productId] || null;
}

/**
 * Resolve an image source for React Native's Image component.
 * Handles both local require() numbers and URL strings.
 *
 * @param {number|string} imageRef - Either a require() number or a URL string
 * @returns {{ uri: string } | number} - Valid Image source prop
 */
export function resolveImageSource(imageRef) {
  if (typeof imageRef === 'number') {
    return imageRef; // require() result
  }
  if (typeof imageRef === 'string' && imageRef.length > 0) {
    return { uri: imageRef };
  }
  return { uri: 'https://via.placeholder.com/400?text=No+Image' };
}

export default LOCAL_PRODUCT_IMAGES;
