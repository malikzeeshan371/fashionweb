//////////////////////////////////////////////////////////////////////////////////////


    ///////////// for creating usedr tablee ////////////////////
         CREATE TABLE`fashion_web`.`user`(
    `id` INT NOT NULL AUTO_INCREMENT, 
    `full_name` VARCHAR(255) NOT NULL, 
    `mobile_number` VARCHAR(255) NOT NULL, 
    `email` VARCHAR(255) NOT NULL,
     `password` VARCHAR(255) NOT NULL, 
     `verify_by_email` VARCHAR(255) NULL DEFAULT NULL, 
     `verify_by_password` VARCHAR(255) NULL DEFAULT NULL,
      `status` VARCHAR(255) NOT NULL, PRIMARY KEY(`id`)
      ) ENGINE = InnoDB;

      /////////// inserting data into user table ///////////////
      INSERT INTO `user` (
        `id`, `full_name`, `mobile_number`, `email`, `password`, `verify_by_email`, `verify_by_password`, `status`)
         VALUES (NULL, 'hanzala khan', '03221166228', 'hsa@gmail.com', '2255', NULL, NULL, 'public'), (NULL, 'sammar khan', '02357919526', 'ska@gmail.com', '2288', NULL, NULL, 'public')



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////         
     ////////////// posts table ////////////////

    CREATE TABLE `fashion_web`.`post` (`id` INT NULL AUTO_INCREMENT , `user_id` INT NOT NULL , `title` VARCHAR(255) NOT NULL , `description` TEXT NOT NULL , `image` VARCHAR(255) NULL DEFAULT NULL , `status` VARCHAR(255) NOT NULL , PRIMARY KEY (`id `)) ENGINE = InnoDB;
    
    /////////////// making user id as foreign key ///////////////////
    ALTER TABLE `posts` ADD CONSTRAINT `test` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////         
     ////////////// like dislike table ////////////////
  CREATE TABLE `fashion_web`.`post_like_dislike` (`id` INT NOT NULL AUTO_INCREMENT , `post_id` INT NOT NULL , `user_id` INT NOT NULL , `status` VARCHAR(255) NOT NULL , `date_time` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
     
      /////////////// making user id  and post id as foreign key ///////////////////
      ALTER TABLE `post_like_dislike` ADD CONSTRAINT `post` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
      ///////
      ALTER TABLE `post_like_dislike` ADD CONSTRAINT `test` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////         
     ////////////// comment  table ////////////////
     CREATE TABLE `fashion_web`.`posts_comments` (`id` INT NOT NULL AUTO_INCREMENT , `user_id` INT NOT NULL , `post_id` INT NOT NULL , `comment` TEXT NOT NULL , `date_time` INT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

     /////////// adding foreign keys //////////////
     ALTER TABLE `posts_comments` ADD CONSTRAINT `comment` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE; 
     /////////
     ALTER TABLE `posts_comments` ADD CONSTRAINT `comments` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////         
     ////////////// user_favourite   table ////////////////
     CREATE TABLE `fashion_web`.`user_favourites` (`id` INT NOT NULL AUTO_INCREMENT , `user_id` INT NOT NULL , `post_id` INT NOT NULL , `status` VARCHAR(255) NOT NULL , `date_time` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;  

       /////////// adding foreign keys //////////////
       ALTER TABLE `user_favourites` ADD CONSTRAINT `favourite` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE; 
       /////////////
       ALTER TABLE `user_favourites` ADD CONSTRAINT `favourite` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE; 

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////         
     ////////////// post_retweet  table //////////////// 
      CREATE TABLE `fashion_web`.`post_retweet` (`id` INT NOT NULL AUTO_INCREMENT , `user_id` INT NOT NULL , `post_id` INT NOT NULL , `count` INT NOT NULL , `date_time` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB; 
      
      /////////// adding foreign keys //////////////  
     ALTER TABLE `post_retweet` DROP FOREIGN KEY `user`; ALTER TABLE `post_retweet` ADD CONSTRAINT `userkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
     ///////////////////////////
      ALTER TABLE `post_retweet` ADD CONSTRAINT `postkey` FOREIGN KEY (`user_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////         
     ////////////// notification  table ////////////////
     CREATE TABLE `fashion_web`.`notification` (`id` INT NOT NULL AUTO_INCREMENT , `user_id` INT NOT NULL , `post_id` INT NOT NULL , `comment/like/dislike` VARCHAR(255) NOT NULL , `date_time` VARCHAR(255) NOT NULL , PRIMARY KEY (`id `)) ENGINE = InnoDB;
      /////////// adding foreign keys //////////////  
      ALTER TABLE `notification` ADD CONSTRAINT `postnot` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE; 
      //////////////////
      ALTER TABLE `notification` ADD CONSTRAINT `usernot` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////         
     ////////////// messages  table ////////////////
     CREATE TABLE `fashion_web`.`messages` (`id` INT NOT NULL AUTO_INCREMENT , `from_user_id` INT NOT NULL , `to_user_id` INT NOT NULL , `message` TEXT NOT NULL , `status` VARCHAR(255) NOT NULL , `date_time` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
     /////////// adding foreign keys //////////////  
     ALTER TABLE `messages` ADD CONSTRAINT `usersend` FOREIGN KEY (`from_user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE; 
     /////////////////////
     ALTER TABLE `messages` ADD CONSTRAINT `userrecieve` FOREIGN KEY (`to_user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////         
     ////////////// friendship list  table ////////////////
     CREATE TABLE `fashion_web`.`friend_ship_list` (`id` INT NOT NULL AUTO_INCREMENT , `request_user_id` INT NOT NULL , `accept_user_id` INT NOT NULL , `status` VARCHAR(255) NULL DEFAULT NULL , `date_time` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
      /////////// adding foreign keys //////////////  
      ALTER TABLE `friend_ship_list` ADD CONSTRAINT `usersend` FOREIGN KEY (`request_user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE; 
      ///////////////
      ALTER TABLE `friend_ship_list` ADD CONSTRAINT `useraccept` FOREIGN KEY (`accept_user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////         
     //////////////  jobs table ////////////////
     CREATE TABLE `fashion_web`.`jobs` (`job_id` INT NOT NULL AUTO_INCREMENT , `user_id` INT NOT NULL , `tittle` VARCHAR(255) NOT NULL , `description` TEXT NOT NULL , `type` VARCHAR(255) NOT NULL , `country` VARCHAR(255) NOT NULL , `city` VARCHAR(255) NOT NULL , `category_id` INT NOT NULL , `sub_category_id` INT NOT NULL , `date_time` VARCHAR(255) NOT NULL , PRIMARY KEY (`job_id`)) ENGINE = InnoDB;
       /////////// adding foreign keys //////////////  
       ALTER TABLE `jobs` ADD CONSTRAINT `userjob` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
       ///////////////
       ALTER TABLE `jobs` ADD CONSTRAINT `categoryjob` FOREIGN KEY (`category_id`) REFERENCES `categories`(`category_id`) ON DELETE CASCADE ON UPDATE CASCADE; 
       ////////////////
       ALTER TABLE `jobs` ADD CONSTRAINT `subcategoryof` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_catergories`(`sub_category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////         
     //////////////  category table ////////////////
     CREATE TABLE `fashion_web`.`categories` (`category_id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `slug` VARCHAR(255) NOT NULL , `date_time` VARCHAR(255) NOT NULL , PRIMARY KEY (`category_id`)) ENGINE = InnoDB;
      

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////         
     //////////////  category table ////////////////      
      CREATE TABLE `fashion_web`.`sub_catergories` (`sub_category_id` INT NOT NULL AUTO_INCREMENT , `category_id` INT NOT NULL , `name` VARCHAR(255) NOT NULL , `slug` VARCHAR(255) NOT NULL , `date_time` VARCHAR(255) NOT NULL , PRIMARY KEY (`sub_category_id`)) ENGINE = InnoDB;
      /////////// adding foreign keys ////////////// 
      ALTER TABLE `sub_catergories` ADD CONSTRAINT `categoryof` FOREIGN KEY (`category_id`) REFERENCES `categories`(`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////         
     //////////////  category table ////////////////  
     CREATE TABLE `fashion_web`.`job_applyer_list` (`job_applyer_list_id` INT NOT NULL AUTO_INCREMENT , `user_id` INT NOT NULL , `job_id` INT NOT NULL , `date_time` VARCHAR(255) NOT NULL , PRIMARY KEY (`job_applyer_list_id`)) ENGINE = InnoDB;
      /////////// adding foreign keys ////////////// 
      ALTER TABLE `job_applyer_list` ADD CONSTRAINT `applyjob` FOREIGN KEY (`job_id`) REFERENCES `jobs`(`job_id`) ON DELETE CASCADE ON UPDATE CASCADE; 
      ///////////
      ALTER TABLE `job_applyer_list` ADD CONSTRAINT `applyuser` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////         
     //////////////  user_awards table //////////////// 
      CREATE TABLE `fashion_web`.`user_awards` (`id` INT NOT NULL AUTO_INCREMENT , `user_id` INT NOT NULL , `title` VARCHAR(255) NOT NULL , `image` VARCHAR(255) NOT NULL , `achieve_time` VARCHAR(255) NOT NULL , `date_time` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
       /////////// adding foreign keys ////////////// 
       ALTER TABLE `user_awards` ADD CONSTRAINT `awarduser` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////         
     //////////////  social_links table ////////////////  
     CREATE TABLE `fashion_web`.`social_links` (`id` INT NOT NULL AUTO_INCREMENT , `user_id` INT NOT NULL , `image` VARCHAR(255) NOT NULL , `link` VARCHAR(255) NOT NULL , `date_time` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;  
      /////////// adding foreign keys ////////////// 
      ALTER TABLE `social_links` ADD CONSTRAINT `linksuser` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;    

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////         
     //////////////  projects  table ////////////////
     CREATE TABLE `fashion_web`.`projects` (`id` INT NOT NULL AUTO_INCREMENT , `user_id` INT NOT NULL , `title` VARCHAR(255) NOT NULL , `description` VARCHAR(255) NOT NULL , `poster_image` VARCHAR(255) NOT NULL , `date_time` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
     /////////// adding foreign keys ////////////// 
     ALTER TABLE `projects` ADD CONSTRAINT `userprojects` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////         
     //////////////  user profile  table ////////////////
     CREATE TABLE `fashion_web`.`user_profile` (`id` INT NOT NULL AUTO_INCREMENT , `user_id` INT NOT NULL , `description` TEXT NOT NULL , `nomination` INT NOT NULL , `gender` VARCHAR(255) NOT NULL , `country` VARCHAR(255) NOT NULL , `state` VARCHAR(255) NOT NULL , `city` VARCHAR(255) NOT NULL , `date_time` VARCHAR(255) NOT NULL , PRIMARY KEY (`id `)) ENGINE = InnoDB;
      /////////// adding foreign keys ////////////// 
      ALTER TABLE `user_profile` ADD CONSTRAINT `userprofile` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////         
     //////////////  followers  table ////////////////
     CREATE TABLE `fashion_web`.`follower` (`id` INT NOT NULL AUTO_INCREMENT , `following_user_id` INT NOT NULL , `followed_user_id` INT NOT NULL , `status` VARCHAR(255) NOT NULL , `date_time` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
      /////////// adding foreign keys ////////////// 
      ALTER TABLE `follower` ADD CONSTRAINT `followuser` FOREIGN KEY (`followed_user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE; 
      /////////////////
      ALTER TABLE `follower` ADD CONSTRAINT `followinguser` FOREIGN KEY (`following_user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////         
     //////////////    status table ////////////////
     CREATE TABLE `fashion_web`.`status` (`id` INT NOT NULL AUTO_INCREMENT , `user_id` INT NOT NULL , `post_id` INT NOT NULL , `start_date` VARCHAR(255) NOT NULL , `end_date` VARCHAR(255) NOT NULL , `image_text` TEXT NOT NULL , `date_time` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
     /////////// adding foreign keys ////////////// 
     ALTER TABLE `status` ADD CONSTRAINT `userstatus` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
     ///////////////////
      ALTER TABLE `status` ADD CONSTRAINT `poststatus` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////         
     //////////////   comment reply table ////////////////
      CREATE TABLE `fashion_web`.`comment_reply` (`id` INT NOT NULL AUTO_INCREMENT , `comment_id` INT NOT NULL , `reply_id` INT NOT NULL , `text` VARCHAR(255) NOT NULL , `date_time` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
       /////////// adding foreign keys ////////////// 
       ALTER TABLE `comment_reply` ADD CONSTRAINT `commentreply` FOREIGN KEY (`comment_id`) REFERENCES `posts_comments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////         
     //////////////  top trend reply table ////////////////
       CREATE TABLE `fashion_web`.`top_trend` (`id` INT NOT NULL AUTO_INCREMENT , `user_id` INT NOT NULL , `post_id` INT NOT NULL , `like_count` INT NOT NULL , `comment_count` INT NOT NULL , `view_count` INT NOT NULL , `date_time` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
       /////////// adding foreign keys //////////////
       ALTER TABLE `top_trend` ADD CONSTRAINT `usertrend` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
       ///////////////////////
        ALTER TABLE `top_trend` ADD CONSTRAINT `posttrend` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
