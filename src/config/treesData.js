export const INITIAL_TREES_SCHEMA = `
  CREATE TABLE trees (
    id VARCHAR PRIMARY KEY,
    species VARCHAR,
    common_name VARCHAR,
    dbh VARCHAR,
    condition VARCHAR,
    segment VARCHAR,
    status VARCHAR,
    mitigation VARCHAR,
    lat DOUBLE,
    lng DOUBLE,
    tree_type VARCHAR,
    permit_pathway VARCHAR
  );
`;

export const SEED_TREES_DATA = `
  INSERT INTO trees VALUES
            ('T-01029', 'Quercus virginiana', 'Live Oak', '28 in', 'Fair', 'Segment 2', 'To Be Removed', '84 in', 30.2622, -97.6895, 'Heritage', 'Site Plan Permit'),
            ('T-01024', 'Quercus virginiana', 'Live Oak', '18 in', 'Good', 'Priority Extension: Hwy 71 to AUS', 'To Be Removed', '14/22 in', 30.2625, -97.7410, 'Protected', 'Site Plan Permit'),
            ('T-01025', 'Ulmus rubra', 'Cedar Elm', '22 in', 'Fair', 'Priority Extension: Hwy 71 to AUS', 'To Be Removed', '14/22 in', 30.2631, -97.7395, 'Protected', 'Site Plan Permit'),
            ('T-01026', 'Carya illinoinensis', 'Pecan', '31 in', 'Fair', 'Priority Extension: Hwy 71 to AUS', 'To Be Removed', '94/24 in', 30.2618, -97.7422, 'Heritage', 'Site Plan Permit'),
            ('T-01027', 'Juniperus ashei', 'Ashe Juniper', '9 in', 'Poor', 'Priority Extension: 40th St. to St. Johns', 'To Remain', '-', 30.2580, -97.7350, 'Not Protected', 'General Permit'),
            ('T-01028', 'Taxodium distichum', 'Bald Cypress', '18 in', 'Fair', 'Segment 4', 'To Be Removed', '-', 30.2595, -97.7380, 'Protected', 'Site Plan Permit'),
            ('T-01030', 'Lagerstroemia', 'Crepe Myrtle', '4 in', 'Good', 'Segment 2', 'Recently Planted', '-', 30.2610, -97.7400, 'Not Protected', 'N/A'),
            ('T-01001', 'Quercus virginiana', 'Live Oak', '28 in', 'Fair', 'Segment 1: 38th to MLK', 'To Be Removed', '84 in', 30.2912, -97.7381, 'Heritage', 'Site Plan Permit'),
            ('T-01002', 'Ulmus crassifolia', 'Cedar Elm', '21 in', 'Good', 'Segment 1: 38th to MLK', 'To Remain', '-', 30.2925, -97.7375, 'Protected', 'Site Plan Permit'),
            ('T-01003', 'Carya illinoinensis', 'Pecan', '32 in', 'Fair', 'Segment 1: 38th to MLK', 'To Be Removed', '96 in', 30.2938, -97.7369, 'Heritage', 'Site Plan Permit'),
            ('T-01004', 'Lagerstroemia', 'Crepe Myrtle', '8 in', 'Good', 'Segment 1: 38th to MLK', 'Recently Planted', '-', 30.2941, -97.7362, 'Not Protected', 'N/A'),
            ('T-01005', 'Juniperus ashei', 'Ashe Juniper', '14 in', 'Poor', 'Segment 1: 38th to MLK', 'To Be Removed', '-', 30.2950, -97.7358, 'Not Protected', 'General Permit'),
            ('T-01006', 'Taxodium distichum', 'Bald Cypress', '22 in', 'Good', 'Segment 1: 38th to MLK', 'To Remain', '-', 30.2962, -97.7351, 'Protected', 'Site Plan Permit'),
            ('T-01007', 'Quercus fusiformis', 'Heritage Live Oak', '36 in', 'Fair', 'Segment 1: 38th to MLK', 'To Be Removed', '108 in', 30.2970, -97.7345, 'Heritage', 'Site Plan Permit'),
            ('T-01008', 'Fraxinus texensis', 'Texas Ash', '19 in', 'Good', 'Segment 1: 38th to MLK', 'To Remain', '-', 30.2981, -97.7339, 'Protected', 'Site Plan Permit'),
            ('T-01009', 'Ulmus americana', 'American Elm', '25 in', 'Poor', 'Segment 1: 38th to MLK', 'To Be Removed', '75 in', 30.2990, -97.7332, 'Heritage', 'Site Plan Permit'),
            ('T-01010', 'Quercus macrocarpa', 'Bur Oak', '20 in', 'Good', 'Segment 1: 38th to MLK', 'To Remain', '-', 30.2998, -97.7328, 'Protected', 'Site Plan Permit'),
            ('T-01011', 'Quercus virginiana', 'Live Oak', '30 in', 'Good', 'Segment 2: MLK to Cesar Chavez', 'To Be Removed', '90 in', 30.2785, -97.7410, 'Heritage', 'Site Plan Permit'),
            ('T-01012', 'Ulmus crassifolia', 'Cedar Elm', '19 in', 'Fair', 'Segment 2: MLK to Cesar Chavez', 'To Remain', '-', 30.2772, -97.7415, 'Protected', 'Site Plan Permit'),
            ('T-01049', 'Lagerstroemia', 'Crepe Myrtle', '9 in', 'Good', 'Priority Extension: 40th St. to St. Johns', 'Recently Planted', '-', 30.3170, -97.7160, 'Not Protected', 'N/A'),	
            ('T-01036', 'Quercus virginiana', 'Live Oak', '35 in', 'Good', 'Segment 6: Pleasant Valley to Ben White', 'To Be Removed', '105 in', 30.2280, -97.7100, 'Heritage', 'Site Plan Permit'),
            ('T-01037', 'Ulmus americana', 'American Elm', '20 in', 'Fair', 'Segment 6: Pleasant Valley to Ben White', 'To Remain', '-', 30.2265, -97.7085, 'Protected', 'Site Plan Permit'),	
            ('T-01023', 'Carya illinoinensis', 'Pecan', '22 in', 'Good', 'Segment 3: Bridge', 'To Remain', '-', 30.2620, -97.7450, 'Protected', 'Site Plan Permit'),				  
            ('T-01013', 'Carya illinoinensis', 'Pecan', '26 in', 'Good', 'Segment 2: MLK to Cesar Chavez', 'To Be Removed', '78 in', 30.2760, -97.7421, 'Heritage', 'Site Plan Permit'),
            ('T-01016', 'Quercus muehlenbergii', 'Chinquapin Oak', '22 in', 'Good', 'Segment 2: MLK to Cesar Chavez', 'To Remain', '-', 30.2728, -97.7436, 'Protected', 'Site Plan Permit'),
            ('T-01017', 'Juniperus ashei', 'Ashe Juniper', '11 in', 'Fair', 'Segment 2: MLK to Cesar Chavez', 'To Be Removed', '-', 30.2715, -97.7441, 'Not Protected', 'General Permit'),
            ('T-01032', 'Taxodium distichum', 'Bald Cypress', '21 in', 'Good', 'Segment 5: Riverside Split to Pleasant Valley', 'To Remain', '-', 30.2438, -97.7195, 'Protected', 'Site Plan Permit'),
            ('T-01045', 'Carya illinoinensis', 'Pecan', '23 in', 'Fair', 'Priority Extension: Hwy 71 to AUS', 'To Remain', '-', 30.2070, -97.6690, 'Protected', 'Site Plan Permit'),
            ('T-01046', 'Quercus virginiana', 'Live Oak', '31 in', 'Good', 'Priority Extension: 40th St. to St. Johns', 'To Be Removed', '93 in', 30.3080, -97.7220, 'Heritage', 'Site Plan Permit'),
            ('T-01047', 'Ulmus crassifolia', 'Cedar Elm', '22 in', 'Fair', 'Priority Extension: 40th St. to St. Johns', 'To Remain', '-', 30.3110, -97.7200, 'Protected', 'Site Plan Permit'),
            ('T-01048', 'Quercus macrocarpa', 'Bur Oak', '25 in', 'Good', 'Priority Extension: 40th St. to St. Johns', 'To Be Removed', '75 in', 30.3140, -97.7180, 'Heritage', 'Site Plan Permit');
`;