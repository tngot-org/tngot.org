<script setup lang="ts">
  interface Props {
    group: TeamGroup;
  }

  defineProps<Props>();
</script>

<template>
  <UCard class="mb-12">
    <template #header>
      <h2
        class="border-primary text-primary mb-4 border-l-4 pl-3 text-2xl font-bold"
      >
        {{ group.name }}
      </h2>
    </template>

    <div
      class="grid grid-cols-2 justify-items-center gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8"
    >
      <!-- 主組長 -->
      <TeamMemberCard
        v-if="group.primaryLeader"
        :key="`${group.id}-primary-${group.primaryLeader.name}`"
        :member="group.primaryLeader"
        :group-id="group.id"
        :is-primary-leader="true"
      />

      <!-- 副組長 -->
      <TeamMemberCard
        v-if="group.deputyLeader"
        :key="`${group.id}-deputy-${group.deputyLeader.name}`"
        :member="group.deputyLeader"
        :group-id="group.id"
        :is-deputy-leader="true"
      />

      <!-- 一般成員 -->
      <template v-if="group.members">
        <TeamMemberCard
          v-for="member in group.members"
          :key="`${group.id}-member-${member.name}`"
          :member="member"
          :group-id="group.id"
        />
      </template>
    </div>
  </UCard>
</template>
