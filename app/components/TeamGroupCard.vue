<script setup lang="ts">
  interface Props {
    group: TeamGroup;
    multiRoleMembers: Record<string, boolean>;
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

    <div class="flex flex-wrap items-center justify-start gap-8">
      <TeamMemberCard
        v-for="member in group.members"
        :key="`${group.id}-${member.name}`"
        :member="member"
        :group-id="group.id"
        :is-multi-role="multiRoleMembers[member.name]"
      />
    </div>
  </UCard>
</template>
