import { View, Image, FlatList, Dimensions, Text } from "react-native";
import React, { useState } from "react";
const { width } = Dimensions.get("window");

export default function ProductGallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const Item = ({ imgUrl, index }) => (
    <Image
      className="w-screen h-96"
      resizeMode="cover"
      source={{
        uri: imgUrl,
      }}
    ></Image>
  );

  return (
    <View className="relative">
      {images && images.length >= 1 ? (
        <View>
          <View className="rounded-b-[30px] overflow-hidden">
            <FlatList
              horizontal
              pagingEnabled
              onScroll={(e) => {
                const x = e.nativeEvent.contentOffset.x;
                setCurrentIndex((x / width).toFixed(0));
              }}
              showsHorizontalScrollIndicator={false}
              data={images}
              renderItem={({ item, key }) => (
                <Item imgUrl={item} keyExtractor={(item) => key} />
              )}
            />
          </View>
          <View className="flex-row w-screen justify-center items-center absolute left-0 right-0 bottom-2">
            {images.map((item, index) => {
              return (
                <View
                  key={index}
                  className="w-4 h-4 rounded-full m-1.5"
                  style={{
                    backgroundColor:
                      currentIndex == index ? "#229F85" : "#f0f0f1",
                  }}
                ></View>
              );
            })}
          </View>
        </View>
      ) : images.length > 0 ? (
        <Image
          className="w-screen h-96 rounded-b-[30px] overflow-hidden"
          resizeMode="center"
          source={{
            uri: "https://robotyka.pl/wp-content/themes/Robotyka/assets/images/noimage.png",
          }}
        ></Image>
      ) : (
        <Image
          className="w-screen h-96 rounded-b-[30px] overflow-hidden"
          resizeMode="center"
          source={{
            uri: images.image,
          }}
        ></Image>
      )}
      <View className="flex-row my-3 absolute bottom-0">
        <View className="mx-4 py-1 px-2 rounded bg-[#f0f0f0]">
          <Text className="text-[#555]">
            {parseInt(currentIndex) + 1} / {images.length ? images.length : 1}
          </Text>
        </View>
      </View>
    </View>
  );
}
